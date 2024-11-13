import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import {router} from 'expo-router'
import { styles } from './src/app/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/EvilIcons';


export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Acompanha a autenticação do
    const [isLogin, setIsLogin] = useState(true);
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, [auth]);

    const handleAuthentication = async () => {
      try {
        if (user) {
          //If user is already authenticated, log out
          console.log('Usuário deslogado  com sucesso!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario logado com sucesso!');
          } else {
             // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuário criado com sucesso!');
          }
        }
      } catch (error) {
        console.error('Erro de autenticação:', error.message);
      }

    };
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {user ? (
          // Mostrar o e-mail do utilizador se este estiver autenticado
          <PaginaAuthenticated user={user} handleAuthentication={handleAuthentication} />
        ) : (
          // Mostrar formulário de inscrição ou de registo se o utilizador não estiver autenticado
          <PaginaAuth
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        )}
      </ScrollView>  
    )
}

const firebaseConfig = {
  apiKey: "AIzaSyB8PkMfiKp71BwpbPxZNSj3uJSUO24JipA",
  authDomain: "agc-rem.firebaseapp.com",
  projectId: "agc-rem",
  storageBucket: "agc-rem.appspot.com",
  messagingSenderId: "996806465064",
  appId: "1:996806465064:web:e8899fba6597b214f0471d",
  measurementId: "G-VMTRJ0R48J"
};

const app = initializeApp(firebaseConfig);

const PaginaAuth = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Login' : 'Cadastrar'}</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="No mínimo 6 caracteres"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Entrar' : 'Inscrever-se'} 
        onPress={handleAuthentication} 
        color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} 
          onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Precisa de uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
        </Text>
      </View>
    </View>
  );
}

const PaginaAuthenticated = ({handleAuthentication}) => {
  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Bem-vindo a gestão da Global_Services!</Text>
    <Image
      source={require('../../assets/images/icon.png')}
      style={styles.image}
      resizeMode="contain"/>
    <Text style={styles.subtitle}>Escolha uma das opções abaixo:</Text>

  <View style={styles.buttonContainer}>
    <View style={styles.EstiloBoto}>
      <Button
        title="Controle de Efetivos"
        onPress={() => router.navigate('./Paginas/ControleEfetivo')}
        color="#e74c3c" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="Check List"
        onPress={() => router.navigate('./Paginas/CheckList')}
        color="#3498db" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="Permissões de Trabalho"
        onPress={() => router.navigate('./Paginas/PTs')}
        color="#2ecc71" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="Ocorrências"
        onPress={() => router.navigate('./Paginas/Ocorrencias')}
        color="#9b59b6" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="Treinamentos"
        onPress={() => router.navigate('./Paginas/Treinamentos')}
        color="#f1c40f" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="SESMT"
        onPress={() => router.navigate('./Paginas/Sesmt')}
        color="#e67e22" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="RIS"
        onPress={() => router.navigate('./Paginas/RIS')}
        color="#84411e" // Cor específica para o botão
      />
    </View>
    <View style={styles.EstiloBoto}>
      <Button
        title="Logout"
        onPress={handleAuthentication}
        color="#34495e" // Cor específica para o botão
      />
    </View>
  </View>
  <Icon 
      name="gear"
      size={40}
      color="black"
      onPress={() => router.navigate('./Paginas/Config')}
  />
</SafeAreaView>
  )
}