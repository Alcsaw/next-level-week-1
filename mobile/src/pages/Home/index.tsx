import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
};

interface IBGECityResponse {
    nome: string;
};

const Home = () => {
    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [selectedUF, setSelectedUF] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')

    // load UFs
    useEffect(() => {
        // I had to change the URL to http (insted of https)
        // because when using https the request failed most of the times.
        // After diggind through the Internet, I found that SSL
        // certificates may cause the problem so http would be better
        axios.get<IBGEUFResponse[]>('http://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                const ufAbreviations = response.data.map(uf => uf.sigla);
                setUfs(ufAbreviations)
            });     
    }, []);

    // load cities
    useEffect(() => {
        if (selectedUF === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            });
    }, [selectedUF]);

    function handleSelectUF(value: string) {
        setSelectedUF(value);
    };

    function handleSelectCity(value: string) {
        setSelectedCity(value);
    };

    function handleNavigateToCollectionPoints() {
        navigation.navigate('CollectionPoints', {
            selectedUF,
            selectedCity,
        });
    };
    
    return (
        <KeyboardAvoidingView
            style= {{ flex:1 }}
            behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
        >
            {console.log(ufs)}
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>
                
                <View style={styles.footer}>
                    <RNPickerSelect
                        style={{
                            inputAndroidContainer: styles.inputContainer,
                            inputAndroid: styles.inputAndroid,
                            inputIOS: styles.inputIOS
                        }}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={handleSelectUF}
                        value={selectedUF}
                        placeholder={{
                            label: 'Selecione uma UF',
                            value: '0'
                        }}
                        items={
                            ufs.map(uf => ({
                                label: uf,
                                value: uf,
                            }))
                        }
                    />

                    <RNPickerSelect
                        style={{
                            inputAndroidContainer: styles.inputContainer,
                            inputAndroid: styles.inputAndroid,
                            inputIOS: styles.inputIOS
                        }}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={handleSelectCity}
                        disabled={selectedUF === '0'}
                        value={selectedCity}
                        placeholder={{
                            label: 'Selecione uma cidade',
                            value: '0'
                        }}
                        items={
                            cities.map(city => ({
                                label: city,
                                value: city,
                            }))
                        }
                    />

                    <RectButton style={styles.button} onPress={handleNavigateToCollectionPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name='arrow-right' color='#FFF' size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default Home;
