import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { exercises } from "../../data/excercises.js";
import CustomTimerInput from '../../components/Timer/timer'

export default function EditScreen(){
    const { id } = useLocalSearchParams(id)
    const [exerciseData, setExerciseData] = useState({});
    const router = useRouter()

    useEffect(() => {
         const fetchExerciseData = async (id) => {
            const exercise = exercises.find(exercises => exercises.id === parseInt(id));
            setExerciseData(exercise);
        };
        fetchExerciseData(id);
    }, [id]);

    return(
 <SafeAreaView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100:0 }>
            <ScrollView>
            <View style={styles.field}> 
                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input} placeholder="Añade el nombre" value={exerciseData.name || ""}
                onChangeText={(text) => setExerciseData({...exerciseData, name: text})}  />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input} placeholder="Añade una descipción"
                value={exerciseData.description || ""}
                onChangeText={(text) => setExerciseData({...exerciseData, description: text})}/>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Tiempo</Text>
                <CustomTimerInput/>
            </View>
          </ScrollView>

        <View style={styles.modpagesContainer}>
          <TouchableOpacity style={[styles.acceptButton]}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
}