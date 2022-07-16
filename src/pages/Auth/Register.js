import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import FormInput from '../../component/FormInput';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import logo_banner from '../../assets/pramita-banner-logo.png'
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_REGISTER,SET_AUTH_RESET } from '../../store';
import splashscreen_img from '../../assets/pramita-banner.png';
import logo_img from '../../assets/1024.png';

const Register = ({ navigation }) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log('auth ',auth)

    const [showPwd, SetShowPwd] = useState(true)
    const [showRePwd, SetShowRePwd] = useState(true)
    const [openMsg, setOpenMsg] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [akun, Setakun] = useState({
        username:'',
        namalengkap:'',
        password:'',
        repassword:'',
    });

    useEffect(()=>{
        if(auth.error != null){
            resetAuth()
        }
    },[])

    useEffect(()=>{
        console.log(auth)
        if(auth.isLogin){
            navigation.replace('Home')
        }
        if(auth.error != null){
            setOpenMsg(true)
        }
    },[auth])

    const _onRegister = () => {
        // console.log(akun)
        if(akun.password === akun.repassword){
            dispatch(
                SET_AUTH_REGISTER({
                    username:akun.username,
                    namalengkap:akun.namalengkap,
                    password:akun.password,
                })
            );
        }else{
            setErrMsg('Password tidak sama')
            setOpenMsg(true)
        }
        
    }

    function resetAuth() {
        dispatch(
            SET_AUTH_RESET()
        );
    }
    return (
        <View style={styles.main}>
            <Image source={splashscreen_img} resizeMode='contain' style={{ width: '100%',height:190}} />
            <ScrollView>
                
                <Image source={logo_img} resizeMode='cover' style={{ width: '100%',height:200}} />
                <View style={styles.container}>
                    {/* <Text>{JSON.stringify(auth,0,2)}</Text> */}
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} enabled>
                        <View style={styles.boxform}>
                            {/* <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 14 }}>Silahkan login menggunkan ID dan password anda</Text>
                            </View> */}

                            {/* <FormInput
                                //label="Password :"
                                useLeftIcon={true}
                                leftIcon="person-outline"
                                //error={errors.email && touched.email}
                                icoColor="#495057"
                                placeholder="Username"
                                //onBlur={handleBlur('email')}
                                onChangeText={(val) => Setakun({username:val,password:akun.password})}
                                value={akun.username}
                                //errMsg={errors.email}
                            /> */}

                            <TextInput
                                label="NIK"
                                placeholder='NIK'
                                value={akun.username}
                                mode='outlined'
                                onChangeText={(val) => Setakun({
                                    username:val,
                                    namalengkap:akun.namalengkap,
                                    password:akun.password,
                                    repassword:akun.repassword,
                                })}
                                selectionColor='#475569'
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                // dense={true}
                                error={false}
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                                left={<TextInput.Icon name="account-lock" />}
                            />

                            <TextInput
                                label="Nama Lengkap"
                                placeholder='Nama Lengkap'
                                value={akun.namalengkap}
                                mode='outlined'
                                onChangeText={(val) => Setakun({
                                    namalengkap:val,
                                    username:akun.username,
                                    password:akun.password,
                                    repassword:akun.repassword
                                })}
                                selectionColor='#475569'
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                // dense={true}
                                error={false}
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                                left={<TextInput.Icon name="account" />}
                                style={{marginTop:5}}
                            />
                            <TextInput
                                label="Password"
                                placeholder='Password'
                                value={akun.password}
                                mode='outlined'
                                onChangeText={(val) => Setakun({
                                    password:val,
                                    username:akun.username,
                                    namalengkap:akun.namalengkap,
                                    repassword:akun.repassword,
                                })}
                                selectionColor='#475569'
                                // underlineColor='red'
                                // activeUnderlineColor='#ced4da'
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                // dense={true}
                                error={false}
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                                secureTextEntry={showPwd}
                                left={<TextInput.Icon name="lock" />}
                                right={
                                    <TextInput.Icon name={showPwd?"eye-off-outline":"eye-outline"} onPress={()=>SetShowPwd(!showPwd)} />
                                }
                                style={{marginTop:5}}
                            />

                            <TextInput
                                label="Ulangi Password"
                                placeholder='Ulangi Password'
                                value={akun.repassword}
                                mode='outlined'
                                onChangeText={(val) => Setakun({
                                    repassword:val,
                                    password:akun.password,
                                    username:akun.username,
                                    namalengkap:akun.namalengkap,
                                })}
                                selectionColor='#475569'
                                // underlineColor='red'
                                // activeUnderlineColor='#ced4da'
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                // dense={true}
                                error={false}
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                                secureTextEntry={showRePwd}
                                left={<TextInput.Icon name="lock" />}
                                right={
                                    <TextInput.Icon name={showRePwd?"eye-off-outline":"eye-outline"} onPress={()=>SetShowRePwd(!showRePwd)} />
                                }
                                style={{marginTop:5}}
                            />
                            {/* <FormInput
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
                            /> */}
                            <View style={{ marginTop: 15,marginBottom:50 }}>
                                
                                <Button
                                    loading={auth.loading}
                                    disabled={
                                        auth.loading || 
                                        akun.username ==='' || 
                                        akun.namalengkap ==='' || 
                                        akun.password ===''  || 
                                        akun.repassword ==='' ?true:false} 
                                    icon='account-group' 
                                    style={styles.btnReg} 
                                    mode="contained" 
                                    onPress={_onRegister}>
                                    {auth.loading?'Loading':'DAFTAR AKUN'}
                                </Button>

                                <Button
                                    disabled={auth.loading} 
                                    icon='login' 
                                    style={styles.btnSubmit} 
                                    mode="text"
                                    color='grey'
                                    onPress={() => navigation.goBack()}>
                                    MASUK
                                </Button>
                            </View>
                            
                        </View>

                        {/* <Text>{JSON.stringify(auth,0,2)}</Text> */}
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
            <Snackbar
                style={{backgroundColor:'red'}}
                visible={openMsg}
                onDismiss={()=>setOpenMsg(false)}
                action={{
                    label: 'Ok',
                    // onPress: () => {
                    //     console.log('aaa')
                    // },
                }}>
                {
                    auth.error != null?auth.error:errMsg
                }
            </Snackbar>
            {/* <ImageBackground style={styles.bg} source={logo_img} resizeMode='contain'>
            </ImageBackground> */}
            
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
        // marginBottom: 10,
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
        // marginTop:'10%',
        marginHorizontal: 10,
        // marginVertical: 10
    },
    boxform:{
        // marginTop:'55%',
        // borderWidth:1,
        // paddingVertical:20,
        // paddingHorizontal:20
    },
    btnSubmit: {
        marginTop:10,
        // backgroundColor: '#e62e2d',
        height: 50,
        //marginTop: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    btnReg: {
        
        backgroundColor: '#e0a800',
        height: 50,
        //marginTop: 10,
        alignContent: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { SET_AUTH_REGISTER })(Register);