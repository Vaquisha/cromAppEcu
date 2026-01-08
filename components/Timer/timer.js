import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { timerStyles } from "./timerStyle.js";

const CustomTimerInput = ({ onChange, initialMinutes = (0), initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(String(initialMinutes));
  const [seconds, setSeconds] = useState(String(initialSeconds));

  useEffect(() => {
    const [m, s] = [parseInt(minutes, 10) || 0, parseInt(seconds, 10) || 0];
    const totalSeconds = m * 60 + s;
    if (typeof onChange === 'function') onChange(totalSeconds);
  }, [minutes, seconds, onChange]);

  return (
    <View style={timerStyles.TimerContainer}>
      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={4}
        placeholder="00"
        placeholderTextColor="#999"
        onChangeText={setMinutes}
      />

      <Text style={timerStyles.TimeSeparator}>:</Text>

      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={4}
        placeholder="00"
        placeholderTextColor="#999"
        onChangeText={setSeconds}
      />
    </View>
  );
};

export default CustomTimerInput;