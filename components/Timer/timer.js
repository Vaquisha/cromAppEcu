import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { timerStyles } from "./timerStyle.js";

const CustomTimerInput = ({ onChange }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const handleMinutes = (value) => {
    const cleaned = value.replace(/[^0-9]/g, "");

    const formatted = cleaned.slice(0, 2);

    setMinutes(formatted);

    if (onChange) onChange({ minutes: formatted, seconds });
  };

  const handleSeconds = (value) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    let formatted = cleaned.slice(0, 2);

    if (parseInt(formatted) > 59) formatted = "59";

    setSeconds(formatted);

    if (onChange) onChange({ minutes, seconds: formatted });
  };

  return (
    <View style={timerStyles.TimerContainer}>
      <TextInput
        style={timerStyles.TimerInput}
        value={minutes}
        onChangeText={handleMinutes}
        keyboardType="numeric"
        maxLength={2}
        placeholder="00"
        placeholderTextColor="#999"
      />

      <Text style={timerStyles.TimeSeparator}>:</Text>

      <TextInput
        style={timerStyles.TimerInput}
        value={seconds}
        onChangeText={handleSeconds}
        keyboardType="numeric"
        maxLength={2}
        placeholder="00"
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default CustomTimerInput;