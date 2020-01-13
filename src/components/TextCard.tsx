import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

interface Props {
    language: { [key: string]: string };
    text: string;
}

const styles = StyleSheet.create({
    content: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    root: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 150,
        marginBottom: 10,
        overflow: "scroll",
        width: '90%'
    }
});

export default function TextCard({ language, text }: Props): React.ReactElement {
    return (
        <Card title={language.name} containerStyle={styles.root}>
            <Text style={styles.content} numberOfLines={3}>
                {text}
            </Text>
        </Card>
    );
}
