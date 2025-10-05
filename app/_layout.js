import { Stack } from "expo-router";
import { fonts } from "../fonts/fonts";

export default function StackLayout() {
    return(
    <Stack screenOptions={{
         headerTitleStyle: { fontFamily: fonts.MontserratBold }
    }}> 
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="edit" options={{title: "Editar"}}/>
        <Stack.Screen name="add" options={{title: "Añadir"}}/>
    </Stack>
    )

}
