import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Image, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import FormInput from '../../component/FormInput';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import logo_banner from '../../assets/pramita-banner-logo.png'
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_LOGIN,SET_AUTH_RESET } from '../../store';
import splashscreen_img from '../../assets/pramita-banner.png';
import logo_img from '../../assets/1024.png';

const Login = ({ navigation }) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log('auth ',auth)

    const [showPwd, SetPhowPwd] = useState(true)
    const [openMsg, setOpenMsg] = useState(false);

    const [akun, Setakun] = useState({
        username:'',
        password:''
    })

    useEffect(()=>{
        if(auth.error != null){
            resetAuth()
        }
    },[])

    useEffect(()=>{
        if(auth.isLogin){
            navigation.replace('Home')
        }
        if(auth.error != null){
            setOpenMsg(true)
        }
    },[auth])

    const _onLogin = () => {
        dispatch(
            SET_AUTH_LOGIN(akun)
        );
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
                                onChangeText={(val) => Setakun({username:val,password:akun.password})}
                                selectionColor='#475569'
                                // underlineColor='red'
                                // activeUnderlineColor='#ced4da'
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                // dense={true}
                                error={false}
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                                left={<TextInput.Icon name="account" />}
                            />
                            <TextInput
                                label="Password"
                                placeholder='Password'
                                value={akun.password}
                                mode='outlined'
                                onChangeText={(val) => Setakun({password:val,username:akun.username})}
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
                                    <TextInput.Icon name={showPwd?"eye-off-outline":"eye-outline"} onPress={()=>SetPhowPwd(!showPwd)} />
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
                                    disabled={auth.loading || akun.username ==='' || akun.password ===''?true:false} 
                                    icon='login' 
                                    style={styles.btnSubmit} 
                                    mode="contained" 
                                    onPress={() => _onLogin()}>
                                    {auth.loading?'Loading':'MASUK'}
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
                    onPress: () => {
                        resetAuth()
                    },
                }}>
                {
                    auth.error
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
        backgroundColor: '#e62e2d',
        height: 50,
        //marginTop: 10,
        alignContent: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { SET_AUTH_LOGIN })(Login);