import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Headline, Paragraph, Subheading, TextInput, Dialog, RadioButton } from 'react-native-paper';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_LIST_LAB } from '../../store';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

const AmbilBahan = () => {

    const { lab } = useSelector(state => state);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [LabSelected, SetLabSelected] = useState('');
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
      ]);

    useEffect(()=>{
        getLab()
    },[])


    function getLab() {
        dispatch(SET_LIST_LAB())
    }

    function setLab(params) {
        SetLabSelected(params)
        setOpen(!open)
    }

    return (
        <View style={styles.main}>
            
            <ScrollView>
                <View style={styles.container}>
                    {/* <View>
                        <Headline>Headline</Headline>
                        <Subheading>Paragraph</Subheading>
                    </View> */}
                    <View style={{ marginTop: 20 }}>
                        <TextInput label="Email" placeholder='masukan email' mode='outlined' style={styles.input} />
                        <TextInput label="Email" mode='flat' style={styles.input}/>
                        
                        <Button style={styles.btnSubmit} mode="contained" onPress={() => setOpen(!open)}>
                            Simpan
                        </Button>
                    </View>
                </View>
            </ScrollView>

            <Dialog visible={open} onDismiss={()=>setOpen(!open)}>
                <Dialog.Title>This is a title</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView>
                        <RadioButton.Group onValueChange={setLab} value={LabSelected}>
                        {
                            lab.list.map((item)=>{
                                return(
                                    <RadioButton.Item key={item.id} label={item.name} value={item.id} />
                                )
                            })
                        }
                        </RadioButton.Group>
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>
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
    input: {
        marginBottom: 10,
        // backgroundColor: '#fff'
    },
    btnSubmit: {
        marginTop:10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e62e2d'
    }
})


const mapStateToProps = (state) => ({
    lab: state.lab
})
export default connect(mapStateToProps, { SET_LIST_LAB })(AmbilBahan);
