import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity,LogBox, RefreshControl } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton,List,Checkbox, Divider, IconButton } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_LIST_LAB,SET_LIST_TABUNG,SET_AMBIL_BAHAN } from '../../store';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const ListLab = ({route,navigation}) => {

    const { lab} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(lab.list.length === 0){
            getLab()
        }
    },[])

    function getLab() {
        dispatch(SET_LIST_LAB())
    }

    function onSelectLab(params) {
        navigation.goBack();
        route.params.onSelectLab(params)
        // navigation.navigate('AmbilBahan')
    }

    return (
        <View style={styles.main}>
            
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={lab.loading}
                    onRefresh={getLab}
                />
            }>
                <View style={styles.container}>
                {
                    lab.list.map((item)=>{
                        return(
                            <TouchableOpacity
                                key={item.id}
                                onPress={()=>onSelectLab(item)}>
                            <View style={styles.listbox}>
                                <List.Item
                                    title={item.name}
                                    left={props => <List.Icon {...props} icon="hand-pointing-right" />}
                                />
                            </View>
                            </TouchableOpacity>
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
    lab: state.lab
})
export default connect(mapStateToProps, { SET_LIST_LAB,SET_LIST_TABUNG,SET_AMBIL_BAHAN })(ListLab);
