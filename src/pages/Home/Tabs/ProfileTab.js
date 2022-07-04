import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Divider, Paragraph, Title } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import user_ico from '../../../assets/user.jpg';

const ProfileTab = () => {

    const { auth } = useSelector(state => state);

    return(
        <View style={styles.main}>
            <ScrollView>
                <View style={{ height: 50, backgroundColor: '#e62e2d' }}>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -50 }}>
                    <View style={{ borderWidth: 5, borderColor: '#fff', borderRadius: 100, width: 110, height: 110, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                        <Avatar.Image size={100} source={user_ico} />
                    </View>
                </View>

                <View style={styles.container}>
                    <Card style={{ borderColor: '#ddd', borderWidth: 1 }}>
                        <Card.Content>
                            <Title style={{ textAlign: 'center' }}>{auth?.user.namalengkap}</Title>
                            {/* <Divider style={{ height: 3, marginVertical: 5 }} /> */}
                            <Paragraph style={{ textAlign: 'center' }}>@{auth?.user.username}</Paragraph>
                            <Paragraph style={{ textAlign: 'center' }}>{auth?.user.email}</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
                <View>
                    {/* <Text>{JSON.stringify(auth,0,2)}</Text> */}
                </View>
            </ScrollView>
        </View>
        
    );
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        marginHorizontal: 10,
        marginVertical: 10
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(ProfileTab);