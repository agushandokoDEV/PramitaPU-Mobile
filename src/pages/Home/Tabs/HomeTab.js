import React, { useEffect, version } from 'react';
import { View, StyleSheet, Image, Dimensions, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import header_img from '../../../assets/pramita-banner.png';
import icon_article from '../../../assets/icons/icon_article.png';
import icon_home_work from '../../../assets/icons/icon_home_work.png';
import icon_directions_bike from '../../../assets/icons/icon_directions_bike.png';
import icon_directions_run from '../../../assets/icons/icon_directions_run.png';
import icon_shortcut_transfer_within_a_station from '../../../assets/icons/icon_shortcut_transfer_within_a_station.png';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_LOGOUT,SET_LIST_KEGIATAN,RESET_DETAIL_KEGIATAN } from '../../../store';
import { Text, Divider, List, Card, Paragraph, Title, Badge, Chip, Surface, Subheading } from 'react-native-paper';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeTab = ({ navigation }) => {

    const { auth,kegiatan } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!auth.isLogin){
            navigation.replace('Starter')
        }
    },[auth])

    useEffect(()=>{
        dispatch(SET_LIST_KEGIATAN())
    },[])

    function getDetail(payload,title) {
        dispatch(RESET_DETAIL_KEGIATAN())
        navigation.navigate('DetailKegiatan',{kegiatan:payload,title:title})
    }

    const ListKegiatan=(item)=>{
        // console.log(item.jenis)
        switch (item.jenis) {
            case 'ambil_bahan':
                return(
                    <TouchableOpacity onPress={()=>getDetail(item,'AMBIL BAHAN / KUNJUNGAN')} key={item.id}>
                        <List.Item
                            title={item?.lab.nama}
                            description={()=>
                                <View style={{marginTop:5}}>
                                    <Text style={{backgroundColor:'#004085',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Ambil Bahan</Text>
                                </View>
                            }
                            right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </TouchableOpacity>
                )
            case 'antar_bahan':
                return(
                    <TouchableOpacity onPress={()=>getDetail(item,'ANTAR BAHAN / RUJUKAN')} key={item.id}>
                        <List.Item
                            title={item?.lab.nama}
                            description={()=>
                                <View style={{marginTop:5}}>
                                    <Text style={{backgroundColor:'#16a34a',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Antar Bahan</Text>
                                </View>
                            }
                            // right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </TouchableOpacity>
                )
            case 'instansi':
                return(
                    <TouchableOpacity onPress={()=>getDetail(item,'INSTANSI')} key={item.id}>
                        <List.Item
                            title={item?.instansi.tujuan}
                            description={()=>
                                <View style={{marginTop:5}}>
                                    <Text style={{backgroundColor:'#721c24',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Instansi</Text>
                                </View>
                            }
                            // right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </TouchableOpacity>
                )
            case 'pengantaran_dokter':
                return(
                    <TouchableOpacity onPress={()=>getDetail(item,'Bacaan Dokter')} key={item.id}>
                        <List.Item
                            title={item?.pengantarandokter?.tujuan}
                            description={()=>
                                <View style={{marginTop:5}}>
                                    <Text style={{backgroundColor:'#856404',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Bacaan Dokter</Text>
                                </View>
                            }
                            // right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </TouchableOpacity>
                )
            case 'lainnya':
                return(
                    <TouchableOpacity onPress={()=>getDetail(item,'Uraian Pekerjaan')} key={item.id}>
                        <List.Item
                            title={item?.lainnya.jenis_keg}
                            description={()=>
                                <View style={{marginTop:5}}>
                                    <Text style={{backgroundColor:'#23272b',width:90,textAlign:'center',borderRadius:50,color:"#fff",paddingVertical:1,fontSize:12}}>Lain-lain</Text>
                                </View>
                            }
                            // right={() => item.ambilbahan.yg_menerima !=null?<List.Icon color='#155724' icon="account-check" />:<List.Icon color='#856404' icon="alert-circle" />}
                        />
                        <Divider style={{height:0.5}}/>
                    </TouchableOpacity>
                )
            default:
                return(
                    <Text>-</Text>
                )
        }
    }

    return (
        <View style={styles.main}>
            
                <View style={styles.divImgHeader}>
                    <Image source={header_img} style={styles.imgHeader} resizeMode='stretch' />
                </View>
                <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={kegiatan.loading}
                                onRefresh={()=> dispatch(SET_LIST_KEGIATAN())}
                            />
                    }>
                <View style={styles.container}>
                    
                    {/* <View style={styles.blokMenu}>
                        <IconBoxMenu icon={icon_directions_run} title='Ambil Bahan' onPress={() => navigation.navigate('AmbilBahan')} />
                        <IconBoxMenu icon={icon_directions_bike} title='Antar Bahan' onPress={() => navigation.navigate('Formulir')} />
                        <IconBoxMenu icon={icon_home_work} title='Instansi' onPress={() => navigation.navigate('Formulir')} />
                    </View> */}

                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{marginVertical:20}}>
                            <View style={styles.blokMenu}>
                                <TouchableOpacity onPress={() => navigation.navigate('AmbilBahan')}>
                                    <Surface style={styles.surface} elevation={10}>
                                        <Image style={{width:50,height:50}} source={icon_directions_run}></Image>
                                        <Text>Kunjungan</Text>
                                    </Surface>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('AntarBahan')}>
                                    <Surface style={styles.surface} elevation={10}>
                                        <Image style={{width:50,height:50}} source={icon_directions_bike}></Image>
                                        <Text>Rujukan</Text>
                                    </Surface>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Instansi')}>
                                    <Surface style={styles.surface} elevation={10}>
                                        <Image style={{width:50,height:50}} source={icon_home_work}></Image>
                                        <Text>Instansi</Text>
                                    </Surface>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.blokMenu}>
                                <TouchableOpacity onPress={() => navigation.navigate('PengandataranDokter')}>
                                    <Surface style={styles.surface} elevation={10}>
                                        <Image style={{width:50,height:50}} source={icon_shortcut_transfer_within_a_station}></Image>
                                        <Text style={{textAlign:'center'}}>Bacaan Dokter</Text>
                                    </Surface>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => navigation.navigate('Lainnya')}>
                                    <Surface style={styles.surface} elevation={10}>
                                        <Image style={{width:50,height:50}} source={icon_article}></Image>
                                        <Text>Lain-lain</Text>
                                    </Surface>
                                </TouchableOpacity>
                                <Surface style={[styles.surface,{backgroundColor:'#fff',borderWidth:0}]}>
                                    {/* <Image style={{width:50,height:50}} source={icon_directions_run}></Image>
                                    <Text>Surface</Text> */}
                                </Surface>
                            </View>
                        </View>
                    </View>
                    <View>
                    
                        <View style={{backgroundColor:"#fff",marginBottom:0}}>
                            {/* <List.Section>
                                <List.Item
                                    title="Kegiatan hari ini"
                                    titleStyle={{fontSize:20}}
                                    // left={() => <List.Icon icon="history" />}
                                />
                            </List.Section> */}
                            <Divider style={{height:1}}/>
                            <Title style={{padding:10,backgroundColor:'#ddd'}}>Kegiatan hari ini</Title>
                            <Divider style={{height:1,marginTop:1}}/>
                            
                            {/* <Text>{JSON.stringify(kegiatan,0,2)}</Text> */}
                            <View>
                                <View style={{padding:10}}>
                                    {
                                        !kegiatan.loading && kegiatan.list.length === 0?
                                        <Text>Belum ada kegiatan</Text>
                                        :null
                                    }
                                </View>
                                {
                                    kegiatan.loading?
                                    Array.from(Array(5)).map((k,v)=>{
                                        return(
                                            <View key={v} style={{marginVertical:30,marginHorizontal:10}}>
                                                <SkeletonPlaceholder>
                                                    <View style={{ flexDirection: "row", justifyContent:'space-between'}}>
                                                        <View>
                                                            <View style={{ width: 140, height: 20, borderRadius: 4 }} />
                                                            <View
                                                                style={{ marginTop: 6, width: 80, height: 15, borderRadius: 4 }}
                                                            />
                                                        </View>
                                                        <View style={{ width: 20, height: 20, borderRadius: 50,marginRight:20 }} />
                                                    </View>
                                                </SkeletonPlaceholder>
                                                <Divider style={{height:0.5,marginTop:15}}/>
                                            </View>
                                        )
                                    })
                                    :
                                    kegiatan.list.map((item)=>{
                                        return(
                                            ListKegiatan(item)
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
                </ScrollView>
        </View>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    divImgHeader: {
        elevation: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    imgHeader: {
        width: width,
        height: height / 4
    },
    container: {
        //backgroundColor: '#fff',
        // marginVertical: 10
    },
    // blokMenu: {
    //     //backgroundColor: '#fff',
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     paddingHorizontal: 10,
    //     paddingVertical: 20,
    //     marginHorizontal: 5,
    //     borderRadius: 5
    // },
    
    blokMenu: {
        // backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-evenly",
        // alignItems:'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    surface: {
        padding: 8,
        // height: 80,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
        borderWidth:0.7,
        borderColor:"#fbbf24"
    },
})

const mapStateToProps = (state) => ({
    auth: state.auth,
    kegiatan:state.kegiatan
})
export default connect(mapStateToProps, { SET_AUTH_LOGOUT,SET_LIST_KEGIATAN,RESET_DETAIL_KEGIATAN })(HomeTab);