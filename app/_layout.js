import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import { fonts } from "../fonts/fonts";

export default function RootLayout() {
    return(
    <Stack screenOptions={{
         headerTitleStyle: { fontFamily: fonts.MontserratBold }
    }}> 
        <StatusBar StatusBarStyle='dark-content'/>
        <Stack.Screen name="index" options={{ headerShown: false }} StatusBarStyle='dark-content'/>
        <Stack.Screen name="exercises/[id]" options={{title: "Editar"}} StatusBarStyle='dark-content'/>
        <Stack.Screen name="add" options={{title: "Añadir"}} StatusBarStyle='dark-content'/>
    </Stack>
    )

}
