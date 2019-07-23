import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button } from 'native-base';
import { Right, Body, Left, Icon, Text } from 'native-base';
import { Spinner, Thumbnail, List, ListItem } from 'native-base';
import UserService from '../../service/UserService';
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
            .then((res: any) => {


                this.setState({
                    user: res.user,
                    isLoading: false,
                }, () => {
                    this.state.isLoading = false;
                });
            })
            .catch((err: any) => {
                console.error(err);
            });
    }



    render() {

        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <List>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail source={(this.state.user.image) ? { uri: this.state.user.image } : require('../../../assets/user.png')} />
                                    </Left>
                                    <Body>
                                        <Text>Mi cuenta</Text>
                                        <Text note>{this.state.user.lastName} {this.state.user.firstName}</Text>
                                    </Body>

                                </ListItem>
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
