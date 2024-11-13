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

export default function PT() {
  const [Descricao, setDescricao] = useState("");
  const [Quantidade, setQuantidade] = useState([]);

  const fetchPT = async () => {
    const { data, error } = await supabase.from("PT").select("*");

    if (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (!Descricao) return; // Verifica se Efetivo não está vazio

    const { data, error } = await supabase
      .from('PT')
      .insert([
        { Descricao: Descricao, Quantidade: Quantidade }, 
      ])
      .select();

    if (error) {
      console.error(error);
    } else {
      await fetchPT();
      setQuantidade("");
      setDescricao(""); 
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
      resizeMode="contain"/>
      <View>
        <Text 
          style={styles.subtitle}>
          Descrição
          </Text>
        <TextInput 
          style={styles.input}
          placeholder="Insira a descrição"
          onChangeText={setDescricao} 
          value={Descricao} 
        />
        <Text 
          style={styles.subtitle}>
          Quantidade
          </Text>
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
        <Button 
          title="Voltar"
          onPress={Inicio()}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
  );
}