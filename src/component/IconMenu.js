import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const IconMenu = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ alignItems: "center", width: 80 }}>
                <Image style={style.img} source={props.icon}></Image>
                <Text style={{ textAlign: 'center' }}>{props.title}</Text>
            </View>
        </TouchableOpacity>

    );
}

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
    img: {
        height: 55,
        width: 55
    }
});
export default IconMenu;