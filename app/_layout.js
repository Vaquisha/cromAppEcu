import { Stack } from "expo-router";

export default function StackLayout() {
    return(
    <Stack> 
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="edit" options={{title: "Editar"}}/>
        <Stack.Screen name="add" options={{title: "Añadir"}}/>
    </Stack>
    )

}
