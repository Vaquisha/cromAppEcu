import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styles } from "../../styles/styles";
import { useState, useEffect, useCallback } from "react";
import { useExercises } from "../../data/excercises.js";
import CustomTimerInput from '../../components/Timer/timer'

export default function EditScreen() {
    const { id } = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState(null);
    const { exerciseList, updateExercise } = useExercises();
    const router = useRouter()
    const screenHeight = Dimensions.get('screen').height;

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            // Scroll handling if needed
        });

        return () => {
            showSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (!id) return;
        const found = exerciseList.find(item => item.id === parseInt(id));
        if (found) {
            setExerciseData({ ...found });
        } else {
            setExerciseData(null);
        }
    }, [id, exerciseList]);

    const handleSetChange = useCallback((setIndex, field, value) => {
        setExerciseData(prev => {
            const newData = { ...prev };
            newData.sets[setIndex] = { ...newData.sets[setIndex], [field]: value };
            return newData;
        });
    }, []);

    const handleAddSet = () => {
        setExerciseData(prev => {
            const newData = { ...prev };
            const newSetId = Math.max(...newData.sets.map(s => s.id)) + 1;
            newData.sets.push({
                id: newSetId,
                series: 1,
                time: 0,
                restTime: 0,
            });
            return newData;
        });
    };

    const handleRemoveSet = (setIndex) => {
        if (exerciseData.sets.length <= 1) {
            alert("Un ejercicio debe tener al menos un set");
            return;
        }
        setExerciseData(prev => {
            const newData = { ...prev };
            newData.sets.splice(setIndex, 1);
            return newData;
        });
    };

    const formatSecondsToMMSS = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 30} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Nombre del Ejercicio</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Añade el nombre"
                            placeholderTextColor="#9E9E9E"
                            value={exerciseData?.name || ""}
                            onChangeText={(text) => setExerciseData({ ...exerciseData, name: text })}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Añade una descripción"
                            placeholderTextColor="#9E9E9E"
                            value={exerciseData?.description || ""}
                            onChangeText={(text) => setExerciseData({ ...exerciseData, description: text })}
                            multiline
                        />
                    </View>

                    {/* Sets Management */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Sets</Text>
                        {exerciseData?.sets && exerciseData.sets.map((set, index) => (
                            <View
                                key={set.id}
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    padding: 12,
                                    marginVertical: 8,
                                    borderRadius: 8,
                                    borderLeftWidth: 4,
                                    borderLeftColor: '#14c7dfff'
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Set {index + 1}</Text>
                                    {exerciseData.sets.length > 1 && (
                                        <TouchableOpacity
                                            onPress={() => handleRemoveSet(index)}
                                            style={{ padding: 4 }}
                                        >
                                            <Text style={{ color: '#f00404ff', fontWeight: 'bold' }}>✕ Eliminar</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Series */}
                                <View style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>Número de Series</Text>
                                    <TextInput
                                        style={[styles.input, { fontSize: 12 }]}
                                        placeholder="3"
                                        placeholderTextColor="#9E9E9E"
                                        value={set.series.toString()}
                                        onChangeText={(text) => handleSetChange(index, 'series', parseInt(text) || 0)}
                                        keyboardType="number-pad"
                                    />
                                </View>

                                {/* Time per series */}
                                <View style={{ marginBottom: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>Tiempo por Serie (MM:SS)</Text>
                                    <CustomTimerInput
                                        onChange={(value) => handleSetChange(index, 'time', value)}
                                        initialMinutes={Math.floor(set.time / 60)}
                                        initialSeconds={set.time % 60}
                                    />
                                </View>

                                {/* Rest Time */}
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 4 }}>Descanso entre Series (MM:SS)</Text>
                                    <CustomTimerInput
                                        onChange={(value) => handleSetChange(index, 'restTime', value)}
                                        initialMinutes={Math.floor(set.restTime / 60)}
                                        initialSeconds={set.restTime % 60}
                                    />
                                </View>
                            </View>
                        ))}

                        {/* Add Set Button */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#28a745',
                                padding: 12,
                                borderRadius: 8,
                                marginTop: 12,
                                alignItems: 'center'
                            }}
                            onPress={handleAddSet}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>+ Agregar Set</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>

                    {/* Fixed Buttons at Bottom */}
                    <View style={[styles.modpagesContainer, { marginTop: screenHeight < 800 ? 36.8 : 50 }]}>
                        <TouchableOpacity
                            style={[styles.acceptButton]}
                            onPress={async () => {
                                if (!exerciseData) return;
                                // Validaciones
                                if (!exerciseData.name.trim()) {
                                    alert("El nombre del ejercicio es requerido");
                                    return;
                                }
                                if (!exerciseData.sets || exerciseData.sets.length === 0) {
                                    alert("El ejercicio debe tener al menos un set");
                                    return;
                                }
                                try {
                                    await updateExercise(exerciseData);
                                    router.back();
                                } catch (e) {
                                    console.log('Error updating', e);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.cancelButton]} onPress={() => router.back()}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}