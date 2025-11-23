import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { View, Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { dishes } from '../data/dishes.js';
import { styles } from '../styles/styles.js';
import { fonts } from '../fonts/fonts.js';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

registerRootComponent(Index);

export default function Index() {

  const router = useRouter()

  const addToCart = (dish) => {
    setCart([...cart, dish]);
    Alert.alert('Agregado', `${dish.name} agregado al carrito`);
  };

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

  if (!fontsLoaded) return null

    const handlePress = (id) =>{
    router.push(`/exercises/${id}`)
  }

  return (
  <SafeAreaProvider>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Ejercicios</Text>

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        
          <View style={styles.card}>  
               
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modButton}
              onPress={() => handlePress(item.id)}
            >
              <Text style={styles.buttonText}>Editar</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delButton}
              onPress={() => alert('¿Estás seguro de eliminarlo?')}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            </View>

          </View>
         
        )}
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