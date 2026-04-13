import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { modalStyles } from "./modalStyle.js";

function parseToSeconds(value) {
  if (value == null) return 0;
  if (typeof value === "string" && value.includes(":")) {
    const parts = value.split(":").map((p) => p.replace(/\D/g, ""));
    const [mm, ss] = [Number(parts[0] || 0), Number(parts[1] || 0)];
    return mm * 60 + ss;
  }
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  if (typeof value === "string" && value.includes(".")) {
    return Math.round(n * 60);
  }
  return Math.round(n);
}

function formatSecondsToMMSS(totalSeconds) {
  const [minutes, seconds] = [Math.floor(totalSeconds / 60), totalSeconds % 60];
  const [mm, ss] = [
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ];
  return `${mm}:${ss}`;
}

const TimerModal = ({ visible, timeValue, name, onClose, sets = [] }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
  const [isRestPeriod, setIsRestPeriod] = useState(false);

  const alarmSoundRef = useRef(null);
  const beepSoundRef = useRef(null);

  // Load sounds once on mount
  useEffect(() => {
    const loadSounds = async () => {
      try {
        const { sound: alarmSound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/alarm_clock.mp3"),
          { shouldPlay: false }
        );
        alarmSoundRef.current = alarmSound;

        const { sound: beepSound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/beep_short.mp3"),
          { shouldPlay: false }
        );
        beepSoundRef.current = beepSound;
      } catch (error) {
        console.log("Error loading sounds", error);
      }
    };

    loadSounds();

    return () => {
      if (alarmSoundRef.current) {
        alarmSoundRef.current.unloadAsync();
      }
      if (beepSoundRef.current) {
        beepSoundRef.current.unloadAsync();
      }
    };
  }, []);

  // Initial time calculation
  const getInitialTime = () => {
    if (sets && sets.length > 0) {
      const currentSet = sets[currentSetIndex];
      if (isRestPeriod) {
        return currentSet.restTime || 0;
      }
      return currentSet.time || 0;
    }
    return parseToSeconds(timeValue);
  };

  const initial = getInitialTime();
  const [modalSeconds, setModalSeconds] = useState(initial);
  const [displaySeconds, setDisplaySeconds] = useState(initial);
  const [isRunning, setIsRunning] = useState(false);
  const [firstSeriesStarted, setFirstSeriesStarted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const secs = getInitialTime();
    setModalSeconds(secs);
    setDisplaySeconds(secs);
    setIsRunning(false);
    setCurrentSetIndex(0);
    setCurrentSeriesIndex(0);
    setIsRestPeriod(false);
    setFirstSeriesStarted(false);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isRunning && displaySeconds > 0) {
      intervalRef.current = setInterval(() => {
        setDisplaySeconds((s) => Math.max(0, s - 1));
      }, 1000);
    } else if (displaySeconds === 0 && isRunning) {
      // Timer finished - handleTimerFinished will manage isRunning state
      handleTimerFinished();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [visible, isRunning, displaySeconds]);

  const handleTimerFinished = async () => {
    if (!sets || sets.length === 0) return;

    const currentSet = sets[currentSetIndex];

    if (isRestPeriod) {
      // Rest period finished, go to next series or next set
      if (currentSeriesIndex < currentSet.series - 1) {
        // More series in this set
        setCurrentSeriesIndex((prev) => prev + 1);
        setIsRestPeriod(false);
        const nextSeriesTime = currentSet.time || 0;
        setModalSeconds(nextSeriesTime);
        setDisplaySeconds(nextSeriesTime);
        await playAlarmSound();
        // Keep isRunning true to continue automatically
      } else {
        // All series done, move to next set
        if (currentSetIndex < sets.length - 1) {
          setCurrentSetIndex((prev) => prev + 1);
          setCurrentSeriesIndex(0);
          setIsRestPeriod(false);
          const nextSetTime = sets[currentSetIndex + 1].time || 0;
          setModalSeconds(nextSetTime);
          setDisplaySeconds(nextSetTime);
          await playAlarmSound();
          // Keep isRunning true to continue automatically
        } else {
          // All sets finished
          setIsRunning(false);
          playAlarmSound();
        }
      }
    } else {
      // Series finished

      if (currentSet.restTime > 0) {
        // Start rest period
        setIsRestPeriod(true);
        const restTime = currentSet.restTime;
        setModalSeconds(restTime);
        setDisplaySeconds(restTime);
        // Keep isRunning true to continue automatically
      } else if (currentSeriesIndex < currentSet.series - 1) {
        // No rest, go directly to next series
        setCurrentSeriesIndex((prev) => prev + 1);
        const nextSeriesTime = currentSet.time || 0;
        setModalSeconds(nextSeriesTime);
        setDisplaySeconds(nextSeriesTime);
        // Keep isRunning true to continue automatically
      } else {
        // Series finished, no rest, move to next set
        if (currentSetIndex < sets.length - 1) {
          setCurrentSetIndex((prev) => prev + 1);
          setCurrentSeriesIndex(0);
          setIsRestPeriod(false);
          const nextSetTime = sets[currentSetIndex + 1].time || 0;
          setModalSeconds(nextSetTime);
          setDisplaySeconds(nextSetTime);
          // Keep isRunning true to continue automatically
        } else {
          // All sets finished
          setIsRunning(false);
          playAlarmSound();
        }
      }
    }
  };

  const playAlarmSound = async () => {
    try {
      if (alarmSoundRef.current) {
        await alarmSoundRef.current.replayAsync();
      }
    } catch (e) {
      console.log("Error playing alarm", e);
    }
  };

  const playBeepSound = async () => {
    try {
      if (beepSoundRef.current) {
        await beepSoundRef.current.replayAsync();
      }
    } catch (e) {
      console.log("Error playing beep", e);
    }
  };

  useEffect(() => {
    if (!visible) return;

    if (displaySeconds > 0 && displaySeconds <= 5 && isRunning) {
      playBeepSound();
    }
  }, [displaySeconds, visible, isRunning]);

  const getCurrentSegmentDuration = () => {
    if (!sets || sets.length === 0) {
      return parseToSeconds(timeValue);
    }
    const currentSet = sets[currentSetIndex];
    return isRestPeriod ? currentSet.restTime || 0 : currentSet.time || 0;
  };

  const handleSkip5Seconds = () => {
    const segmentDuration = getCurrentSegmentDuration();
    setDisplaySeconds((prev) => Math.min(segmentDuration, prev + 5));
  };

  const handleAdd5Seconds = () => {
    setDisplaySeconds((prev) => Math.max(1, prev - 5));
  };

  const getDisplayInfo = () => {
    if (!sets || sets.length === 0) {
      return { setName: name || "Ejercicio", info: "" };
    }

    const currentSet = sets[currentSetIndex];
    const setName = name || `Ejercicio`;
    const seriesNum = currentSeriesIndex + 1;

    let info = `Set ${currentSetIndex + 1} - Serie ${seriesNum}/${currentSet.series}`;
    if (isRestPeriod) {
      info += " (DESCANSO)";
    }

    return { setName, info };
  };

  if (!visible) return null;

  const { setName, info } = getDisplayInfo();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={modalStyles.Container}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <Text style={modalStyles.Title}>{setName}</Text>
            {info && (
              <Text style={modalStyles.infoText}>
                {info}
              </Text>
            )}
            <Text style={modalStyles.TimerDisplay}>
              {formatSecondsToMMSS(displaySeconds)}
            </Text>

            <View style={modalStyles.ButtonContainer}>
              {/* Skip Time Buttons */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <TouchableOpacity
                  style={modalStyles.TimerButtons}
                  onPress={handleSkip5Seconds}
                  disabled={
                    !isRunning ||
                    displaySeconds >= getCurrentSegmentDuration()
                  }
                >
                  <Text style={modalStyles.ButtonText}>-5s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalStyles.TimerButtons}
                  onPress={handleAdd5Seconds}
                  disabled={
                    !isRunning ||
                    displaySeconds <= 1
                  }
                >
                  <Text style={modalStyles.ButtonText}>+5s</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={modalStyles.Buttons}
                onPress={async () => {
                  if (!isRunning && displaySeconds > 0) {
                    if (!firstSeriesStarted) {
                      await playAlarmSound();
                      setFirstSeriesStarted(true);
                    }
                    await playBeepSound();
                    setIsRunning(true);
                  } else {
                    setIsRunning(false);
                  }
                }}
              >
                <Text style={modalStyles.ButtonText}>
                  {isRunning ? "Pausar" : "Iniciar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={modalStyles.Buttons}
                onPress={() => {
                  setDisplaySeconds(modalSeconds);
                  setIsRunning(false);
                }}
              >
                <Text style={modalStyles.ButtonText}>Reiniciar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={modalStyles.Buttons} onPress={onClose}>
                <Text style={modalStyles.ButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TimerModal;
