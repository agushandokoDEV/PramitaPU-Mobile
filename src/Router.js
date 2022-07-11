import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Starter, Login, Home, ListLab, Formulir,AmbilBahan, DetailKegiatan,AntarBahan,Instansi,PengandataranDokter, Register, Lainnya, ListDokter } from './pages';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Starter" component={Starter} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
            {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen> */}
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
                headerTintColor: '#fff',
                title: '',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            {/* <Stack.Screen name="SampleExcel" component={SampleExcel} options={{ headerShown: true }}></Stack.Screen> */}
            <Stack.Screen name="AmbilBahan" component={AmbilBahan} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Ambil Bahan',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="AntarBahan" component={AntarBahan} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Antar Bahan',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="Instansi" component={Instansi} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'URAIAN TUGAS',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="PengandataranDokter" component={PengandataranDokter} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Lain-lain',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="Lainnya" component={Lainnya} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Lainnya',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="ListLab" component={ListLab} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Pilih Lab',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="ListDokter" component={ListDokter} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: 'Pilih Tujuan',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
            <Stack.Screen name="DetailKegiatan" component={DetailKegiatan} options={{
                headerShown: true,
                headerTintColor: '#fff',
                title: '',
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0 }
            }}></Stack.Screen>
        </Stack.Navigator>
    );
}

export default Router;