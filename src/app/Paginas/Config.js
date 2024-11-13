import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';

export default function Adicionar() {
  const [Equipamentos, setEquipamentos] = useState("");
  const [Profissionais, setProfissionais] = useState("");
  const [Auditor, setAuditor] = useState("");
  const [Contrato, setContrato] = useState("");

  const fetchAuditor = async () => {
    const { data, error } = await supabase.from("Auditor").select("*");
    if (error) {
      console.error(error);
    } else {
      console.log(data); // Mostra os dados recuperados para depuração
    }
  };

  const AdicionarAuditor = async () => {
    if (!Auditor) return;
    const { data, error } = await supabase
      .from('Auditor')
      .insert([{ NomedoAuditor: Auditor }])
      .select();
    if (error) {
      console.error(error);
    } else {
      await fetchAuditor();
      setAuditor("");
    }
  };

  useEffect(() => {
    fetchAuditor(); 
  }, []);

  const fetchEquipamentos = async () => {
    const { data, error } = await supabase.from("Equipamentos").select("*");
    if (error) {
      console.error(error);
    } else {
      console.log(data); // Mostra os dados recuperados para depuração
    }
  };

  const AdicionarEquipamento = async () => {
    if (!Equipamentos) return;
    const { data, error } = await supabase
      .from('Equipamentos')
      .insert([{ NomedosEquipamentos: Equipamentos }])
      .select();
    if (error) {
      console.error(error);
    } else {
      await fetchEquipamentos();
      setEquipamentos("");
    }
  };

  useEffect(() => {
    fetchEquipamentos(); 
  }, []);

  const fetchProfissionais = async () => {
    const { data, error } = await supabase.from("Profissionais").select("*");
    if (error) {
      console.error(error);
    } else {
      console.log(data); // Mostra os dados recuperados para depuração
    }
  };

  const AdicionarProfissional = async () => {
    if (!Profissionais) return;
    const { data, error } = await supabase
      .from('Profissionais')
      .insert([{ NomedosProfissionais: Profissionais }])
      .select();
    if (error) {
      console.error(error);
    } else {
      await fetchProfissionais();
      setProfissionais("");
    }
  };

  useEffect(() => {
    fetchProfissionais(); 
  }, []);

  const fetchContrato = async () => {
    const { data, error } = await supabase.from("Contrato").select("*"); 
    if (error) {
      console.error(error);
    } else {
      console.log(data); // Mostra os dados recuperados para depuração
    }
  };
  
  const AdicionarContrato = async () => {
    if (!Contrato) return; // Verifica se o campo não está vazio
    const { data, error } = await supabase
      .from('Contrato') // Alterado para "Contrato"
      .insert([{ NomedoContrato: Contrato }]) // Alterado para "NomedoContrato"
      .select();
    if (error) {
      console.error(error);
    } else {
      await fetchContrato();
      setContrato(""); // Reseta o campo "Contrato" após a inserção
    }
  };
  
  useEffect(() => {
    fetchContrato(); 
  }, []);
  

  return (
          <ScrollView>
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.subtitle}>Adicione um contrato</Text>
        <TextInput 
          style={styles.input}
          placeholder="Insira o contrato"
          onChangeText={setContrato} 
          value={Contrato} 
        />
        <View style={{ marginBottom: 10 }}> {/* Adicionando espaçamento abaixo do botão */}
          <Button
            title='Adicionar Contrato'
            onPress={AdicionarContrato}
          />
        </View>

        <Text style={styles.subtitle}>Adicione um equipamento</Text>
        <TextInput 
          style={styles.input}
          placeholder="Insira o equipamento"
          onChangeText={setEquipamentos} 
          value={Equipamentos} 
        />
        <View style={{ marginBottom: 10 }}> {/* Adicionando espaçamento abaixo do botão */}
          <Button
            title='Adicionar Equipamento'
            onPress={AdicionarEquipamento}
          />
        </View>

        <Text style={styles.subtitle}>Adicione um Auditor</Text>
        <TextInput
          style={styles.input}
          placeholder="Inserir Auditor"
          onChangeText={setAuditor}
          value={Auditor}
        />
        <View style={{ marginBottom: 10 }}>
          <Button 
            title='Adicionar Auditor'
            onPress={AdicionarAuditor}
          />
        </View>

        <Text style={styles.subtitle}>Adicione um Profissional</Text>
        <TextInput
          style={styles.input}
          placeholder="Adicionar Profissional"
          onChangeText={setProfissionais}
          value={Profissionais}
        />
        <View style={{ marginBottom: 10 }}>
          <Button 
            title='Adicionar Profissional'
            onPress={AdicionarProfissional}
          />
        </View>
      </View>

      <View style={[styles.botão, { marginBottom: 10 }]}>
        <Button 
          title="Voltar"
          onPress={() => router.replace("/")}
          color="#000000" 
        />  
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
