import { StyleSheet } from 'react-native'
import { fonts } from '../../fonts/fonts';

export const modalStyles = StyleSheet.create ({
    Container:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor: '#dbdbdbff'
    },

    Title:{
        fontSize:20, 
        fontFamily:fonts.MontserratBold,
        marginBottom:20
      },

    TimerDisplay:{
        fontSize: 48,
        fontFamily: fonts.LatoRegular,
        marginBottom: 30,
      },

    ButtonContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        gap: 10
      },

    Buttons:{
        borderRadius: 5,
        padding: 10,
        width: 300,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
      },

    ButtonText:{
        fontSize: 18,
        fontFamily: fonts.LatoRegular,
      },
})  