import React,{ useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeTab from './Tabs/HomeTab';
import ProfileTab from './Tabs/ProfileTab';
import { useSelector,useDispatch, connect } from 'react-redux';
import { SET_AUTH_LOGOUT } from '../../store';
import RiwayatTab from './Tabs/RiwayatTab';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!auth.loading && !auth.isLogin){
            navigation.replace('Starter')
        }
    },[auth])

    function logout() {
        dispatch(SET_AUTH_LOGOUT())
    }

    return (
        <Tab.Navigator
            //shifting={false}
            initialRouteName="HomeTabs"
            screenOptions={{
                tabBarActiveTintColor: '#e62e2d',
                tabBarInactiveTintColor: '#ccc',
                tabBarStyle: { backgroundColor: '#fff', borderTopColor: 'gold' }
            }}
        >
            <Tab.Screen name="HomeTabs" component={HomeTab} options={{
                tabBarIcon: ({ color }) => (
                    <View>
                        <MaterialIcons name="home" size={35} color={color} />
                    </View>
                ),
                // tabBarShowLabel: false,
                tabBarLabel: "Beranda",
                headerShown: false
            }}></Tab.Screen>
            <Tab.Screen name="RiwayatTabs" component={RiwayatTab} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="history" size={35} color={color} />
                ),
                // tabBarShowLabel: false,
                tabBarLabel: "Riwayat",
                headerShown: true,
                title: 'Riwayat Kegiatan',
                headerRightContainerStyle: { paddingHorizontal: 15 },
                headerTitleStyle:{color:'#fff'},
                
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0, borderBottomWidth: 0, },
            }}></Tab.Screen>

            <Tab.Screen name="ProfileTabs" component={ProfileTab} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="person" size={35} color={color} />
                ),
                // tabBarShowLabel: false,
                tabBarLabel: "Profile",
                headerShown: true,
                title: 'Profile',
                headerRightContainerStyle: { paddingHorizontal: 15 },
                headerTitleStyle:{color:'#fff'},
                headerRight: () => {
                    return (
                        <TouchableOpacity onPress={logout}>
                            <MaterialIcons name="logout" size={35} color='#fff' />
                        </TouchableOpacity>
                    )
                },
                
                headerStyle: { backgroundColor: '#e62e2d', elevation: 0, borderBottomWidth: 0, },
            }}></Tab.Screen>
            {/* <Tab.Screen name="AboutTabs" component={AboutTabs} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="info" size={35} color={color} />
                ),
                tabBarShowLabel: false,
                tabBarLabel: "Profile",
                headerShown: false
            }}></Tab.Screen> */}
        </Tab.Navigator>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { SET_AUTH_LOGOUT })(Home);