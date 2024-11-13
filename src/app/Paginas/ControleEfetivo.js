import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput,Image } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';


function Inicio() {
  const navigateToHome = () => {
    router.replace("/");
  };

  return navigateToHome;
}

export default function ControleEfetivos() {
  const [Efetivo, setEfetivo] = useState("");
  const [HorasTrabalhadas, setHorasTrabalhadas] = useState([]);

  const fetchControleEfetivo = async () => {
    const { data, error } = await supabase.from("ControleEfetivos").select("*");

    if (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (!Efetivo) return; // Verifica se Efetivo não está vazio

    const { data, error } = await supabase
      .from('ControleEfetivos')
      .insert([
        { Efetivo: Efetivo, HorasTrabalhadas: HorasTrabalhadas }, 
      ])
      .select();

    if (error) {
      console.error(error);
    } else {
      await fetchControleEfetivo();
      setEfetivo("");
      setHorasTrabalhadas(""); 
    }
  };

  useEffect(() => {
    fetchControleEfetivo(); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
      source={require('../../../assets/images/icon.png')}
      style={styles.image}
      resizeMode="contain"/>
      <View>
        <Text 
          style={styles.subtitle}>
          Efetivos
          </Text>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          placeholder="Coloque a quantidade de Efetivos"
          onChangeText={setEfetivo} 
          value={Efetivo} 
        />
        <Text 
          style={styles.subtitle}>
          Horas Trabalhadas
          </Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder="Digite as Horas Trabalhadas"
          onChangeText={setHorasTrabalhadas}
          value={HorasTrabalhadas}
        />
        <Button
          title='Adicionar'
          onPress={handleAddTask}
        />
      </View>

      <View style={styles.botão}>
        <Button 
          title="Voltar"
          onPress={Inicio()}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
  );
}