import React, { useEffect, useState } from 'react';
import { Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

interface RouteParams {
  collection_point_id: number;
}

interface Data {
  collection_point: {
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
  
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  // load collection point data
  useEffect(() => {
    //console.log(`collection_points/${routeParams.collection_point_id}`);
    api.get(`collection_points/${routeParams.collection_point_id}`).then(response => {
      setData(response.data);
      //console.log(data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.collection_point.email],
    });
  };

  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.collection_point.phone}&text=Tenho interesse sobre coleta de resíduos`);
  };

  if (! data.collection_point) {
    return <View style={{ paddingTop: 40 }}>
      <Text>Loading...</Text>
    </View>
    //TODO add loading screen
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name='arrow-left' size={20} color='#34cb79' />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: data.collection_point.image_url }}
        />

      <Text style={styles.pointName}>{data.collection_point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.collection_point.city}, {data.collection_point.uf}
          </Text>
          <Text style={styles.addressContent}>
            Rua {data.collection_point.street}, nº {data.collection_point.number}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 40,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingTop: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default CollectionPoints;
