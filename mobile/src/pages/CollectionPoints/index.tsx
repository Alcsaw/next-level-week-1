import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';

import styles from './styles';

interface Item {
    id: number;
    title: string;
    image_url: string;
};

interface CollectionPoint {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
};

interface RouteParams {
    uf: string;
    city: string;
};

const CollectionPoints = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as RouteParams;

    const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    
    // Load position
    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ooops!',
                    'Precisamos de sua permissão para obter a sua localização e,'
                    +'asism, mostrar os pontos de coleta próximos de você.');

                    return;
            }

            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            });

            const { latitude, longitude } = location.coords;

            setInitialPosition([
                latitude,
                longitude,
            ]);
        };
        loadPosition();
    }, []);
    
    // load items
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    // load collection points
    useEffect(() => {
        api.get('collection_points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        }).then(response => {
            setCollectionPoints(response.data);
        })
    }, [selectedItems]);

    function handleNavigateBack() {
        navigation.goBack();
    };

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', { collection_point_id: id});
    };

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#34cb79' />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    { initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            loadingEnabled={initialPosition[0] === 0}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {collectionPoints.map(point => (
                                <Marker
                                    key={String(point.id)}
                                    style={styles.mapMarker}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}
                                    onPress={() => handleNavigateToDetail(point.id)}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image
                                            style={styles.mapMarkerImage}
                                            source={{ uri: point.image_url }}
                                        />
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )
                    /*the && operator works almost like a ternary if.
                    The content is only shown when the condition is met.*/}
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map(item => (
                        <TouchableOpacity
                            style={[
                                styles.item,
                                selectedItems.includes(item.id) ?
                                    styles.selectedItem : {}
                            ]}
                            onPress={() => handleSelectItem(item.id)}
                            key={String(item.id)}
                            activeOpacity={0.6}
                        >
                            <SvgUri width={42} height={42} uri={item.image_url} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

export default CollectionPoints;
