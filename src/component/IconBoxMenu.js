import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const IconBoxMenu = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={style.box}>
                <View style={{ alignItems: "center", width: 80 }}>
                    <Image style={style.img} source={props.icon}></Image>
                    <Text style={{ textAlign: 'center' }}>{props.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 5,
        elevation: 1,
        borderRadius: 5
    },
    img: {
        height: 55,
        width: 55
    }
});
export default IconBoxMenu;