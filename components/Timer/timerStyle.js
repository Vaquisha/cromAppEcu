import { StyleSheet } from 'react-native'
import { fonts } from '../../fonts/fonts';

export const timerStyles = StyleSheet.create ({
    TimerContainer: 
      {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "4%",
        borderRadius: 6,
      },

    TimerInput: 
        {
          width: 50,
          height: 50,
          backgroundColor: "#333",
          color: "#fff",
          fontSize: 26,
          fontFamily:fonts.LatoRegular,
          textAlign: "center",
          borderRadius: 4,
        },

    TimeSeparator: 
        {
            color: "#fff",
            fontSize: 28,
            marginHorizontal: 15,
        },
})