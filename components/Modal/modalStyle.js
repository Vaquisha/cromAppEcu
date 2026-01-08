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
        marginBottom: 20,
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
        width: "90%",
        backgroundColor: '#96c3faff',
        justifyContent: "center",
        alignItems: "center",
      },

    ButtonText:{
        fontSize: 22,
        fontFamily: fonts.LatoRegular,
      },
})  