import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Starter, Login, Home, SampleExcel, Formulir,AmbilBahan } from './pages';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Starter" component={Starter} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
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
        </Stack.Navigator>
    );
}

export default Router;