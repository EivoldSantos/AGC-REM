import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../_layout';
import { supabase } from "../services/supabase";
import { useNavigation } from '@react-navigation/native';
import { ImagePicker } from 'expo-image-picker';
import { router } from 'expo-router';

function Inicio() {
    const navigateToHome = () => {
      router.replace("/");
    };
  
    return navigateToHome;
}

const RiskForm = () => {

    const navigation = useNavigation();
    const [envolvido, setEnvolvido] = useState('');
    const [cliente, setCliente] = useState('');
    const [contrato, setContrato] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [localName, setLocalName] = useState('');
    const [auditor, setAuditor] = useState('');
    const [lider, setLider] = useState('');
    const [descricaoDesvio, setDescricaoDesvio] = useState('');
    const [risco, setRisco] = useState([]);
    const [prazoPrevisto, setPrazoPrevisto] = useState(new Date());
    const [prazoFinalizado, setPrazoFinalizado] = useState(new Date());
    const [showPrevisto, setShowPrevisto] = useState(false);
    const [showFinalizado, setShowFinalizado] = useState(false);
    const [classificacaoDesvio, setClassificacaoDesvio] = useState('');
    const [dataClientes, setDataClientes] = useState([]);
    const [dataAuditores, setDataAuditores] = useState([]);
    const [dataContrato, setDataContrato] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const Disciplina = [
        { key: '1', value: 'Segurança' },
        { key: '33', value: 'Meio ambiente' },
        { key: '34', value: 'Saúde' },
    ];

    const classificacaoDesvioOptions = [
        { key: '1', value: 'Crítico' },
        { key: '2', value: 'Sistêmico' },
        { key: '3', value: 'Trivial' },
    ];

    const safetyItems = [
        { key: '2', value: 'Mudança de posição' },
        { key: '3', value: 'Parada do trabalho' },
        { key: '4', value: 'Ajuste do EPI' },
        { key: '5', value: 'Adequação do serviço' },
        { key: '6', value: 'Colisão com ou ser atingido por' },
        { key: '7', value: 'Risco de aprisionamento' },
        { key: '8', value: 'Risco de queda no mesmo nível' },
        { key: '9', value: 'Risco de queda em nível diferente' },
        { key: '10', value: 'Risco de queimadura' },
        { key: '11', value: 'Risco de choque elétrico' },
        { key: '12', value: 'Inalação de contaminantes' },
        { key: '13', value: 'Absorção de contaminantes' },
        { key: '14', value: 'Ingestão de contaminantes' },
        { key: '15', value: 'Postura inadequada' },
        { key: '16', value: 'Esforço inadequado' },
        { key: '17', value: 'Trabalho sobreposto' },
        { key: '18', value: 'Uso não autorizado de celular' },
        { key: '19', value: 'Cabeça' },
        { key: '20', value: 'Sistema respiratório' },
        { key: '21', value: 'Olhos e rosto' },
        { key: '22', value: 'Ouvidos' },
        { key: '23', value: 'Mãos e braços' },
        { key: '24', value: 'Tronco' },
        { key: '25', value: 'Pés e pernas' },
        { key: '26', value: 'Impropriedade para o serviço' },
        { key: '27', value: 'Uso incorreto' },
        { key: '28', value: 'Condições inseguras' },
        { key: '29', value: 'Ausência de inspeção de rotina' },
        { key: '30', value: 'Falha na manutenção' },
        { key: '31', value: 'Inadequação' },
        { key: '32', value: 'Ausência de procedimentos escritos' },
        { key: '38', value: 'Procedimentos adequados, mas não seguidos' },
        { key: '39', value: 'Falta de implementação' },
        { key: '40', value: 'Local sujo' },
        { key: '41', value: 'Local desorganizado' },
        { key: '42', value: 'Local com vazamentos' },
        { key: '43', value: 'Irregularidades na sinalização' },
        { key: '44', value: 'Irregularidades na circulação' },
        { key: '45', value: 'Irregularidades nos isolamentos' },
        { key: '46', value: 'Irregularidades nos dispositivos de proteção coletiva' },
        { key: '47', value: 'Irregularidades nos extintores de incêndio' },
        { key: '48', value: 'Irregularidades na rota de fuga' },
        { key: '49', value: 'Ausência de ponto de encontro' },
        { key: '50', value: 'Irregularidades no plano de comunicação' },
        { key: '51', value: 'Irregularidades no fluxo de atendimento' },
        { key: '52', value: 'Irregularidades nos trabalhos em altura' },
        { key: '53', value: 'Irregularidades nos trabalhos em espaços confinados' },
        { key: '54', value: 'Irregularidades nos trabalhos de escavação' },
        { key: '55', value: 'Irregularidades nos trabalhos em áreas energizadas' },
        { key: '56', value: 'Irregularidades em demais energias perigosas' },
        { key: '57', value: 'Irregularidades nas atividades com movimentação de carga' },
        { key: '58', value: 'Irregularidades nos trabalhos a quente' },
        { key: '59', value: 'Irregularidades nos andaimes' },
        { key: '60', value: 'Irregularidades no armazenamento de produtos químicos' },
        { key: '61', value: 'Irregularidades na coleta seletiva' },
        { key: '62', value: 'Falta de higienização das caixas d\'água' },
        { key: '63', value: 'Falta de higienização dos bebedouros' },
        { key: '64', value: 'Irregularidades no PMOC' },
        { key: '65', value: 'Falta de controle de agentes vetores' }
      ]; 

    const fetchData = async () => {
        try {
            setLoading(true);
            const [clientes, contratos, auditores] = await Promise.all([
                supabase.from('Clientes').select('NomedosClientes'),
                supabase.from('Contrato').select('NomeContratos'),
                supabase.from('Auditor').select('NomedoAuditor'),
            ]);

            if (clientes.error || contratos.error || auditores.error) {
                throw new Error('Erro ao buscar dados');
            }

            setDataClientes(clientes.data.map(item => ({ key: item.NomedosClientes.toString(), value: item.NomedosClientes })));
            setDataContrato(contratos.data.map(item => ({ key: item.NomeContratos.toString(), value: item.NomeContratos })));
            setDataAuditores(auditores.data.map(item => ({ key: item.NomedoAuditor.toString(), value: item.NomedoAuditor })));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permissão necessária", "Permissão para acessar a galeria é necessária.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled) {
            setSelectedImage(pickerResult.uri);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        const fileExt = selectedImage.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `images/${fileName}`;
        
        const { data, error } = await supabase
            .storage
            .from('Fotos Antes')
            .upload(filePath, selectedImage, {
                contentType: 'image/jpeg',
            });

        if (error) {
            console.error("Erro ao enviar imagem:", error.message);
            Alert.alert("Erro", "Ocorreu um erro ao enviar a imagem. Por favor, tente novamente.");
        } else {
            Alert.alert("Sucesso", "Imagem enviada com sucesso!");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddTask = async () => {
        if (!cliente || !auditor || !descricaoDesvio || !localName) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const { error } = await supabase
                .from('RIS')
                .insert([
                    {
                        Envolvido: envolvido,
                        Disciplina: disciplina,
                        Cliente: cliente,
                        ClassificacaoDesvio: classificacaoDesvio,
                        Auditor: auditor,
                        Risco: risco,
                        PrazoPrevisto: prazoPrevisto,
                        PrazoFinalizado: prazoFinalizado,
                        Local: localName,
                        DescricaoDesvio: descricaoDesvio,
                        Contrato: contrato,
                        Lider: lider
                    }
                ]);

            if (error) throw error;
            Alert.alert("Sucesso", "Dados enviados com sucesso!");

        } catch (err) {
            console.error("Erro ao enviar dados:", err.message);
            Alert.alert("Erro", "Ocorreu um erro ao enviar os dados. Por favor, tente novamente.");
        }
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <ScrollView style={styles.RIScontainer}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.image} resizeMode="contain" />
            <Text>Cliente:</Text>
            <SelectList
                placeholder="Selecione o cliente"
                data={dataClientes}
                searchPlaceholder="Pesquisar"
                save="value"
                setSelected={setCliente}
                selected={cliente}
            />
            <Text>Contrato:</Text>
            <SelectList
                placeholder="Selecione o contrato"
                data={dataContrato}
                searchPlaceholder="Pesquisar"
                save="value"
                setSelected={setContrato}
                selected={contrato}
            />
            <Text>Local:</Text>
            <TextInput
                value={localName}
                onChangeText={setLocalName}
                style={styles.input}
            />
            <Text>Auditor:</Text>
            <SelectList
                placeholder="Selecione o auditor"
                data={dataAuditores}
                searchPlaceholder="Pesquisar"
                save="value"
                setSelected={setAuditor}
                selected={auditor}
            />
            <Text>Líder:</Text>
            <TextInput
                value={lider}
                onChangeText={setLider}
                style={styles.input}
            />
            <Text>Disciplina:</Text>
            <SelectList
                placeholder="Selecione a disciplina"
                searchPlaceholder="Pesquisar"
                data={Disciplina}
                save="value"
                setSelected={setDisciplina}
                selected={disciplina}
            />
            <Text>Descrição do Desvio:</Text>
            <TextInput
                value={descricaoDesvio}
                onChangeText={setDescricaoDesvio}
                style={styles.input}
                multiline
                maxLength={500}
            />
            <Text>Classificação Desvio:</Text>
            <SelectList
                placeholder="Selecione o tipo de desvio"
                data={classificacaoDesvioOptions}
                save="value"
                setSelected={setClassificacaoDesvio}
                selected={classificacaoDesvio}
            />
            <Text>Risco:</Text>
            <MultipleSelectList
                placeholder="Selecione o tipo de risco"
                searchPlaceholder="Pesquisar"
                setSelected={setRisco}
                data={safetyItems}
                save="value"
                selected={risco}
            />
            <Text>Envolvido:</Text>
            <TextInput
                value={envolvido}
                onChangeText={setEnvolvido}
                style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPrevisto(true)}>
                <Text style={styles.dateInput}>Prazo Previsto: {prazoPrevisto.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showPrevisto && (
                <DateTimePicker
                    value={prazoPrevisto}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowPrevisto(false);
                        if (date) setPrazoPrevisto(date);
                    }}
                />
            )}
            <TouchableOpacity onPress={() => setShowFinalizado(true)}>
                <Text style={styles.dateInput}>Prazo Finalizado: {prazoFinalizado.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showFinalizado && (
                <DateTimePicker
                    value={prazoFinalizado}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowFinalizado(false);
                        if (date) setPrazoFinalizado(date);
                    }}
                />
            )}

            <Button title="Escolher Imagem Anterior" onPress={handleImagePick} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />}
            <Button title="Escolher Imagem Posterior" onPress={handleImagePick} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />}
            <Button title="Enviar" onPress={handleAddTask && handleImageUpload} />
            <Button title="Voltar" onPress={Inicio()} color="#000000" />
            <Text></Text>
        </ScrollView>
    );
};

export default RiskForm;
