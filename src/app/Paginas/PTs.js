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

export default function PT() {
  const [Descricao, setDescricao] = useState("");
  const [Quantidade, setQuantidade] = useState("");

  const fetchPT = async () => {
    const { data, error } = await supabase.from("PT").select("*");

    if (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    }
  };

  const handleAddTask = async () => {
    if (!Descricao || !Quantidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return; // Verifica se Descricao e Quantidade não estão vazios
    }

    const { data, error } = await supabase
      .from('PT')
      .insert([
        { Descricao: Descricao, Quantidade: Quantidade }, 
      ])
      .select();

    if (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
    } else {
      await fetchPT();
      setQuantidade("");
      setDescricao(""); 
      Alert.alert("Sucesso", "Tarefa adicionada com sucesso!");
    }
  };

  useEffect(() => {
    fetchPT(); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.subtitle}>Descrição</Text>
        <TextInput 
          style={styles.input}
          placeholder="Insira a descrição"
          onChangeText={setDescricao} 
          value={Descricao} 
        />
        <Text style={styles.subtitle}>Quantidade</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder="Digite as Horas Trabalhadas"
          onChangeText={setQuantidade}
          value={Quantidade}
        />
        <Button
          title='Adicionar'
          onPress={handleAddTask}
        />
      </View>

      <View style={styles.botão}>
        {/* Corrigido para usar uma função anônima */}
                <Button 
          title="Voltar"
          onPress = {Inicio()}
          color="#000000" 
        />
        </View>  
    </SafeAreaView>
  );
}