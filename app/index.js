import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useExercises } from "../data/excercises.js";
import { styles } from "../styles/styles.js";
import { fonts } from "../fonts/fonts.js";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { registerRootComponent } from "expo";

function formatTime(value) {
  if (value == null) return "00:00";

  if (typeof value === "string" && value.includes(":")) {
    const parts = value.split(":").map((p) => p.replace(/\D/g, ""));
    const mm = String(Number(parts[0] || 0)).padStart(2, "0");
    const ss = String(Number(parts[1] || 0)).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  const n = Number(value);
  if (Number.isNaN(n)) return "00:00";

  let totalSeconds = 0;

  if (typeof value === "string" && value.includes(".")) {
    totalSeconds = Math.round(n * 60);
  } else {
    totalSeconds = Math.round(n);
  }

  totalSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * Calcula el tiempo total de un ejercicio basado en sus sets
 */
function calculateTotalTime(exercise) {
  if (!exercise.sets || exercise.sets.length === 0) {
    return 0;
  }

  let totalSeconds = 0;
  exercise.sets.forEach(set => {
    // Tiempo de cada serie * número de series + descansos entre series
    const timePerSet = (set.time * set.series) + (set.restTime * (set.series - 1));
    totalSeconds += timePerSet;
  });

  return totalSeconds;
}

export default function Index() {
  registerRootComponent(Index);

  const router = useRouter();
  const { exerciseList, removeValue } = useExercises();

  const [fontsLoaded] = useFonts({
    [fonts.LatoRegular]: require("../fonts/Lato/Lato-Regular.ttf"),
    [fonts.LatoBold]: require("../fonts/Lato/Lato-Bold.ttf"),

    [fonts.MontserratRegular]: require("../fonts/Montserrat/Montserrat-Regular.ttf"),
    [fonts.MontserratBold]: require("../fonts/Montserrat/Montserrat-Bold.ttf"),
    [fonts.MontserratMedium]: require("../fonts/Montserrat/Montserrat-Medium.ttf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!fontsLoaded) return null;

  if (!exerciseList || exerciseList.length === 0) {
    return (
      <SafeAreaProvider>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={[styles.name, { fontSize: 20 }]}>
            No hay ejercicios disponibles.
          </Text>

          <Pressable>
            <TouchableOpacity
              onPress={() => router.push("add")}
              style={[styles.addButton, { marginTop: "2.5%" }]}
            >
              <Text style={[styles.buttonText, { fontSize: 18 }]}>
                Añadir nuevo ejercicio
              </Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </SafeAreaProvider>
    );
  }

  const handlePressViewExercise = (id) => {
    router.push(`/exercises/${id}/view`);
  };

  const handlePressEditExercise = (id) => {
    router.push(`/exercises/${id}`);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Ejercicios</Text>

        <FlatList
          data={exerciseList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handlePressViewExercise(item.id)}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{formatTime(calculateTotalTime(item))}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.modButton}
                    onPress={() => handlePressEditExercise(item.id)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.delButton}
                    onPress={() =>
                      Alert.alert(
                        "Estás a punto de eliminar este ejercicio",
                        `¿Estás seguro de que deseas eliminar ${item.name}?`,
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: () => removeValue(item.id),
                          },
                        ],
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        <Pressable>
          <TouchableOpacity
            onPress={() => router.push("add")}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Añadir nuevo ejercicio</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
