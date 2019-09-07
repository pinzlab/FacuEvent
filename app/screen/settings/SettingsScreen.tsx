import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button } from 'native-base';
import { Right, Body, Left, Icon, Text } from 'native-base';
import { Spinner, Thumbnail, List, ListItem } from 'native-base';
import UserService from '../../service/UserService';
import Logout from '../../component/Logout'
import { color } from '../../util/config';



export default class SettingsScreen extends React.Component {

    public props: any
    public state: any = {
        user: {},
        // state of charge of events
        isLoading: false
    }

    async componentDidMount() {
        const service: UserService = new UserService()
        service.me()
            .then(async (res: any) => {
                if (res.isLogged === true) {
                    this.setState({
                        user: res.me,
                        isLoading: false,
                    });
                } else {
                    await AsyncStorage.setItem('isLogged', 'false')
                    await AsyncStorage.removeItem('cookies')
                    Actions.replace('login');
                }
            })
            .catch((err: any) => {
                console.log('err');
            });
    }



    render() {

        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <List>
                                <ListItem icon style={{ marginTop: 50 }} onPress={() => Actions.editProfileScreen({ user: this.state.user })}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={{ color: color.secondary, fontSize: 30 }} name="contact" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Cuenta</Text>
                                        <Text note>Información personal</Text>
                                    </Body>
                                    <Right><Icon name='arrow-dropright' /></Right>
                                </ListItem>

                                <ListItem icon style={{ marginTop: 50 }} onPress={() => Actions.editPasswordScreen({ user: this.state.user })}>
                                    <Left>
                                        <Button transparent>
                                            <Icon style={{ color: color.secondary, fontSize: 30 }} name="key" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Credenciales</Text>
                                        <Text note>Cambiar la contraseña</Text>
                                    </Body>
                                    <Right><Icon name='arrow-dropright' /></Right>
                                </ListItem>
                                <Logout />
                            </List>
                        </Content>
                        )
                        : (
                            <Content>
                                <Spinner />
                            </Content>
                        )
                }

            </Container>
        );
    }
}
