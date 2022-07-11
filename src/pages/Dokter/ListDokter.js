import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity,LogBox, RefreshControl } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton,List,Checkbox, Divider, IconButton } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_LIST_DOKTER } from '../../store';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const ListDokter = ({route,navigation}) => {

    const { dokter} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(dokter.list.length === 0){
            getDokter()
        }
    },[])

    function getDokter() {
        dispatch(SET_LIST_DOKTER())
    }

    function onSelectDokter(params) {
        navigation.goBack();
        route.params.onSelectDokter(params)
        // navigation.navigate('AmbilBahan')
    }

    return (
        <View style={styles.main}>
            
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={dokter.loading}
                    onRefresh={getDokter}
                />
            }>
                <View style={styles.container}>
                {
                    dokter.list.map((item)=>{
                        return(
                            <TouchableOpacity
                                key={item.id}
                                onPress={()=>onSelectDokter(item)}>
                            <View style={styles.listbox}>
                                <List.Item
                                    title={item.nama}
                                    left={props => <List.Icon {...props} icon="hand-pointing-right" />}
                                />
                            </View>
                            </TouchableOpacity>
                        )
                    })
                }
                </View>
                {/* <Text>{JSON.stringify(dokter,0,2)}</Text> */}
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
    dokter: state.dokter
})
export default connect(mapStateToProps, { SET_LIST_DOKTER })(ListDokter);
