import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    inputContainer: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
    },    

    inputAndroid: {
        borderWidth: 0.5,
        borderColor: '#34CB79',
        borderRadius: 10,
        color: 'black',
        paddingVertical: 2,
        paddingHorizontal: 24,
        paddingRight: 30, // to ensure the text is never behind the icon
        fontSize: 16,
        height: 60
    },

    inputIOS: {
        borderWidth: 1,
        borderColor: '#34CB79',
        borderRadius: 4,
        color: 'black',
        paddingVertical: 12,
        paddingHorizontal: 24,
        paddingRight: 30, // to ensure the text is never behind the icon
        fontSize: 16,
        height: 60
      },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});