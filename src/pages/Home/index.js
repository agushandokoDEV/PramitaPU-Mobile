import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import IconBoxMenu from '../../component/IconBoxMenu';
import header_img from '../../assets/pramita-banner-logo.png';
import icon_article from '../../assets/icons/icon_article.png';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_LOGOUT } from '../../store';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!auth.isLogin){
            navigation.replace('Starter')
        }
    },[auth])

    function logout() {
        dispatch(SET_AUTH_LOGOUT())
    }

    return (
        <View style={styles.main}>
            <View style={styles.divImgHeader}>
                <Image source={header_img} style={styles.imgHeader} resizeMode='stretch' />
            </View>
            <View style={styles.container}>
                <View style={styles.blokMenu}>
                    <IconBoxMenu icon={icon_article} title='Ambil Bahan' onPress={() => navigation.navigate('AmbilBahan')} />
                    <IconBoxMenu icon={icon_article} title='Antar Bahan' onPress={() => navigation.navigate('Formulir')} />
                    <IconBoxMenu icon={icon_article} title='Instansi' onPress={() => navigation.navigate('Formulir')} />
                </View>
                {/* <View style={styles.blokMenu}>
                    <IconBoxMenu icon={icon_article} title='Formulir' onPress={() => navigation.navigate('Formulir')} />
                    <IconBoxMenu icon={icon_article} title='Formulir' onPress={() => navigation.navigate('Formulir')} />
                    <IconBoxMenu icon={icon_article} title='Excel' onPress={() => navigation.navigate('SampleExcel')} />
                </View> */}
            </View>
            <Button style={styles.btnSubmit} mode="contained" onPress={() => logout()}>
                Logout
            </Button>
        </View>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    divImgHeader: {
        elevation: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    imgHeader: {
        width: width,
        height: height / 4
    },
    container: {
        //backgroundColor: '#fff',
        marginVertical: 10
    },
    blokMenu: {
        //backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginHorizontal: 5,
        borderRadius: 5
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { SET_AUTH_LOGOUT })(Home);