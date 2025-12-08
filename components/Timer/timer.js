import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { timerStyles } from "./timerStyle.js";

const CustomTimerInput = () => {

  return (
    <View style={timerStyles.TimerContainer}>
      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={2}
        placeholder="00"
        placeholderTextColor="#999"
      />

      <Text style={timerStyles.TimeSeparator}>:</Text>

      <TextInput
        style={timerStyles.TimerInput}
        keyboardType="numeric"
        maxLength={2}
        placeholder="00"
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default CustomTimerInput;