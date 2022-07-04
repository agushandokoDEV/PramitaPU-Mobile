import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Dimensions, Text } from 'react-native';
import { connect, useSelector } from 'react-redux';
//import { connect, useSelector } from 'react-redux';
import splashscreen_img from '../../assets/pramita-banner.png';

const Starter = ({ navigation }) => {
    const { auth } = useSelector(state => state);

    useEffect(() => {
        if (auth.isLogin) {
            navigation.replace('Home')
        } else {
            navigation.replace('Login')
        }
        //let isMounted = true;
        // setTimeout(() => {
        //     navigation.replace('Login')
        // }, 3000);
        // if (counter == 3) {
        //     console.log('go')
        //     navigation.replace('Login')
        // }

        // return () => {
        //     isMounted = false;
        // }
    }, []);

    return (
        <View style={styles.wrap}>
            <View style={styles.container}>
                <Image source={splashscreen_img} resizeMode='contain' style={{ width: '100%' }} />
                <ActivityIndicator size="large" color="#e62e2d" />
                <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: '600' }}>Loading...</Text>
                {/* <ImageBackground source={splashscreen_img}
                style={styles.imgBG}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </ImageBackground> */}
            </View>
        </View>
    );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
    imgBG: {
        height: height,
        width: width
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 170
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Starter);