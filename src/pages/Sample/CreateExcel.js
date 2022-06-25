import React, { PureComponent } from 'react';
import { View, Text, PermissionsAndroid, Button, Image, Alert, StyleSheet } from 'react-native';
import XLSX from 'xlsx';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { writeFile, readFile, DocumentDirectoryPath, DownloadDirectoryPath } from 'react-native-fs';

const DDP = DownloadDirectoryPath + "/";
const input = res => res;
const output = str => str;

export default class SampleExcel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                ["No", "Nama"],
                [1, "A"],
                [2, "B"],
                [3, "C"]
            ]
        };
        this.exportFile = this.exportFile.bind(this);
    }

    requestRuntimePermision = () => {
        console.log('requestRuntimePermision')
        var that = this;
        async function externalStoragePermision() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'extermal storage write permision',
                        message: 'aplikasi butuh akses ke storage data'
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //export file
                    that.exportFile()
                } else {
                    alert('WRITE_EXTERNAL_STORAGE DENIED');
                }
            } catch (e) {
                Alert.alert('write permision err ' + e);
                console.log(e)
            }
        }
        externalStoragePermision()
    }

    exportFile() {
        var data = [
            { "nama": "agus", "Kota": "Bandung" },
            { "nama": "prio", "Kota": "Jakarta" },
            { "nama": "handoko", "Kota": "Brebes" },
        ];

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

        const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
        const file = DDP + "sheetjsw.xlsx";

        writeFile(file, output(wbout), 'ascii').then((res) => {
            Alert.alert("sukes " + file);
        }).catch((err) => {
            Alert.alert("export error " + err.message)
        })
    }

    render() {
        return (
            <View>
                <Button onPress={() => { this.requestRuntimePermision() }} title="requestRuntimePermision" color="#841584" />
            </View>
        );
    }
}
