import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, Alert } from 'react-native';
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
  const [HorasTrabalhadas, setHorasTrabalhadas] = useState("");

  const fetchControleEfetivo = async () => {
    const { data, error } = await supabase.from("ControleEfetivos").select("*");

    if (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  };

  const handleAddTask = async () => {
    if (!Efetivo || !HorasTrabalhadas) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return; // Verifica se Efetivo e Horas Trabalhadas não estão vazios
    }

    const { data, error } = await supabase
      .from('ControleEfetivos')
      .insert([
        { Efetivo: Efetivo, HorasTrabalhadas: HorasTrabalhadas }, 
      ])
      .select();

    if (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível adicionar o efetivo.");
    } else {
      await fetchControleEfetivo();
      setEfetivo("");
      setHorasTrabalhadas(""); 
      Alert.alert("Sucesso", "Efetivo adicionado com sucesso!");
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
        resizeMode="contain"
      />
      <View>
        <Text style={styles.subtitle}>Efetivos</Text>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          placeholder="Coloque a quantidade de Efetivos"
          onChangeText={setEfetivo} 
          value={Efetivo} 
        />
        <Text style={styles.subtitle}>Horas Trabalhadas</Text>
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
          onPress = {Inicio()}
          color="#000000" 
        /> 
      </View>
    </SafeAreaView>
  );
}