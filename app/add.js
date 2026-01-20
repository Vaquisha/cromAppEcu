import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Alert, Keyboard } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../styles/styles";
import { useRouter } from 'expo-router';
import CustomTimerInput from '../components/Timer/timer.js'
import { useExercises } from "../data/excercises";

export default function AddScreen() {

    const router = useRouter()
    const scrollViewRef = useRef(null);
    const PhoneDimensions = Dimensions.get('screen');
    const { storeData } = useExercises();
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [timerValue, setTimerValue] = useState(0);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    const handleSave = async () => {
      try {

        if (newName.trim() === '' || newDescription.trim() === '' || timerValue === 0) 
          {
        Alert.alert('Atención', 'Por favor, completa todos los campos antes de guardar.');
        return
            }

        await storeData({ name: newName, description: newDescription, time: timerValue });

        router.back();

        
      } catch (e) {
        console.log('Error saving exercise', e);
      }
    }

    return(
      <SafeAreaView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 100:60}>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} scrollEnabled={keyboardVisible}>
            <View style={styles.field}> 
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Aquí va el nombre de tu ejercicio" placeholderTextColor="#9E9E9E"/>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput style={styles.input} value={newDescription} onChangeText={setNewDescription} placeholder="Una breve descripción del ejercicio" placeholderTextColor="#9E9E9E"/>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Tiempo</Text>
              <CustomTimerInput onChange={setTimerValue} />
            </View>
          

        <View style={[styles.modpagesContainer, {marginTop: PhoneDimensions.height < 800 ? '36.8%': '50%'}]}>
          <TouchableOpacity style={[styles.acceptButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );

}

