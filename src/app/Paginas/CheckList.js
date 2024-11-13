import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator,Image } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list'

function Inicio() {
  const navigateToHome = () => {
    router.replace("/");
  };

  return navigateToHome;
}

export default function CheckList() {
  const [Equipamentos, setEquipamentos] = useState("");
  const [Quantidade, setQuantidade] = useState([]);
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


    const fetchCheckList = async () => {
        try {
            const { data: equipamentos, error } = await supabase
                .from('Equipamentos') // Replace with your actual table name
                .select('NomedosEquipamentos'); // Adjust according to your column name

            if (error) throw error; // Throw error if exists

            // Format data for SelectList
            const formattedData = equipamentos.map(item => ({
                key: item.NomedosEquipamentos.toString(), // Ensure key is a string
                value: item.NomedosEquipamentos // Use the equipment name as value
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
        fetchCheckList();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;

    const handleAddTask = async () => {
      if (!Equipamentos) return;
  
      const { data, error } = await supabase
        .from('CheckList')
        .insert([
          { Equipamentos: Equipamentos, Quantidade: Quantidade }, 
        ])
        .select();
  
      if (error) {
        console.error(error);
      } else {
        await fetchCheckList();
        setEquipamentos("");
        setQuantidade(""); 
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Image
      source={require('../../../assets/images/icon.png')}
      style={styles.image}
      resizeMode="contain"/>
        <Text style={styles.subtitle}>Equipamento</Text>
        <SelectList style={styles.input}
           placeholder='Selecione o equipamento'
           data={data} 
           save="value"  
           setSelected={setEquipamentos}
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
          onPress={Inicio()}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
  );
}