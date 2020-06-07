import React, { useEffect, useState } from 'react';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';
import Loading from '../../components/Loading';

import styles from './styles';

interface RouteParams {
  collection_point_id: number;
}

interface Data {
  serializedPoint: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    uf: string;
    street: string;
    number: string;
  };
  items: {
    title: string;
  }[];
}

const CollectionPoints = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [loading, setLoading] = useState(true);
  
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  // load collection point data
  useEffect(() => {
      api.get(`collection_points/${routeParams.collection_point_id}`).then(response => {
        setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (data.serializedPoint) {
      setLoading(false);
    }
  }, [data]);

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.serializedPoint.email],
    });
  };

  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.serializedPoint.phone}&text=Tenho interesse sobre coleta de resíduos`);
  };

  if (loading) {
    return <Loading />
    
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: data.serializedPoint.image_url }}
        />

      <Text style={styles.pointName}>{data.serializedPoint.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.serializedPoint.city}, {data.serializedPoint.uf}
          </Text>
          <Text style={styles.addressContent}>
            Rua {data.serializedPoint.street}, nº {data.serializedPoint.number}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={handleWhatsApp}
        >
          <FontAwesome name='whatsapp' size={20} color='#FFF' />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton
          style={styles.button}
          onPress={handleComposeMail}
        >
          <Icon name='mail' size={20} color='#FFF' />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default CollectionPoints;
