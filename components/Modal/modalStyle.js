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
        marginBottom:20,
        justifyContent:"center",
        alignContent: "center",
        alignItems: "center"
      },

      infoText:{ 
        fontSize: 20, 
        color: "#666", 
        marginBottom: 10,
        fontFamily: fonts.MontserratMedium
       },

    TimerDisplay:{
        fontSize: 48,
        fontFamily: fonts.LatoRegular,
        marginBottom: 20,
      },

    ButtonContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '125%', 
        gap: 10
      },

    Buttons:{
        borderRadius: 5,
        padding: 12,
        width: "100%",
        backgroundColor: '#96c3faff',
        justifyContent: "center",
        alignItems: "center",
      },

    ButtonText:{
        fontSize: 25,
        fontFamily: fonts.LatoRegular,
      },
})  