import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import { styles } from "../../../styles/styles";
import { useState, useEffect, useLayoutEffect } from "react";
import { useExercises } from "../../../data/excercises.js";
import TimerModal from "../../../components/Modal/modal";

export default function ViewExerciseScreen() {
  const { id } = useLocalSearchParams();
  const [exerciseData, setExerciseData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { exerciseList } = useExercises();
  const router = useRouter();
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('screen').height;

  useLayoutEffect(() => {
    if (exerciseData?.name) {
      navigation.setOptions({
        title: exerciseData.name,
      });
    }
  }, [exerciseData?.name, navigation]);

  useEffect(() => {
    if (!id) return;
    const found = exerciseList.find((item) => item.id === parseInt(id));
    if (found) {
      setExerciseData(found);
    } else {
      setExerciseData(null);
    }
  }, [id, exerciseList]);

  const formatSecondsToMMSS = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartExercise = () => {
    // Iniciar primer set
    if (exerciseData?.sets && exerciseData.sets.length > 0) {
      setModalVisible(true);
    }
  };

  const handleEditExercise = () => {
    router.push(`/exercises/${id}`);
  };

  if (!exerciseData) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.label}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 30}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
            <View style={styles.field}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={[
                  styles.input,
                  { color: "#666", backgroundColor: "#f0f0f0" },
                ]}
                value={exerciseData?.name || ""}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[
                  styles.input,
                  { color: "#666", backgroundColor: "#f0f0f0" },
                ]}
                value={exerciseData?.description || ""}
                editable={false}
                selectTextOnFocus={false}
                multiline
              />
            </View>

            {/* Sets */}
            <View style={styles.field}>
              <Text style={styles.label}>Sets</Text>
            {exerciseData?.sets && exerciseData.sets.length > 0 ? (
              exerciseData.sets.map((set) => (
                <View
                  key={set.id}
                  style={styles.setsContainer}
                >
                  <Text
                    style={styles.seriesLabel}
                  >
                    Series:{" "}
                    <Text style={{ fontWeight: "bold" }}>{set.series}</Text>
                  </Text>
                  <Text
                    style={styles.seriesLabel}
                  >
                    Tiempo por serie:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {formatSecondsToMMSS(set.time)}
                    </Text>
                  </Text>
                  {set.restTime > 0 && (
                    <Text style={styles.seriesLabel}>
                      Descanso entre series:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {formatSecondsToMMSS(set.restTime)}
                      </Text>
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: "#999" }}>Sin sets configurados</Text>
            )}
          </View>
          </ScrollView>

          {/* Fixed Buttons at Bottom */}
          <View style={[styles.modpagesContainer, { marginTop: screenHeight < 800 ? 12 : 15 }]}>
            <TouchableOpacity
              style={[styles.acceptButton]}
              onPress={handleStartExercise}
            >
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.editViewButton]}
              onPress={handleEditExercise}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Timer Modal */}
      <TimerModal
        visible={modalVisible}
        timeValue={exerciseData?.sets?.[0]?.time || 0}
        name={exerciseData?.sets?.[0]?.name || exerciseData?.name}
        onClose={() => setModalVisible(false)}
        exerciseSet={exerciseData?.sets?.[0]}
        sets={exerciseData?.sets}
      />
    </SafeAreaView>
  );
}
