import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-material-ui';

import backgrounds from '../constants/images';

interface Props {
    navigation: any;
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: 20,
        width: '50%'
    },
    // eslint-disable-next-line react-native/no-color-literals
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    // eslint-disable-next-line react-native/no-color-literals
    description: {
        color: 'gray',
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    img: {
        height: 300,
        width: 300,
    },
    main: {
        width: '80%',
    },
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
});

function Home({ navigation }: Props): React.ReactElement {
    return (
        <View style={styles.root}>
            <View>
                <Image source={backgrounds.welcome} resizeMode='center' style={styles.img} />
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>
                    Language Barrier - No More a Barrier Now
                </Text>
                <Text style={styles.description}>
                    There is a limit to the number of languages that an individual can learn on his own, 
                    so the need for high quality translation services becomes more pronounced in such circumstances.
                </Text>
                <Button 
                    primary
                    uppercase
                    style={ { container: styles.button, text: styles.buttonText } }
                    text='Get Started' 
                    onPress={(): void => {navigation.navigate('Translator');}} 
                />
            </View>
        </View>
    );
}

Home.navigationOptions = (): void => {{
    'Home';
}};

export default Home;