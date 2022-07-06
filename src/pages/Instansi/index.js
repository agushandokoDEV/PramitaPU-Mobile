import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Button, TextInput, Snackbar, Modal, Provider, Portal, ActivityIndicator } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SET_ADD_INSTANSI,SET_ADD_INSTANSI_RESET } from '../../store';

const Instansi = ({ navigation }) => {

    const { instansi} = useSelector(state => state);
    const dispatch = useDispatch();

    const [openMsg, setOpenMsg] = useState(false);
    const [jeniskeg, SetKeg] = useState('');
    const [tujuan, SetTujuan] = useState('');
    const [status, SetStatus] = useState('');

    useEffect(()=>{
        dispatch(SET_ADD_INSTANSI_RESET())
    },[])

    useEffect(()=>{
        if(instansi.message != null || instansi.error != null){
            setOpenMsg(true)
        }
    },[instansi])

    function kirim() {
        dispatch(SET_ADD_INSTANSI({
            jenis_keg:jeniskeg,
            tujuan:tujuan,
            ket:status
        }))
    }

    return(
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} enabled>
                        <View>
                            <TextInput
                                label="Kegiatan" 
                                mode='outlined' style={{marginBottom: 10}}
                                value={jeniskeg}
                                onChangeText={(val) => SetKeg(val)}
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                            />
                            <TextInput
                                label="Tujuan" 
                                mode='outlined' style={{marginBottom: 10}}
                                value={tujuan}
                                onChangeText={(val) => SetTujuan(val)}
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                            />
                            <TextInput
                                label="Job Status" 
                                mode='outlined' style={{marginBottom: 10}}
                                value={status}
                                onChangeText={(val) => SetStatus(val)}
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
            <View style={styles.btncheckout}>
                <Button
                    disabled={jeniskeg != '' && tujuan !='' && status !='' || instansi.loading? false:true}
                    style={styles.btnSubmit} 
                    mode="contained" 
                    onPress={kirim}>
                    {
                        instansi.loading?'Sedang Mengirim':'Kirim'
                    }
                </Button>
            </View>
            <Provider>
                <Portal>
                    <Modal visible={instansi.loading} dismissable={false} contentContainerStyle={{backgroundColor: '#fff', padding: 20,marginHorizontal:'10%'}}>
                        <ActivityIndicator animating={true} size='large' color='#e62e2d'/>
                        <Text style={{textAlign:'center',marginTop:10}}>Mohon tunggu...</Text>
                    </Modal>
                </Portal>
            </Provider>
            <View>
                <Snackbar
                    style={instansi.error != null? {backgroundColor:'red'}:{backgroundColor:'#0c5460'}}
                    visible={openMsg}
                    onDismiss={()=>setOpenMsg(false)}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            dispatch(SET_ADD_INSTANSI_RESET())
                            instansi.error != null?null:navigation.navigate('Home')
                        },
                    }}>
                    {
                        instansi.error != null? instansi.error:'Data berhasil ditambahkan'
                    }
                </Snackbar>
            </View>
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
        paddingHorizontal: 10,
        marginBottom:'30%'
    },
    btnSubmit: {
        marginTop:10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e62e2d',
        borderRadius:0
    },
    btncheckout: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
})

const mapStateToProps = (state) => ({
    instansi:state.instansi
})
export default connect(mapStateToProps, { SET_ADD_INSTANSI,SET_ADD_INSTANSI_RESET })(Instansi);