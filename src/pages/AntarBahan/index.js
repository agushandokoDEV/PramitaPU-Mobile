import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, TextInput, Snackbar, Modal, Provider, Portal, ActivityIndicator } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_ANTAR_BAHAN,SET_ANTAR_BAHAN_RESET } from '../../store';

const AntarBahan = ({navigation}) => {

    const { antarbahan} = useSelector(state => state);
    const dispatch = useDispatch();

    const [openMsg, setOpenMsg] = useState(false);
    const [penerima, SetPenerima] = useState('');
    const [LabSelected, SetLabSelected] = useState(null);

    useEffect(()=>{
        dispatch(SET_ANTAR_BAHAN_RESET())
    },[])

    useEffect(()=>{
        if(antarbahan.message != null || antarbahan.error != null){
            setOpenMsg(true)
        }
    },[antarbahan])

    const selectLab = (params=null)=>{
        SetLabSelected(params)
    }

    function kirim() {
        dispatch(SET_ANTAR_BAHAN({
            labid:LabSelected.id,
            penerima:penerima
        }))
    }

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            label="Pilih Lab"
                            mode='outlined'
                            right={<TextInput.Icon name="arrow-right" onPress={()=>navigation.navigate('ListLab',{onSelectLab:selectLab})}/>}
                            value={LabSelected === null?'':LabSelected?.name}
                            editable={false}
                        />
                        <TextInput
                            label="Penerima" 
                            mode='outlined' style={styles.input}
                            value={penerima}
                            onChangeText={(val) => SetPenerima(val)}
                            outlineColor='#ced4da'
                            activeOutlineColor='#ced4da'
                            theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.btncheckout}>
                <Button
                    disabled={LabSelected != null && penerima !='' || antarbahan.loading? false:true}
                    style={styles.btnSubmit} 
                    mode="contained" 
                    onPress={kirim}>
                    {
                        antarbahan.loading?'Sedang Mengirim':'Kirim'
                    }
                </Button>
            </View>
            <Provider>
                <Portal>
                    <Modal visible={antarbahan.loading} dismissable={false} contentContainerStyle={{backgroundColor: '#fff', padding: 20,marginHorizontal:'10%'}}>
                        <ActivityIndicator animating={true} size='large' color='#e62e2d'/>
                        <Text style={{textAlign:'center',marginTop:10}}>Mohon tunggu...</Text>
                    </Modal>
                </Portal>
            </Provider>
            
            <View>
                <Snackbar
                    style={antarbahan.error != null? {backgroundColor:'red'}:{backgroundColor:'#0c5460'}}
                    visible={openMsg}
                    onDismiss={()=>setOpenMsg(false)}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            dispatch(SET_ANTAR_BAHAN_RESET())
                            antarbahan.error != null?null:navigation.navigate('Home')
                        },
                    }}>
                    {
                        antarbahan.error != null? antarbahan.error:'Antar bahan berhasil dikirim'
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
    input: {
        marginBottom: 10,
        // backgroundColor: '#fff'
    },
    btnSubmit: {
        marginTop:10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e62e2d',
        borderRadius:0
    },
    listbox: {
        // backgroundColor: '#fff',
        // borderWidth: 0.1,
        marginBottom: 15,
        // elevation: 1,
        // borderRadius: 3,
        borderBottomWidth:0.5
    },
    btncheckout: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        // backgroundColor: 'blue',
        // borderTopWidth: 0.5,
        // borderTopColor: '#e62e2d'
    }
})


const mapStateToProps = (state) => ({
    antarbahan:state.antarbahan
})
export default connect(mapStateToProps, { SET_ANTAR_BAHAN,SET_ANTAR_BAHAN_RESET })(AntarBahan);
