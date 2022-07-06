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
                            title="Pasien :"
                            description={()=>
                                <Title>{params.kegiatan.ambilbahan?.nama_pasien}</Title>
                            }
                            left={() => <List.Icon icon="account-group" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Yang Menyerahkan :"
                            description={()=>
                                <Title>{params.kegiatan.ambilbahan?.yg_menyerahkan != null ? params.kegiatan.ambilbahan?.yg_menyerahkan:'-'}</Title>
                            }
                            left={() => <List.Icon icon="account-arrow-right" />}
                        />
                        <Divider style={{height:0.5}}/>
                        
                        <List.Item
                            title='Tanggal Pengiriman :'
                            description={()=>
                                <Subheading>{params.kegiatan.ambilbahan?.created_at != null? moment(params.kegiatan.ambilbahan?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Yang Menerima :"
                            description={()=>
                                <Title>{params.kegiatan.ambilbahan?.yg_menerima != null?params.kegiatan.ambilbahan?.yg_menerima:'-'}</Title>
                            }
                            left={() => <List.Icon icon="account-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title='Tanggal Penerimaan :'
                            description={()=>
                                <Subheading>{params.kegiatan.ambilbahan?.approved_at != null? moment(params.kegiatan.ambilbahan?.approved_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-right" />}
                        />
                        <Divider style={{height:0.5}}/>
                        
                        <Card>
                            <Card.Title
                                title="Tabung"
                                subtitle="Jenis & Jumlah"
                            />
                            <Divider style={{height:0.5}}/>
                            <Card.Content>
                            {
                                !kegiatan.detail.loading && kegiatan.detail.data?.listtabung != null?
                                    kegiatan.detail.data.listtabung.map((item,k)=>{
                                        return(
                                            <View key={item.id} style={{marginBottom:10}}>
                                                <List.Item
                                                    title={'- '+item.tabung?.nama}
                                                    right={() => <View style={{justifyContent:'center'}}><Badge size={25} style={{backgroundColor:'#e62e2d'}}>{item.jumlah}</Badge></View>}
                                                />
                                                <Divider style={{height:0.5}}/>
                                            </View>
                                        )
                                    })
                                :
                                <View style={{marginTop:20}}>
                                    <ActivityIndicator animating={true} color='#e62e2d'/>
                                    <Text style={{textAlign:'center',marginTop:10}}>Loading...</Text>
                                </View>
                            }
                            </Card.Content>
                        </Card>
                        
                        {/* <ActivityIndicator animating={true} color='#e62e2d' /> */}
                    </View>
                )
            case 'antar_bahan':
                return(
                    <View>
                        <List.Item
                            title='Tanggal Pengiriman :'
                            description={()=>
                                <Subheading>{params.kegiatan.antarbahan?.created_at != null? moment(params.kegiatan.antarbahan?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Penerima :"
                            description={()=>
                                <Title>{params.kegiatan.antarbahan?.penerima != null?params.kegiatan.antarbahan?.penerima:'-'}</Title>
                            }
                            left={() => <List.Icon icon="account-arrow-left" />}
                        />
                    </View>
                )
            case 'instansi':
                return(
                    <View>
                        <List.Item
                            title='Tanggal :'
                            description={()=>
                                <Subheading>{params.kegiatan.instansi?.created_at != null? moment(params.kegiatan.intansi?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Tujuan :"
                            description={()=>
                                <Title>{params.kegiatan.instansi?.tujuan != null?params.kegiatan.instansi?.tujuan:'-'}</Title>
                            }
                            left={() => <List.Icon icon="bank" />}
                        />
                        <List.Item
                            title="Status :"
                            description={()=>
                                <Title>{params.kegiatan.instansi?.ket != null?params.kegiatan.instansi?.ket:'-'}</Title>
                            }
                            left={() => <List.Icon icon="calendar-question" />}
                        />
                    </View>
                )
            case 'pengantaran_dokter':
                return(
                    <View>
                        <List.Item
                            title='Tanggal :'
                            description={()=>
                                <Subheading>{params.kegiatan.pengantarandokter?.created_at != null? moment(params.kegiatan.pengantarandokter?.created_at).locale('id').format('LLLL'):'-'}</Subheading>
                            }
                            left={() => <List.Icon icon="calendar-arrow-left" />}
                        />
                        <Divider style={{height:0.5}}/>
                        <List.Item
                            title="Tujuan :"
                            description={()=>
                                <Title>{params.kegiatan.pengantarandokter?.tujuan != null?params.kegiatan.pengantarandokter?.tujuan:'-'}</Title>
                            }
                            left={() => <List.Icon icon="doctor" />}
                        />
                        <List.Item
                            title="Status :"
                            description={()=>
                                <Title>{params.kegiatan.pengantarandokter?.ket != null?params.kegiatan.pengantarandokter?.ket:'-'}</Title>
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
                    refreshing={kegiatan.loading}
                    onRefresh={getKegiatan}
                />
            }>
                {/* <Text>{JSON.stringify(params,0,2)}</Text> */}
                {/* <Text>{JSON.stringify(kegiatan.detail,0,2)}</Text> */}
                <View style={styles.container}>
                    {JenisKegiatan()}
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
