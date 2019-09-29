import React from 'react'
import { AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Button } from 'native-base'
import { Body, Left, Icon, Text } from 'native-base'
import { Thumbnail, List, ListItem } from 'native-base'
import { View, Form, Item, Label, Input } from 'native-base'
import ToolBar from '../../component/ToolBar'
import { color } from '../../util/config';
import Crypto from '../../util/crypto';
import UserService from '../../service/UserService';



export default class EditPasswordScreen extends React.Component {

    public props: any
    public state: any = {
        showPassword: true
    }



    private isValid(): boolean {

        let isValid: boolean = false
        this.setState({
            passwordError: (this.state.password === undefined) ? true : false,
            confirmPasswordError: (this.state.confirmPassword === undefined) ? true : false,
            diferentPassword: (this.state.confirmPassword !== this.state.password) ? true : false,
            showPassword: true
        })
        if (this.state.password !== undefined && !this.state.diferentPassword) {
            this.setState({
                smallPassword: (this.state.password.length < 8 && this.state.confirmPassword.length < 8) ? true : false
            })
        }

        isValid = (
            (this.state.password !== undefined || this.state.password !== '') &&
            (this.state.confirmPassword !== undefined || this.state.confirmPassword !== '') &&
            this.state.confirmPassword === this.state.password &&
            this.state.password.length >= 8 && this.state.confirmPassword.length >= 8
        )
        return isValid;
    }



    public async update() {
        const service: UserService = new UserService()
        if (this.isValid())
            service.updatePassword(this.state.password)
                .then(async (res: any) => {
                    const emailAddress: string = await AsyncStorage.getItem('emailAddress')
                    await AsyncStorage.setItem('password', Crypto.encrypt(emailAddress.split('@')[0], this.state.password).toString())
                    Actions.replace('settingsScreen')
                })
                .catch((err: any) => { console.log(err) })

    }


    render() {

        return (
            <Container>
                <ToolBar title="Mi perfil" subtitle="Cambiar contraseñas" />
                <Content>
                    <List>
                        <ListItem avatar >
                            <Left>
                                <Thumbnail source={(this.props.user.image) ? { uri: this.props.user.image } : require('../../../assets/user.png')} />
                            </Left>
                            <Body>
                                <Text>Mi cuenta</Text>
                                <Text note>{this.props.user.lastName} {this.props.user.firstName}</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <Form>
                        <Item floatingLabel last error={this.state.passwordError || this.state.diferentPassword}>
                            <Label>Contraseña</Label>
                            <Input secureTextEntry={this.state.showPassword} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                            {(this.state.passwordError || this.state.diferentPassword) ? (
                                <Icon name='close-circle' />
                            ) : (
                                    (
                                        <Icon
                                            style={{ color: (this.state.showPassword) ? color.secondary : color.grey }}
                                            onPress={() => this.setState({ showPassword: !this.state.showPassword })} name='eye' />
                                    )
                                )}
                        </Item>
                        <Item floatingLabel last error={this.state.confirmPasswordError || this.state.diferentPassword}>
                            <Label>Confirme Contraseña</Label>
                            <Input secureTextEntry={this.state.showPassword} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} value={this.state.confirmPassword} />
                            {(this.state.confirmPasswordError || this.state.diferentPassword) ? (
                                <Icon name='close-circle' />
                            ) : (
                                    (
                                        <Icon
                                            style={{ color: (this.state.showPassword) ? color.secondary : color.grey }}
                                            onPress={() => this.setState({ showPassword: !this.state.showPassword })} name='eye' />
                                    )
                                )}
                        </Item>
                    </Form>
                    <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>


                        {(this.state.diferentPassword || this.state.smallPassword) ? (
                            <Text style={{
                                backgroundColor: color.danger,
                                width: '100%',
                                marginBottom: 25,
                                paddingVertical: 5,
                                textAlign: 'center',
                                borderRadius: 5,
                                color: '#fff',
                            }}>
                                {(this.state.diferentPassword) ? 'Las contraseñas no coinciden' : 'La nueva contraseña es muy corta'}
                            </Text>
                        ) : null}

                        <Button full rounded style={{ backgroundColor: color.primary }} onPress={() => this.update()}>
                            <Text>Guardar</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
