import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import FormInput from '../../component/FormInput';
import { Button } from 'react-native-paper';
import logo_banner from '../../assets/pramita-banner-logo.png'
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_LOGIN } from '../../store';

const Login = ({ navigation }) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log('auth ',auth)

    const [islogin, SetIslogin] = useState(false)
    const [akun, Setakun] = useState({
        username:'',
        password:''
    })


    useEffect(()=>{
        if(auth.isLogin){
            navigation.replace('Home')
        }
    },[auth])

    const _onLogin = () => {

        // console.log(akun)
        // SetIslogin(true)
        dispatch(
            SET_AUTH_LOGIN(akun)
        );
        // setTimeout(() => {
        //     navigation.navigate('Home')
        // }, 3000);
    }
    return (
        <View style={styles.main}>
            <ScrollView>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={logo_banner} style={styles.logo} resizeMode='contain' />
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} enabled>
                        <View style={styles.container}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 14 }}>Silahkan login menggunkan ID dan password anda</Text>
                            </View>
                            <FormInput
                                //label="Password :"
                                useLeftIcon={true}
                                leftIcon="person-outline"
                                //error={errors.email && touched.email}
                                icoColor="#495057"
                                placeholder="ID"
                                //onBlur={handleBlur('email')}
                                onChangeText={(val) => Setakun({username:val,password:akun.password})}
                                value={akun.username}
                                //errMsg={errors.email}
                            />
                            <FormInput
                                //label="Password :"
                                useLeftIcon={true}
                                leftIcon="lock"
                                //error={errors.email && touched.email}
                                icoColor="#495057"
                                placeholder="Password"
                                //onBlur={handleBlur('email')}
                                onChangeText={(val) => Setakun({password:val,username:akun.username})}
                                value={akun.password}
                                secureTextEntry={true}
                            //errMsg={errors.email}
                            />

                            <View style={{ marginVertical: 10 }}>
                                <TouchableOpacity>
                                    <Text style={{ textAlign: 'right' }}>Lupa Password ?</Text>
                                </TouchableOpacity>
                            </View>
                            <Button loading={auth.loading} icon='login' style={styles.btnSubmit} mode="contained" onPress={() => _onLogin()}>
                                {auth.loading?'Loading':'MASUK'}
                            </Button>
                        </View>
                        <Text>{JSON.stringify(auth)}</Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: height,
        backgroundColor: '#fff'
    },
    logo: {
        width: width,
        height: height / 4,
        marginBottom: 10,
    },
    headerbg: {
        height: 200,
        width: width,
        marginTop: '25%'
    },
    bg: {
        flex: 1,
        width: width
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    btnSubmit: {
        backgroundColor: '#e62e2d',
        height: 45,
        //marginTop: 10,
        alignContent: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { SET_AUTH_LOGIN })(Login);