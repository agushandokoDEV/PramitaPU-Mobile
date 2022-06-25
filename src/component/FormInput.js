import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FormInput = (props) => {
    return (
        <View style={styles.container}>
            {
                props.label ?
                    <Text style={{ marginVertical: 10, color: '#495057' }}>{props.label}</Text>
                    :
                    <View></View>
            }

            <View style={[styles.rows, props.error ? styles.boxError : styles.boxDefault]}>
                {
                    props.useLeftIcon ? <View style={styles.boxIco}>
                        {/* <Icon name={props.leftIcon} size={25} color={props.icoColor} /> */}
                        {
                            props.onPressIcon ?
                                <TouchableOpacity onPress={props.onPressIcon}>
                                    <MaterialIcons name={props.leftIcon} size={25} />
                                </TouchableOpacity>
                                :
                                <MaterialIcons name={props.leftIcon} size={25} color='#fff' />
                        }


                    </View>
                        :
                        <View></View>
                }

                <TextInput
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    onBlur={props.onBlur}
                    value={props.value}
                    placeholder={props.placeholder}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="gray"
                    secureTextEntry={props.secureTextEntry}
                    editable={props.editable}
                    pointerEvents={props.pointerEvents}
                    onKeyPress={props.onKeyPress}
                    onFocus={props.onFocus}
                />
            </View>
            {
                props.error ?
                    <Text style={{ color: 'red', fontStyle: 'italic' }}>{props.errMsg}</Text>
                    :
                    <View></View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'green',
        marginTop: 10,
        //marginHorizontal: 20,
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        height: 50
    },
    boxIco: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 48,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    },
    input: {
        flex: 1,
        color: '#495057',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    boxDefault: {
        borderColor: 'gray',
    },
    boxError: {
        borderColor: 'red',
    }
})
export default FormInput;
