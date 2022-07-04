import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity,LogBox, RefreshControl } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton,List,Checkbox, Divider, IconButton } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_RIWAYAT_KEGIATAN,RESET_DETAIL_KEGIATAN } from '../../../store';
import moment from 'moment/min/moment-with-locales'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const RiwayatTab = ({route,navigation}) => {

    const { kegiatan} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(kegiatan.riwayat.list.length === 0){
            getKegiatan()
        }
    },[])

    function getKegiatan() {
        dispatch(SET_RIWAYAT_KEGIATAN())
    }

    function getDetail(payload) {
        dispatch(RESET_DETAIL_KEGIATAN())
        navigation.navigate('DetailKegiatan',{kegiatan:payload})
    }

    const ListKegiatan=(item)=>{
        if(item.jenis === 'ambil_bahan'){
            return(
                <TouchableOpacity onPress={()=>getDetail(item)} key={item.id}>
                    <List.Item
                        title={item?.lab.nama}
                        description={()=>
                            <View style={{marginTop:5}}>
                                <Text style={{backgroundColor:'#f87171',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Ambil Bahan</Text>
                                <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(item.created_at).locale('id').format('LLLL')}</Text>
                            </View>
                        }
                        right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                    />
                    <Divider style={{height:0.5}}/>
                </TouchableOpacity>
            )
        }else if(item.jenis === 'antar_bahan'){
            return(
                <TouchableOpacity onPress={()=>getDetail(item)} key={item.id}>
                    <List.Item
                        title={item?.lab.nama}
                        description={()=>
                            <View style={{marginTop:5}}>
                                <Text style={{backgroundColor:'#004085',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Antar Bahan</Text>
                                <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(item.created_at).locale('id').format('LLLL')}</Text>
                            </View>
                        }
                        // right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                    />
                    <Divider style={{height:0.5}}/>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.main}>
            
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={kegiatan.riwayat.loading}
                    onRefresh={getKegiatan}
                />
            }>
                {/* <Text>{JSON.stringify(kegiatan,0,2)}</Text> */}
                <View style={styles.container}>
                {
                    kegiatan.riwayat.list.map((item)=>{
                        return(
                            ListKegiatan(item)
                        )
                    })
                }
                </View>
            </ScrollView>
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
        paddingHorizontal: 10
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
    kegiatan:state.kegiatan
})
export default connect(mapStateToProps, { SET_RIWAYAT_KEGIATAN,RESET_DETAIL_KEGIATAN })(RiwayatTab);
