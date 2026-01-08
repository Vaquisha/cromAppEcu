import React, { useState } from 'react';
import { View, Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TimerModal from '../components/Modal/modal.js';
import { useExercises } from '../data/excercises.js';
import { styles } from '../styles/styles.js';
import { fonts } from '../fonts/fonts.js';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

function formatTime(value) {
  if (value == null) return '00:00';

  // If already in mm:ss format
  if (typeof value === 'string' && value.includes(':')) {
    const parts = value.split(':').map(p => p.replace(/\D/g, ''));
    const mm = String(Number(parts[0] || 0)).padStart(2, '0');
    const ss = String(Number(parts[1] || 0)).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  // Try numeric conversion
  const n = Number(value);
  if (Number.isNaN(n)) return '00:00';

  let totalSeconds = 0;
  // If string had a decimal (e.g. "5.5") treat as minutes.decimal -> convert to seconds
  if (typeof value === 'string' && value.includes('.')) {
    totalSeconds = Math.round(n * 60);
  } else {
    // If numeric value is large, assume it's already seconds; otherwise assume seconds too.
    totalSeconds = Math.round(n);
  }

  totalSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function Index() {

  const router = useRouter()
  const { exerciseList, removeValue } = useExercises();

  const [fontsLoaded] = useFonts ({
    [fonts.LatoBlack]: require("../fonts/Lato/Lato-Black.ttf"),
    [fonts.LatoRegular]: require("../fonts/Lato/Lato-Regular.ttf"),
    [fonts.LatoThin]: require("../fonts/Lato/Lato-Thin.ttf"),
    [fonts.LatoBold]: require("../fonts/Lato/Lato-Bold.ttf"),
    [fonts.LatoLight]: require("../fonts/Lato/Lato-Light.ttf"),

    [fonts.MontserratBlack]: require("../fonts/Montserrat/static/Montserrat-Black.ttf"),
    [fonts.MontserratBold]: require("../fonts/Montserrat/static/Montserrat-Bold.ttf"),
    [fonts.MontserratExtraBold]: require("../fonts/Montserrat/static/Montserrat-ExtraBold.ttf"),
    [fonts.MontserratExtraLight]: require("../fonts/Montserrat/static/Montserrat-ExtraLight.ttf"),
    [fonts.MontserratLight]: require("../fonts/Montserrat/static/Montserrat-Light.ttf"),
    [fonts.MontserratMedium]: require("../fonts/Montserrat/static/Montserrat-Medium.ttf"),
    [fonts.MontserratRegular]: require("../fonts/Montserrat/static/Montserrat-Regular.ttf"),
    [fonts.MontserratSemiBold]: require("../fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
    [fonts.MontserratThin]: require("../fonts/Montserrat/static/Montserrat-Thin.ttf"),
  })

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!fontsLoaded) return null

  if (!exerciseList || exerciseList.length === 0) {
    return (
      <SafeAreaProvider>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.name,{ fontSize: 20 }]}>No hay ejercicios disponibles.</Text>

          <Pressable>
            <TouchableOpacity onPress={() => router.push("add")} style={[styles.addButton, { marginTop: '2.5%' }]}>
              <Text style={[styles.buttonText, { fontSize: 18 }]}>Añadir nuevo ejercicio</Text>
            </TouchableOpacity>
          </Pressable>
        </View>

      </SafeAreaProvider>
    );
  }

    const handlePress = (id) =>{
    router.push(`/exercises/${id}`)
  }

    const openModal = (item) => {
      setSelectedExercise(item);
      setModalVisible(true);
    }

  return (
  <SafeAreaProvider>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Ejercicios</Text>

      <FlatList
        data={exerciseList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
        
          <View style={styles.card}>  
          <TouchableOpacity onPress={() => openModal(item)}>
          
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{formatTime(item.time)}</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modButton}
              onPress={() => handlePress(item.id)}>
                
              <Text style={styles.buttonText}>Editar</Text>

            </TouchableOpacity>

              <TouchableOpacity
              style={styles.delButton}
              onPress={() => Alert.alert('Estás a punto de eliminar este ejercicio', `¿Estás seguro de que deseas eliminar ${item.name}?`, [({ text: 'Cancelar', style: 'cancel' }), { text: 'Eliminar', style: 'destructive', onPress: () => removeValue(item.id) }, ])}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            </View>
  
          </TouchableOpacity>
          </View>
         
        )}
      />

      <TimerModal
        visible={modalVisible}
        timeValue={selectedExercise?.time}
        name={selectedExercise?.name}
        onClose={() => { setModalVisible(false); setSelectedExercise(null); }}
      />

      <Pressable>
        <TouchableOpacity onPress={() => router.push("add")} style={styles.addButton}>
          <Text style={styles.buttonText}>Añadir nuevo ejercicio</Text>
        </TouchableOpacity>
      </Pressable>

    </View>
  </SafeAreaProvider>
  );
}