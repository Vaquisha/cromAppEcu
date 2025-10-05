import { View, Text,TextInput, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "../styles/styles";
import { useRouter } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";


export default function EditScreen() {

    const router = useRouter()

    return(
        <SafeAreaProvider>
            <View style={styles.field}> 
                <Text style={styles.nameLabel}>Nombre</Text>
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
            

        <View style={styles.modpagesContainer}>
          <TouchableOpacity style={[styles.acceptButton]}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        </SafeAreaProvider>
    );
}

