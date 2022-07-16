import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, KeyboardAvoidingView, RefreshControl} from 'react-native';
import { Button, TextInput, Snackbar, Modal, Provider, Portal, ActivityIndicator, List, Checkbox, Divider, Title, HelperText } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SET_ADD_PENGANTARAN_DR,SET_ADD_PENGANTARAN_DR_RESET,SET_LIST_JENIS_URAIAN_PEKERJAAN } from '../../store';

const PengandataranDokter = ({ navigation }) => {

    const { pengantarandokter,jenisuraianpekerjaan } = useSelector(state => state);
    const dispatch = useDispatch();

    const [openMsg, setOpenMsg] = useState(false);
    const [jeniskeg, SetKeg] = useState('');
    const [tujuan, SetTujuan] = useState('');
    const [status, SetStatus] = useState('');
    const [listSelecteduraian, SETlistSelecteduraian] = useState([]);
    const [listDatauraian, SETlistdatauraian] = useState([]);
    const [DokterSelected, SetDokterSelected] = useState(null);

    useEffect(()=>{
        dispatch(SET_ADD_PENGANTARAN_DR_RESET())
    },[])

    useEffect(()=>{
        if(jenisuraianpekerjaan.list.length === 0){
            getUraian()
        }
        
    },[])

    useEffect(()=>{
        if(pengantarandokter.message != null || pengantarandokter.error != null){
            setOpenMsg(true)
        }
    },[pengantarandokter])

    const onCheckUraian = (key) => {
        var temp = listSelecteduraian;
        var datakegselected = listDatauraian;
        if (temp.includes(key.id)) {
            SETlistSelecteduraian(temp.filter(item => item !== key.id))
            SETlistdatauraian(datakegselected.filter(item => item.id !== key.id))
        } else {
            SETlistSelecteduraian(old => [...old, key.id])
            SETlistdatauraian(old => [...old, key.id])
        }
    }

    function getUraian() {
        dispatch(SET_LIST_JENIS_URAIAN_PEKERJAAN())
    }

    function selectDokter(params) {
        SetDokterSelected(params)
    }

    function kirim() {
        // console.log(listDatauraian)
        dispatch(SET_ADD_PENGANTARAN_DR({
            jenis_keg:listDatauraian,
            tujuan:DokterSelected.id,
            ket:status
        }))
    }

    return(
        <View style={styles.main}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={jenisuraianpekerjaan.loading}
                        onRefresh={()=> dispatch(SET_LIST_JENIS_URAIAN_PEKERJAAN())}
                    />
                }>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} enabled>
                        <View>
                            <Divider style={{height:1}}/>
                            <Title style={{padding:10,backgroundColor:'#ddd'}}>Uraian Pekerjaan</Title>
                            <Divider style={{height:1,marginTop:1}}/>
                            {
                                jenisuraianpekerjaan.loading?
                                    <View style={{paddingVertical:10}}>
                                        <ActivityIndicator animating={true} size='small' color='#e62e2d'/>
                                        <Text style={{textAlign:'center',marginTop:10}}>Memuat tabung...</Text>
                                    </View>
                                :
                                <View>
                                    {
                                        !jenisuraianpekerjaan.loading && jenisuraianpekerjaan.list.length > 0?
                                        jenisuraianpekerjaan.list.map((item,k)=>{
                                            return(
                                                <View key={item.id} style={styles.listbox}>
                                                    <List.Item
                                                        title={item.name}
                                                        // titleStyle={{fontSize:18}}
                                                        right={() => <View style={{justifyContent:'center'}}><Checkbox.Item status={listSelecteduraian.includes(item.id) ? 'checked' : 'unchecked'} color='#e62e2d' onPress={()=>onCheckUraian(item)}/></View>}
                                                    />
                                                </View>
                                            )
                                        })
                                        :
                                        <View>
                                            {
                                                jenisuraianpekerjaan.error != null?
                                                <HelperText style={{textAlign:'center'}} type="error" visible={jenisuraianpekerjaan.error != null?true:false}>
                                                    {jenisuraianpekerjaan.error}
                                                </HelperText>
                                                :
                                                <Text style={{textAlign:'center',marginTop:10}}>Data tidak tersedia</Text>
                                            }
                                        </View>
                                    }
                                </View>
                            }

                            <Divider style={{height:1}}/>
                            <Title style={{padding:10,backgroundColor:'#ddd'}}>Tujuan & Status</Title>
                            <Divider style={{height:1,marginTop:1,marginBottom:10}}/>
                            {/* <TextInput
                                label="Tujuan" 
                                mode='outlined' style={{marginBottom: 10}}
                                value={tujuan}
                                onChangeText={(val) => SetTujuan(val)}
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                            /> */}
                            <TextInput
                                style={{marginBottom: 10}}
                                label="Pilih Tujuan"
                                mode='outlined'
                                right={<TextInput.Icon name="arrow-right" onPress={()=>navigation.navigate('ListDokter',{onSelectDokter:selectDokter})}/>}
                                value={DokterSelected === null?'':DokterSelected?.nama}
                                editable={false}
                            />
                            <TextInput
                                label="Job Status / Penerima" 
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
                    disabled={listDatauraian.length > 0 && DokterSelected !='' && status !='' || pengantarandokter.loading? false:true}
                    style={styles.btnSubmit} 
                    mode="contained" 
                    onPress={kirim}>
                    {
                        pengantarandokter.loading?'Sedang Mengirim':'Kirim'
                    }
                </Button>
            </View>
            <Provider>
                <Portal>
                    <Modal visible={pengantarandokter.loading} dismissable={false} contentContainerStyle={{backgroundColor: '#fff', padding: 20,marginHorizontal:'10%'}}>
                        <ActivityIndicator animating={true} size='large' color='#e62e2d'/>
                        <Text style={{textAlign:'center',marginTop:10}}>Mohon tunggu...</Text>
                    </Modal>
                </Portal>
            </Provider>
            <View>
                <Snackbar
                    style={pengantarandokter.error != null? {backgroundColor:'red'}:{backgroundColor:'#0c5460'}}
                    visible={openMsg}
                    onDismiss={()=>setOpenMsg(false)}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            dispatch(SET_ADD_PENGANTARAN_DR_RESET())
                            pengantarandokter.error != null?null:navigation.navigate('Home')
                        },
                    }}>
                    {
                        pengantarandokter.error != null? pengantarandokter.error:'Data berhasil ditambahkan'
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
    },
    listbox: {
        // backgroundColor: '#fff',
        // borderWidth: 0.1,
        marginBottom: 15,
        // elevation: 1,
        // borderRadius: 3,
        borderBottomWidth:0.5
    },
})

const mapStateToProps = (state) => ({
    pengantarandokter:state.pengantarandokter,
    jenisuraianpekerjaan:state.jenisuraianpekerjaan
})
export default connect(mapStateToProps, { SET_ADD_PENGANTARAN_DR,SET_ADD_PENGANTARAN_DR_RESET,SET_LIST_JENIS_URAIAN_PEKERJAAN })(PengandataranDokter);