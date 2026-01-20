import { useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform,  Dimensions, Keyboard  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { useExercises } from "../../data/excercises.js";
import CustomTimerInput from '../../components/Timer/timer'

export default function EditScreen(){
    const { id } = useLocalSearchParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [timerValue, setTimerValue] = useState(0);
    const { exerciseList, updateExercise } = useExercises();
    const router = useRouter()
    const PhoneDimensions = Dimensions.get('screen');
        const [keyboardVisible, setKeyboardVisible] = useState(false);
    
        useEffect(() => {
          const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
          });
          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
          });
    
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          };
        }, []);

    useEffect(() => {
        if (!id) return;
        const found = exerciseList.find(item => item.id === parseInt(id));
        if (found) {
          setExerciseData(found);
          const time = Number(found.time) || 0;
          setTimerValue(time);
        } else {
          setExerciseData(null);
        }
    }, [id, exerciseList]);

    return(
   <SafeAreaView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100:30 }>
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={keyboardVisible}>
            <View style={styles.field}> 
                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input} placeholder="Añade el nombre" placeholderTextColor="#9E9E9E" value={exerciseData?.name || ""}
                onChangeText={(text) => setExerciseData({...exerciseData, name: text})}  />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input} placeholder="Añade una descipción" placeholderTextColor="#9E9E9E"
                value={exerciseData?.description || ""}
                onChangeText={(text) => setExerciseData({...exerciseData, description: text})}/>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Tiempo</Text>
                {exerciseData && (
                  <CustomTimerInput
                    onChange={setTimerValue}
                    initialMinutes={Math.floor((Number(exerciseData.time)||0) / 60)}
                    initialSeconds={(Number(exerciseData.time)||0) % 60}
                  />
                )}
            </View>
          

        <View style={[styles.modpagesContainer, {marginTop: PhoneDimensions.height < 800 ? '36.8%': '50%'}]}>
          <TouchableOpacity style={[styles.acceptButton]} onPress={async () => {
            if (!exerciseData) return;
            try {
              await updateExercise({ ...exerciseData, time: timerValue });
              router.back();
            } catch (e) {
              console.log('Error updating', e);
            }
          }}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
   </SafeAreaView>
    )
}