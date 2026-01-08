import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { modalStyles } from './modalStyle.js';

const alarm = require('../../assets/sounds/alarm_clock.mp3');
const beep = require('../../assets/sounds/beep_short.mp3');


function parseToSeconds(value) {
  if (value == null) return 0;
  if (typeof value === 'string' && value.includes(':')) {
    const parts = value.split(':').map(p => p.replace(/\D/g, ''));
    const [mm, ss] = [Number(parts[0] || 0), Number(parts[1] || 0)];
    return mm * 60 + ss;
  }
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  if (typeof value === 'string' && value.includes('.')) {
    return Math.round(n * 60);
  }
  return Math.round(n);
}

function formatSecondsToMMSS(totalSeconds) {
  const [minutes, seconds] = [Math.floor(totalSeconds / 60), totalSeconds % 60];
  const [mm, ss] = [String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')];
  return `${mm}:${ss}`;
}

const TimerModal = ({ visible, timeValue, name, onClose }) => {
  const initial = parseToSeconds(timeValue);
  const [modalSeconds, setModalSeconds] = useState(initial);
  const [displaySeconds, setDisplaySeconds] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // reset when visible or timeValue changes
    const secs = parseToSeconds(timeValue);
    setModalSeconds(secs);
    setDisplaySeconds(secs);
    setIsRunning(false);
  }, [timeValue, visible]);

  useEffect(() => {
    if (!visible) return;

    // clear any existing interval before creating a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isRunning && displaySeconds > 0) {
      intervalRef.current = setInterval(() => {
        setDisplaySeconds(s => Math.max(0, s - 1));
      }, 1000);
    }

    // if we reach 0, ensure running is stopped
    if (displaySeconds === 0) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [visible, isRunning, displaySeconds]);

  useEffect(() => {
    let soundObject = null;
    async function playSound(source, unloadAfter = 1200) {
      try {
        soundObject = new Audio.Sound();
        await soundObject.loadAsync(source);
        await soundObject.playAsync();
        setTimeout(() => {
          try { soundObject.unloadAsync(); } catch {}
        }, unloadAfter);
      } catch (e) {
        console.log('Error playing sound', e);
        try { soundObject.unloadAsync(); } catch {}
      }
    }

    if (!visible) return;

    if (displaySeconds > 0 && displaySeconds <= 5) {
      // short beep for last 5 seconds (load lazily and cache)
      const src = beep;
      playSound(src, 900);
    }

    return () => {
      if (soundObject) {
        try { soundObject.unloadAsync(); } catch {}
      }
    };
  }, [displaySeconds, visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={modalStyles.Container}>
        <View style={{width: '90%', alignItems: 'center'}}>
          <Text style={modalStyles.Title}>{name}</Text>
          <Text style={modalStyles.TimerDisplay}>{formatSecondsToMMSS(displaySeconds)}</Text>

          <View style={modalStyles.ButtonContainer}>
            <TouchableOpacity
              style={modalStyles.Buttons}
              onPress={async () => {
                if (!isRunning && displaySeconds > 0) {
                  // play start beep then start
                  try {
                    const startBeep = new Audio.Sound();
                    const src = beep;
                    await startBeep.loadAsync(src);
                    await startBeep.playAsync();
                    setTimeout(() => { try { startBeep.unloadAsync(); } catch {} }, 800);
                  } catch (e) {
                    console.log('Error playing start beep', e);
                  }
                  setIsRunning(true);
                } else {
                  setIsRunning(false);
                }
              }}
            >
              <Text style={modalStyles.ButtonText}>{isRunning ? 'Pausar' : (displaySeconds === 0 ? 'Reiniciar' : 'Iniciar')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.Buttons} onPress={() => { setDisplaySeconds(modalSeconds); setIsRunning(false); }}>
              <Text style={modalStyles.ButtonText}>Reiniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.Buttons} onPress={onClose}>
              <Text style={modalStyles.ButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default TimerModal;
