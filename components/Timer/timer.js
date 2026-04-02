import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Text } from "react-native";
import { timerStyles } from "./timerStyle.js";

const CustomTimerInput = ({ onChange, initialMinutes = 0, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes === 0 ? "" : String(initialMinutes));
  const [seconds, setSeconds] = useState(initialSeconds === 0 ? "" : String(initialSeconds));
  const onChangeRef = useRef(onChange);

  // Actualizar la ref cada que onChange cambie
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const [m, s] = [parseInt(minutes || 0, 10), parseInt(seconds || 0, 10)];
    const totalSeconds = m * 60 + s;
    if (typeof onChangeRef.current === 'function') {
      onChangeRef.current(totalSeconds);
    }
  }, [minutes, seconds]);

  return (
    <View style={timerStyles.TimerContainer}>
      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={4}
        value={minutes}
        placeholder="00"
        placeholderTextColor="#999"
        onChangeText={setMinutes}
      />

      <Text style={timerStyles.TimeSeparator}>:</Text>

      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={4}
        value={seconds}
        placeholder="00"
        placeholderTextColor="#999"
        onChangeText={setSeconds}
      />
    </View>
  );
};

export default CustomTimerInput;