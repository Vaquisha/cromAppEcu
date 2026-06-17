import { Stack } from "expo-router";
import { fonts } from "../fonts/fonts";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: fonts.MontserratBold }, statusBarStyle: "dark"
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="exercises/[id]/view" options={{ title: "Ejercicio" }} />
      <Stack.Screen name="exercises/[id]" options={{ title: "Editar" }} />
      <Stack.Screen name="add" options={{ title: "Añadir" }} />
    </Stack>
  );
}
