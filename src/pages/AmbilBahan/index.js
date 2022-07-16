import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton,List,Checkbox, Divider, IconButton, Badge, Snackbar, Modal, Provider, Portal, ActivityIndicator, Title } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_LIST_TABUNG,SET_AMBIL_BAHAN,SET_AMBIL_BAHAN_RESET } from '../../store';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const AmbilBahan = ({navigation}) => {

    const { tabung,ambilbahan } = useSelector(state => state);
    const dispatch = useDispatch();

    const [openMsg, setOpenMsg] = useState(false);
    const [visibleMdl, setvisibleMdl] = useState(true);
    
    const [LabSelected, SetLabSelected] = useState(null);
    const [namapasien, SetNamapasien] = useState('');
    const [ygMenyerahkan, SetygMenyerahkan] = useState('');
    const [listSelectedtabung, SETlistSelectedtabung] = useState([]);
    const [listDatatabung, SETlistdatatabung] = useState([]);
    const [nobahan, setNobahan] = useState(false);

    useEffect(()=>{
        dispatch(SET_AMBIL_BAHAN_RESET())
    },[])

    useEffect(()=>{
        if(tabung.list.length === 0){
            getTabung()
        }
        
    },[])

    useEffect(()=>{
        SETlistSelectedtabung([])
        SETlistdatatabung([])
    },[nobahan])

    useEffect(()=>{
        if(ambilbahan.message != null || ambilbahan.error != null){
            setOpenMsg(true)
        }
    },[ambilbahan])

    const onCheckTabung = (key) => {
        if(!nobahan){
            var temp = listSelectedtabung;
            var datakegselected = listDatatabung;
            if (temp.includes(key.id)) {
                SETlistSelectedtabung(temp.filter(item => item !== key.id))
                SETlistdatatabung(datakegselected.filter(item => item.id !== key.id))
            } else {
                SETlistSelectedtabung(old => [...old, key.id])
                SETlistdatatabung(old => [...old, {
                    id:key.id,
                    jumlah:1
                }])
            }
        }
    }

    function getTabung() {
        dispatch(SET_LIST_TABUNG())
    }

    const selectLab = (params=null)=>{
        SetLabSelected(params)
    }

    function findArray(operator,id,k) {

        let items = [...listDatatabung];
        var objIndex = items.findIndex((obj => obj.id == id));
        if(operator === '+'){
            items[objIndex].jumlah = items[objIndex].jumlah + 1
        }else{
            if(items[objIndex].jumlah > 1){
                items[objIndex].jumlah = items[objIndex].jumlah - 1
            }
        }

        SETlistdatatabung(items)
    }

    function kirim() {
        dispatch(SET_AMBIL_BAHAN({
            labid:LabSelected.id,
            nama_pasien:namapasien,
            yg_menyerahkan:ygMenyerahkan,
            tabung:listDatatabung
        }))
    }

    return (
        <View style={styles.main}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={tabung.loading}
                        onRefresh={()=> dispatch(SET_LIST_TABUNG())}
                    />
                }>
                
                <View style={styles.container}>
                    
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            label="Pilih Lab"
                            mode='outlined'
                            right={<TextInput.Icon name="arrow-right" onPress={()=>navigation.navigate('ListLab',{onSelectLab:selectLab})}/>}
                            value={LabSelected === null?'':LabSelected?.name}
                            // onFocus={()=>navigation.navigate('ListLab',{selectLab:selectLab})}
                            editable={false}
                            // onChange={()=>console.log('aaa')}
                        />
                        <TextInput
                            label="Nama Pasien" 
                            mode='outlined' style={styles.input}
                            value={namapasien}
                            onChangeText={(val) => SetNamapasien(val)}
                            outlineColor='#ced4da'
                            activeOutlineColor='#ced4da'
                            theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                        />
                        
                        <View style={{marginTop:10}}>
                            {/* <Headline>Tabung</Headline> */}
                            {/* <Text>{JSON.stringify(LabSelected)}</Text> */}
                            {/* <Subheading>Pilih Tabung & Jumlah</Subheading>
                            <Divider style={{marginTop:10}} /> */}

                            <Divider style={{height:1}}/>
                            <Title style={{padding:10,backgroundColor:'#ddd'}}>Pilih Tabung & Jumlah</Title>
                            <Divider style={{height:1,marginTop:1}}/>
                        </View>
                        {
                            tabung.loading?
                            Array.from(Array(3)).map((k,v)=>{
                                return(
                                    <View key={v} style={{marginVertical:25}}>
                                        <SkeletonPlaceholder>
                                            <View style={{ flexDirection: "row", justifyContent:'space-between'}}>
                                                <View style={{ marginLeft: 20 }}>
                                                    <View style={{ width: 140, height: 20, borderRadius: 4 }} />
                                                    <View
                                                        style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                                    />
                                                </View>
                                                <View style={{ width: 20, height: 20, borderRadius: 50 }} />
                                            </View>
                                        </SkeletonPlaceholder>
                                    </View>
                                )
                            })
                            :
                            <View style={{marginBottom:30}}>
                            
                            {
                                tabung.list.map((item,k)=>{
                                    return(
                                        <View key={item.id} style={styles.listbox}>
                                            <List.Item
                                                title={item.nama}
                                                titleStyle={{fontSize:18}}
                                                description={()=>
                                                    // <ListTabung tabungitem={item} key={item.id}/>
                                                    <View style={{flexDirection:'row',alignItems: 'flex-start',marginTop:15}}>
                                                        <View style={{backgroundColor:'#ddd'}}>
                                                            <IconButton
                                                                disabled={listSelectedtabung.includes(item.id) ? false:true}
                                                                icon="minus"
                                                                size={10}
                                                                onPress={() => findArray('-',item.id,k)}
                                                            />
                                                        </View>
                                                        <View style={{backgroundColor:'red',marginHorizontal:5}}>
                                                            {/* <Text style={{fontSize:16}}>{
                                                                listDatatabung.find(o => o.id === item.id)?.jumlah
                                                            }</Text> */}
                                                            <Badge size={25}>
                                                                {
                                                                    listDatatabung.find(o => o.id === item.id) != undefined?listDatatabung.find(o => o.id === item.id)?.jumlah:0
                                                                }
                                                            </Badge>
                                                        </View>
                                                        <View style={{backgroundColor:'#ddd'}}>
                                                            <IconButton
                                                                disabled={listSelectedtabung.includes(item.id) ? false:true}
                                                                icon="plus"
                                                                size={10}
                                                                onPress={() => findArray('+',item.id,k)}
                                                            />
                                                        </View>
                                                    </View>
                                                }
                                                right={() => <View style={{justifyContent:'center'}}><Checkbox.Item disabled={nobahan} status={listSelectedtabung.includes(item.id) ? 'checked' : 'unchecked'} color='#e62e2d' onPress={()=>onCheckTabung(item)}/></View>}
                                            />
                                        </View>
                                    )
                                })
                            }

                            <View style={styles.listbox}>
                                <List.Item
                                    title='Tidak ada Bahan'
                                    // titleStyle={{fontSize:18}}
                                    right={() => <View style={{justifyContent:'center'}}><Checkbox.Item status={nobahan ? 'checked' : 'unchecked'} color='#e62e2d' onPress={()=> setNobahan(!nobahan)}/></View>}
                                />
                            </View>

                            <TextInput
                                label="Yang Menyerahkan" 
                                mode='outlined' style={styles.input}
                                value={ygMenyerahkan}
                                onChangeText={(val) => SetygMenyerahkan(val)}
                                outlineColor='#ced4da'
                                activeOutlineColor='#ced4da'
                                theme={{ colors: { primary: '#475569',underlineColor:'transparent',}}}
                            />
                        </View>
                        }
                    </View>
                    
                </View>
                
            </ScrollView>
            <View style={styles.btncheckout}>
                <Button
                    disabled={(listDatatabung.length > 0 || nobahan === true) && LabSelected != null && namapasien !='' && ygMenyerahkan !='' || ambilbahan.loading? false:true}
                    style={styles.btnSubmit} 
                    mode="contained" 
                    onPress={kirim}>
                    {
                        ambilbahan.loading?'Sedang Mengirim':'Kirim'
                    }
                </Button>
            </View>
            <Provider>
                <Portal>
                    <Modal visible={ambilbahan.loading} dismissable={false} contentContainerStyle={{backgroundColor: '#fff', padding: 20,marginHorizontal:'10%'}}>
                        <ActivityIndicator animating={true} size='large' color='#e62e2d'/>
                        <Text style={{textAlign:'center',marginTop:10}}>Mohon tunggu...</Text>
                    </Modal>
                </Portal>
            </Provider>
            
            <View>
                <Snackbar
                    style={ambilbahan.error != null? {backgroundColor:'red'}:{backgroundColor:'#0c5460'}}
                    visible={openMsg}
                    onDismiss={()=>setOpenMsg(false)}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            dispatch(SET_AMBIL_BAHAN_RESET())
                            ambilbahan.error != null?null:navigation.navigate('Home')
                        },
                    }}>
                    {
                        ambilbahan.error != null? ambilbahan.error:'Ambil bahan berhasil dikirim'
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
    tabung:state.tabung,
    ambilbahan:state.ambilbahan
})
export default connect(mapStateToProps, {SET_LIST_TABUNG,SET_AMBIL_BAHAN })(AmbilBahan);
