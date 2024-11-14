import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';

function Inicio() {
  const navigateToHome = () => {
    router.replace("/");
  };

  return navigateToHome;
}

export default function SESMT() {
  const [Profissionais, setProfissionais] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchProfissionais = async () => {
    try {
      const { data: Profissionais, error } = await supabase
        .from('Profissionais') // Replace with your actual table name
        .select('NomedosProfissionais'); // Adjust according to your column name

      if (error) throw error; // Throw error if exists

      // Format data for SelectList
      const formattedData = Profissionais.map(item => ({
        key: item.NomedosProfissionais.toString(), // Ensure key is a string
        value: item.NomedosProfissionais // Use the professional name as value
      }));

      setData(formattedData); // Set formatted data to state
    } catch (err) {
      console.error(err);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    fetchProfissionais();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  const handleAddTask = async () => {
    if (!Profissionais || !Quantidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return; // Verifica se Profissionais e Quantidade não estão vazios
    }

    const { data, error } = await supabase
      .from('SESMT')
      .insert([
        { Profissional: Profissionais, Quantidade: Quantidade }, 
      ])
      .select();

    if (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível adicionar o profissional.");
    } else {
      await fetchProfissionais();
      setProfissionais("");
      setQuantidade(""); 
      Alert.alert("Sucesso", "Profissional adicionado com sucesso!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.subtitle}>Profissional</Text>
        <SelectList 
          style={styles.input}
          placeholder='Selecione o profissional'
          data={data} 
          save="value"  
          setSelected={setProfissionais}
        />
        <Text style={styles.subtitle}>Quantidade</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder="Digite a quantidade"
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
          onPress = {Inicio()}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
  );
}