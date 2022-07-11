import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity,LogBox, RefreshControl } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton,List,Checkbox, Divider, IconButton, Title, Badge, ActivityIndicator, Card, Avatar } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_DETAIL_KEGIATAN } from '../../store';
import moment from 'moment/min/moment-with-locales'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const DetailKegiatan = ({route,navigation}) => {

    const { kegiatan} = useSelector(state => state);
    const dispatch = useDispatch();
    const {params}=route

    useEffect(()=>{
        getKegiatan()
        navigation.setOptions({ title: params.title })
    },[])

    function getKegiatan() {
        dispatch(SET_DETAIL_KEGIATAN(params.kegiatan.id))
    }

    const JenisKegiatan=()=>{
        switch (params.kegiatan.jenis) {
            case 'ambil_bahan':
                return(
                    <View>
                        <List.Item
                            title="NAMA LAB REKANAN :"
                            description={()=>
                                <Text style={{fontSize:16,color:'black'}}>{params.kegiatan.lab?.nama}</Text>
                            }
                            left={() => <List.Icon icon="hospital-building" />}
                        />
                        <Divider style={{height:1}}/>

                        <List.Item
                            title="NAMA PASIEN :"
                            description={()=>
                                <Text style={{fontSize:16,color:'black'}}>{params.kegiatan.ambilbahan?.nama_pasien}</Text>
                            }
                            left={() => <List.Icon icon="account-supervisor-circle" />}
                        />
                        <Divider style={{height:1}}/>
                            {/* <Title style={{padding:10,backgroundColor:'#ddd',fontSize:16}}>Tabung & Jumlah</Title>
                        <Divider style={{height:1,marginTop:1}}/> */}

                        <List.Item
                            title="JENIS TABUNG & JUMLAH :"
                            description={()=>
                                
                                <View>
                                    <View>
                                    {
                                        !kegiatan.detail.loading && kegiatan.detail.data?.listtabung != null?
                                            kegiatan.detail.data.listtabung.map((item,k)=>{
                                                return(
                                                    <View key={item.id} style={{marginBottom:0}}>
                                                        <List.Item
                                                            style={{padding:0}}
                                                            title={'- '+item.tabung?.nama}
                                                            right={() => <View style={{justifyContent:'center'}}><Badge size={25} style={{backgroundColor:'#e62e2d'}}>{item.jumlah}</Badge></View>}
                                                        />
                                                        {/* <Divider style={{height:0.5}}/> */}
                                                    </View>
                                                )
                                            })
                                        :
                                        <View style={{marginTop:20}}>
                                            <ActivityIndicator animating={true} color='#e62e2d'/>
                                            <Text style={{textAlign:'center',marginTop:10}}>Loading...</Text>
                                        </View>
                                    }
                                    </View>
                                    {
                                        !kegiatan.detail.loading && kegiatan.detail.data?.listtabung.length === 0?
                                        <Text style={{fontSize:16,color:'black'}}>Tidak ada bahan</Text>
                                        :null
                                    }
                                </View>
                            }
                            left={() => <List.Icon icon="playlist-edit" />}
                        />
                        <Divider style={{height:1}}/>
                        
                        <List.Item
                            title="YANG MENYERAHKAN :"
                            description={()=>
                                <View>
                                    <Text style={{fontSize:16,color:'black'}}>{params.kegiatan.ambilbahan?.yg_menyerahkan != null ? params.kegiatan.ambilbahan?.yg_menyerahkan:'-'}</Text>
                                    <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{params.kegiatan.created_at != null? moment(params.kegiatan.created_at).locale('id').format('LLLL'):''}</Text>
                                </View>
                            }
                            left={() => <List.Icon icon="account-arrow-right" />}
                        />
                        <Divider style={{height:0.5}}/>
                        
                        {/* <List.Item
                            title='Tanggal Pengiriman :'
                            description={()=>
                                <Subheading>{params.kegiatan.ambilbahan?.created_at != null? moment(params.kegiatan.ambilbahan?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/> */}
                        <List.Item
                            title="YANG MENERIMA :"
                            description={()=>
                                <View>
                                    <Text style={{fontSize:16,color:'black'}}>{kegiatan.detail.data?.kegiatan?.ambilbahan?.yg_menerima != null?kegiatan.detail.data?.kegiatan?.ambilbahan?.yg_menerima:'-'}</Text>
                                    {
                                        kegiatan.detail.data?.kegiatan?.ambilbahan?.approved_at != null?
                                        <Text style={{backgroundColor:'#004085',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(kegiatan.detail.data?.kegiatan?.ambilbahan?.approved_at).locale('id').format('LLLL')}</Text>
                                            :
                                            null
                                    }
                                    
                                </View>
                            }
                            left={() => <List.Icon icon="account-arrow-left" />}
                        />
                        {/* <Divider style={{height:0.5}}/>
                        <List.Item
                            title='Tanggal Penerimaan :'
                            description={()=>
                                <Subheading>{params.kegiatan.ambilbahan?.approved_at != null? moment(params.kegiatan.ambilbahan?.approved_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-right" />}
                        /> */}
                        <Divider style={{height:0.5}}/>
                        {/* <ActivityIndicator animating={true} color='#e62e2d' /> */}
                    </View>
                )
            case 'antar_bahan':
                return(
                    <View>
                        <List.Item
                            title='Tujuan Lab :'
                            description={()=>
                                <Subheading>{params.kegiatan.lab.nama}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Penerima :"
                            description={()=>
                                <View>
                                    <Title>{params.kegiatan.antarbahan?.penerima != null?params.kegiatan.antarbahan?.penerima:'-'}</Title>
                                    <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(params.kegiatan.antarbahan?.created_at).locale('id').format('LLLL')}</Text>
                                </View>
                            }
                            left={() => <List.Icon icon="account-arrow-left" />}
                        />
                    </View>
                )
            case 'instansi':
                return(
                    <View>
                        {/* <List.Item
                            title='Tanggal :'
                            description={()=>
                                <Subheading>{params.kegiatan.instansi?.created_at != null? moment(params.kegiatan.intansi?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/> */}
                        <List.Item
                            title="Instansi Tujuan :"
                            description={()=>
                                <View>
                                    <Text style={{fontSize:16,color:'black'}}>{params.kegiatan.instansi?.tujuan != null?params.kegiatan.instansi?.tujuan:'-'}</Text>
                                    <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(params.kegiatan.intansi?.created_at).locale('id').format('LLLL')}</Text>
                                </View>
                            }
                            left={() => <List.Icon icon="bank" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Jenis Kegiatan :"
                            description={()=>
                                <View style={{marginTop:10}}>
                                    {
                                        JSON.parse(params.kegiatan.instansi.jenis_keg).map((item,k)=>{
                                            return(
                                                <Text key={k} style={{fontSize:16,color:'black'}}>{'- '+item.keg}</Text>
                                            )
                                        })
                                    }
                                </View>
                            }
                            left={() => <List.Icon icon="clipboard-list-outline" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Status Kegiatan:"
                            description={()=>
                                <Text style={{fontSize:16,color:'black'}}>{params.kegiatan.instansi?.ket != null?params.kegiatan.instansi?.ket:'-'}</Text>
                            }
                            left={() => <List.Icon icon="calendar-question" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </View>
                )
            case 'pengantaran_dokter':
                return(
                    <View>
                        {/* <List.Item
                            title='Tanggal :'
                            description={()=>
                                <Subheading>{kegiatan.detail?.data?.kegiatan?.pengantarandokter?.created_at != null? moment(kegiatan.detail?.data?.kegiatan?.pengantarandokter?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/> */}
                        <List.Item
                            title="Tujuan :"
                            description={()=>
                                <View>
                                    <Title>{kegiatan.detail?.data?.kegiatan?.pengantarandokter?.tujuan != null?kegiatan.detail?.data?.kegiatan?.pengantarandokter?.tujuan:'-'}</Title>
                                    <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{kegiatan.detail?.data?.kegiatan?.pengantarandokter?.created_at != null? moment(kegiatan.detail?.data?.kegiatan?.pengantarandokter?.created_at).locale('id').format('LLLL'):''}</Text>
                                </View>
                            }
                            left={() => <List.Icon icon="doctor" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="JENIS URAIAN PEKERJAAN :"
                            description={()=>
                                
                                <View>
                                    {
                                        !kegiatan.detail.loading && kegiatan.detail.data?.kegiatan?.pengantarandokter?.uraianterpilih.length > 0?
                                            kegiatan.detail.data?.kegiatan?.pengantarandokter?.uraianterpilih.map((item,k)=>{
                                                return(
                                                    <View key={item.id} style={{marginBottom:0}}>
                                                        <List.Item
                                                            style={{padding:0}}
                                                            title={'- '+item.jenis?.nama}
                                                        />
                                                        {/* <Divider style={{height:0.5}}/> */}
                                                    </View>
                                                )
                                            })
                                        :
                                        <View style={{marginTop:20}}>
                                            <ActivityIndicator animating={true} color='#e62e2d'/>
                                            <Text style={{textAlign:'center',marginTop:10}}>Loading...</Text>
                                        </View>
                                    }
                                </View>
                            }
                            left={() => <List.Icon icon="playlist-edit" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Status :"
                            description={()=>
                                <Title>{kegiatan.detail?.data?.kegiatan?.pengantarandokter?.ket != null?kegiatan.detail?.data?.kegiatan?.pengantarandokter?.ket:'-'}</Title>
                            }
                            left={() => <List.Icon icon="calendar-question" />}
                        />
                    </View>
                )
            case 'lainnya':
                return(
                    <View>
                        {/* <List.Item
                            title='Tanggal :'
                            description={()=>
                                <Subheading>{params.kegiatan.lainnya?.created_at != null? moment(params.kegiatan.lainnya?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/> */}
                        <List.Item
                            title="Jenis Pekerjaan :"
                            description={()=>
                                <View>
                                    <Title>{params.kegiatan.lainnya?.jenis_keg }</Title>
                                    <Text style={{backgroundColor:'gray',width:200,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12,marginTop:3}}>{moment(params.kegiatan.lainnya?.created_at).locale('id').format('LLLL')}</Text>
                                </View>
                                
                            }
                            left={() => <List.Icon icon="view-list" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Tujuan :"
                            description={()=>
                                <Title>{params.kegiatan.lainnya?.tujuan }</Title>
                            }
                            left={() => <List.Icon icon="doctor" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Status/Penerima :"
                            description={()=>
                                <Title>{params.kegiatan.lainnya?.ket}</Title>
                            }
                            left={() => <List.Icon icon="calendar-question" />}
                        />
                    </View>
                )
            default:
                break;
        }
        
    }

    return (
        <View style={styles.main}>
            
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={kegiatan.detail.loading}
                    onRefresh={getKegiatan}
                />
            }>
                {/* <Text>{JSON.stringify(params.kegiatan,0,2)}</Text> */}
                {/* <Text>{JSON.stringify(kegiatan.detail.data?.kegiatan,0,2)}</Text> */}
                <View style={styles.container}>
                    {JenisKegiatan()}
                    {/* {
                        !kegiatan.detail.loading && kegiatan.detail.data != null?
                        <Text>ada</Text>
                        :
                        null
                    } */}
                    {/* {!kegiatan.detail.loading && kegiatan.detail.data != null ? null:JenisKegiatan()} */}
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
        paddingHorizontal: 10,
        marginBottom:'10%'
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
export default connect(mapStateToProps, { SET_DETAIL_KEGIATAN })(DetailKegiatan);
