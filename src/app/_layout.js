import { Stack } from "expo-router";
import { StyleSheet } from "react-native";


export default function Layout() {
    return(
    <Stack
        screenOptions = {{
            headerStyle: {
                backgroundColor: "#045785"
            },
        headerTintColor: "#fff",
        headerTitleAlign:'center'
        }}>
        <Stack.Screen name='index' options={{ title : 'Pagina Inicial' }}/>
        <Stack.Screen name='Paginas/CheckList' options={{ title : 'Check List' }}/>
        <Stack.Screen name='Paginas/ControleEfetivo' options={{ title : 'Controle de Efetivos' }}/>
        <Stack.Screen name='Paginas/Ocorrencias' options={{ title : 'Ocorrências' }}/>
        <Stack.Screen name='Paginas/Sesmt' options={{ title : 'SESMT' }}/>
        <Stack.Screen name='Paginas/Treinamentos' options={{ title : 'Treinamentos' }}/>
        <Stack.Screen name='Paginas/PTs' options={{ title : 'Permissões de Trabalho' }}/>
        <Stack.Screen name='Paginas/Config' options={{ title : 'Configurações' }}/>
        <Stack.Screen name='Paginas/RIS' options={{ title : 'RIS' }}/>        
    </Stack> 
    )
}

export const styles = StyleSheet.create({
    RIScontainer: {
    padding: 20,
},
    botão: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 16,
      },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
      },
      title: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'left',
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 6,
        borderRadius: 4,
      },
      buttonContainer: {
        marginTop: 5,
      },
      EstiloBoto: {
        marginBottom: 3,
        borderRadius: 8,
      },
      toggleText: {
        color: '#d90d98',
        textAlign: 'center',
      },
      bottomContainer: {
        marginTop: 20,
      },
      emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
      },
      icon: {
        position: 'absolute', 
        bottom: 20,            
        right: 20,     
        borderRadius: 20, 
        padding: 10, 
      },
      dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',           
    },
    image:{
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2c3e50',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        elevation: 7,
      },
});
