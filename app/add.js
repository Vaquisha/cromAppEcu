import { View, Text,TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../styles/styles";
import { useRouter } from 'expo-router';

export default function AddScreen() {

    const router = useRouter()

    return(
      
      <SafeAreaView>
          <KeyboardAvoidingView>
            <ScrollView>
            <View style={styles.field}> 
                <Text style={styles.label}>Nombre</Text>
                <TextInput style={styles.input}/>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input}/>
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Tiempo</Text>
                <TextInput style={styles.input}/>
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
    );
}

