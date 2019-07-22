import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content } from 'native-base';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { Thumbnail, View, Icon } from 'native-base';
import UserService from '../../service/UserService';
import { color } from '../../util/config'



export default class LoginScreen extends React.Component {

    //checking state for if font is loaded or not.
    public isLogged: boolean = false;
    public state: any = {
        emailAddress: 'aldaboad@gmail.com',
        password: 'adminP4$$',
        showPassword: true
    }

    private login(): void {
        this.setState({
            emailError: (this.state.emailAddress === undefined) ? true : false,
            passwordError: (this.state.password === undefined) ? true : false,
            showPassword: true,
            unauthorized: false
        })
        const service: UserService = new UserService()
        if (this.state.emailAddress !== undefined || this.state.password !== undefined)
            service.login(this.state.emailAddress, this.state.password)
                .then((res: any) => {
                    this.isLogged = res.logged;
                })
                .catch((err: any) => {
                    if (`${err}`.includes("Unauthorized")) {
                        console.log('Correo electrónico o contraseña invalidas')
                        this.isLogged = false
                    }
                }).finally(
                    () => {
                        if (this.isLogged)
                            Actions.replace('main');

                        else
                            this.setState({
                                unauthorized: (!this.isLogged) ? true : false,
                            })
                    }
                )


    }

    render() {
        return (
            <Container>
                <Content>

                    <View style={{ alignItems: 'center', paddingTop: 50 }}>
                        <Thumbnail style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
                    </View>

                    <Form>

                        <Item floatingLabel error={this.state.emailError}>
                            <Label>Correo Electrónico</Label>
                            <Input onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
                            {(this.state.emailError) ? (
                                <Icon name='close-circle' />
                            ) : null}
                        </Item>
                        <Item floatingLabel last error={this.state.passwordError}>
                            <Label>Contraseña</Label>
                            <Input secureTextEntry={this.state.showPassword} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                            {(this.state.passwordError) ? (
                                <Icon name='close-circle' />
                            ) : (
                                    <Icon
                                        style={{ color: (this.state.showPassword) ? color.secondary : color.grey }}
                                        onPress={() => this.setState({ showPassword: !this.state.showPassword })} name='eye' />
                                )}

                        </Item>


                    </Form>

                    <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>


                        {(this.state.unauthorized) ? (
                            <Text style={{
                                backgroundColor: color.danger,
                                width: '100%',
                                marginBottom: 25,
                                paddingVertical: 5,
                                textAlign: 'center',
                                borderRadius: 5,
                                color: '#fff',
                            }}>Correo electrónico o contraseña incorrectos</Text>
                        ) : null}

                        <Button full rounded style={{ backgroundColor: color.primary }} onPress={() => { this.login() }}>
                            <Text>Entrar</Text>
                        </Button>
                        <Button full rounded style={{ backgroundColor: color.primary, marginVertical: 25 }} onPress={() => { Actions.replace('signup') }}>
                            <Text>Registrarse</Text>
                        </Button>
                    </View>


                </Content>
            </Container>
        );
    }
}
