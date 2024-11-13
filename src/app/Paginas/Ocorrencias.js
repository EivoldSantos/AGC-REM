import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list'

export default function Ocorrenciass() {

function Inicio() {
  const navigateToHome = () => {
    router.replace("/");
  };

  return navigateToHome;
}

const data = [
  {key:'1', value:'Incidente Com Alto Potencial'},
  {key:'2', value:'Acidente Com Danos Materiais'},
  {key:'3', value:'Simples Atendimento Ambulatorial'},
  {key:'4', value:'Acidente Sem Afastamento Sem Readaptação'},
  {key:'5', value:'Acidente Sem Afastamento Com Readaptação'},
  {key:'6', value:'Acidente Com Afastamento'},
  {key:'7', value:'Fatalidade E Incapacidade Total Permanente (Invalidez)'},
  {key:'8', value:'Acidente Múltiplas Fatalidades'},
]
const [Ocorrencias, setOcorrencias] = useState([]);
const [Quantidade, setQuantidade] = useState([]);

  const fetchOcorrencias = async () => {
    const { data, error } = await supabase.from("Ocorrencias").select("*");

    if (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (!Ocorrencias) return; // Verifica se Efetivo não está vazio

    const { data, error } = await supabase
      .from('Ocorrencias')
      .insert([
        {Ocorrencias : Ocorrencias, Quantidade: Quantidade }, 
      ])
      .select()
    if (error) {
      console.error(error);
    } else {
      await fetchOcorrencias();
      setQuantidade("");
      setOcorrencias(""); 
    }
  };

  useEffect(() => {
    fetchOcorrencias(); 
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      <Image
      source={require('../../../assets/images/icon.png')}
      style={styles.image}
      resizeMode="contain"/>
     <View>
      <Text 
        style={styles.subtitle}>
        Ocorrências
        </Text>
    <SelectList style={styles.input}
           placeholder='Selecione o equipamento'
           data={data} 
           save="value"  
           setSelected={setOcorrencias}
        />
      <Text 
        style={styles.subtitle}>
        Quantidade
        </Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Quantidade"
        onChangeText={setQuantidade}
        value={Quantidade}
      />
      <Button
        title='Adicionar'
        onPress={handleAddTask}
      />
    </View>
      <View style = {styles.botão}>
        <Button 
          title="Voltar"
          onPress={Inicio()}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
  );
}