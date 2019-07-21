import React from 'react';
import { Container, Content } from 'native-base';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { Footer, FooterTab, Thumbnail, View } from 'native-base';
import { UserService } from '../../service/UserService';



export default class LoginScreen extends React.Component {

    //checking state for if font is loaded or not.
    public state: any = {
        emailAddress: '',
        password: '',
        agreed: true
    }

    private login(): void {
        const service: UserService = new UserService()
        service.login(this.state.emailAddress, this.state.password)
            .then((res: any) => { console.log(res) })
            .catch((err: any) => {
                if (`${err}`.includes("Unauthorized")) {
                    console.log('Correo electrónico o contraseña invalidas')
                }
            })
    }

    render() {
        return (
            <Container>
                <Content>

                    <View style={{ alignItems: 'center', paddingTop: 50 }}>
                        <Thumbnail style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
                    </View>

                    <Form>

                        <Item floatingLabel last>
                            <Label>Correo Electrónico</Label>
                            <Input onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Contraseña</Label>
                            <Input secureTextEntry onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                        </Item>

                    </Form>

                    <View style={{ alignItems: 'center', paddingHorizontal: 10, paddingTop: 50 }}>
                        <Button full onPress={() => { this.login() }}>
                            <Text>Entrar</Text>
                        </Button>
                    </View>


                </Content>
                <Footer >
                    <FooterTab>
                        <Button full >
                            <Text>Regístrate</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
