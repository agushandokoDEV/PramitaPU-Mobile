import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput } from 'react-native-paper';

const Formulir = () => {
    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Headline>Headline</Headline>
                        <Subheading>Paragraph</Subheading>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" mode='flat' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <Button style={styles.btnSubmit} mode="contained" onPress={() => console.log()}>
                            Simpan
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {

        paddingTop: 10,
        paddingHorizontal: 10
    },
    input: {
        marginBottom: 10,
        // backgroundColor: '#fff'
    },
    btnSubmit: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e62e2d'
    }
})
export default Formulir;
