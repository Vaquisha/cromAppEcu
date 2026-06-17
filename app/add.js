import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
  Dimensions,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import { useRouter } from "expo-router";
import CustomTimerInput from "../components/Timer/timer.js";
import { useExercises } from "../data/excercises";

export default function AddScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const { storeData } = useExercises();
  const screenHeight = Dimensions.get("screen").height;
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [sets, setSets] = useState([
    {
      id: 1,
      series: 1,
      time: 0,
      restTime: 0,
    },
  ]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      showSubscription.remove();
    };
  }, []);

  const handleSetChange = useCallback((setIndex, field, value) => {
    setSets((prev) => {
      const newSets = [...prev];
      newSets[setIndex] = { ...newSets[setIndex], [field]: value };
      return newSets;
    });
  }, []);

  const handleAddSet = () => {
    setSets((prev) => {
      const newSetId = Math.max(...prev.map((s) => s.id)) + 1;
      return [
        ...prev,
        {
          id: newSetId,
          series: 1,
          time: 0,
          restTime: 0,
        },
      ];
    });
  };

  const handleRemoveSet = (setIndex) => {
    if (sets.length <= 1) {
      Alert.alert("Atención", "Un ejercicio debe tener al menos un set");
      return;
    }
    setSets((prev) => {
      const newSets = [...prev];
      newSets.splice(setIndex, 1);
      return newSets;
    });
  };

  const handleSave = async () => {
    try {
      if (newName.trim() === "" || newDescription.trim() === "") {
        Alert.alert(
          "Atención",
          "Por favor, completa el nombre y descripción antes de guardar.",
        );
        return;
      }

      if (!sets || sets.length === 0) {
        Alert.alert("Atención", "El ejercicio debe tener al menos un set");
        return;
      }

      const invalidTimeSet = sets.find(
        (set) => set.time === 0 || set.restTime === 0,
      );

      if (invalidTimeSet) {
        Alert.alert(
          "Atención",
          "El tiempo por serie y el descanso entre series no pueden ser 0.",
        );
        return;
      }

      await storeData({
        name: newName.trim(),
        description: newDescription.trim(),
        sets: sets,
      });

      router.back();
    } catch (e) {
      console.log("Error saving exercise", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 60}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          >
            <View style={styles.field}>
              <Text style={styles.label}>Nombre del Ejercicio</Text>
              <TextInput
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                placeholder="Aquí va el nombre de tu ejercicio"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={styles.input}
                value={newDescription}
                onChangeText={setNewDescription}
                placeholder="Una breve descripción del ejercicio"
                placeholderTextColor="#9E9E9E"
                multiline
              />
            </View>

            {/* Sets Management */}
            <View style={styles.field}>
              <Text style={styles.label}>Sets</Text>
              {sets.map((set, index) => (
                <View key={set.id} style={styles.setsContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={styles.seriesLabel}>Set {index + 1}</Text>
                    {sets.length > 1 && (
                      <TouchableOpacity
                        onPress={() => handleRemoveSet(index)}
                        style={{ padding: 4 }}
                      >
                        <View style={styles.removeSetButton}>
                          <Text
                            style={styles.removeSetButtonText}
                          >
                            ✕ Eliminar
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Series */}
                  <View style={{ marginBottom: 8 }}>
                    <Text style={styles.seriesLabel}>Número de Series</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="3"
                      placeholderTextColor="#9E9E9E"
                      value={set.series.toString()}
                      onChangeText={(text) =>
                        handleSetChange(index, "series", parseInt(text) || 0)
                      }
                      keyboardType="number-pad"
                    />
                  </View>

                  {/* Time per series */}
                  <View style={{ marginBottom: 8 }}>
                    <Text style={styles.seriesLabel}>
                      Tiempo por Serie (MM:SS)
                    </Text>
                    <CustomTimerInput
                      onChange={(value) =>
                        handleSetChange(index, "time", value)
                      }
                      initialMinutes={Math.floor(set.time / 60)}
                      initialSeconds={set.time % 60}
                    />
                  </View>

                  {/* Rest Time */}
                  <View>
                    <Text style={styles.seriesLabel}>
                      Descanso entre Series (MM:SS)
                    </Text>
                    <CustomTimerInput
                      onChange={(value) =>
                        handleSetChange(index, "restTime", value)
                      }
                      initialMinutes={Math.floor(set.restTime / 60)}
                      initialSeconds={set.restTime % 60}
                    />
                  </View>
                </View>
              ))}

              {/* Add Set Button */}
              <TouchableOpacity
                style={styles.addSetButton}
                onPress={handleAddSet}
              >
                <Text style={styles.buttonText}>+ Agregar Set</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Fixed Buttons at Bottom */}
          <View
            style={[
              styles.modpagesContainer,
              { marginTop: screenHeight < 800 ? 12 : 15 },
            ]}
          >
            <TouchableOpacity
              style={[styles.acceptButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
