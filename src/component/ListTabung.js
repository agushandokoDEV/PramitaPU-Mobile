import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native';
import { Checkbox, IconButton, List } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AMBIL_BAHAN } from '../store';

const ListTabung = (props) => {

    const {tabungitem}=props
    const { ambilbahan } = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log(ambilbahan)

    const [total,setTotal]=useState(0)
    const [listselected,setListselected]=useState([])
    const [listdata,setListdata]=useState([])

    useEffect(()=>{
        console.log(listdata)
    },[listdata])

    const onChecked = (key) => {
        console.log(key)
        var temp = listdata;
        var dataselected = listdata;

        if (temp.includes(key.id)) {
            setListselected(temp.filter(item => item !== key.id))
            setListdata(dataselected.filter(item => item.id !== key.id))
        } else {
            setListselected(old => [...old, key.id])
            setListdata(old => [...old, key])
        }

        // console.log(listdata)
    }

    function setJumlah(operator,jumlah) {
        var hasil=0
        if(operator === '+'){
            hasil = jumlah++
        }
        if(operator === '-'){
            hasil = jumlah-1
        }
        console.log(jumlah,hasil)
        setTotal(hasil)
    }

    function tes(params) {
        console.log(params)
    }

    return(
        <List.Item
            key={tabungitem.id}
            title={tabungitem.nama}
            description={()=>
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                    <View>
                        <IconButton
                            icon="minus"
                            size={20}
                            onPress={() => setTotal(total === 0?total:total-1)}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize:16}}>{total.toString()}</Text>
                    </View>
                    <View>
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => tes(tabungid)}
                    />
                    </View>
                </View>
            }
            left={props => <Checkbox.Item status={listselected.includes(tabungitem.id) ? 'checked' : 'unchecked'} onPress={()=>onChecked(tabungitem)}/>}
        />
        
    )
}

const mapStateToProps = (state) => ({
    ambilbahan: state.ambilbahan
})
export default connect(mapStateToProps, { SET_AMBIL_BAHAN })(ListTabung);