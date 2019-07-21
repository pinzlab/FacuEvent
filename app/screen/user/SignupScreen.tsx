import React from 'react';
import { Container, Content } from 'native-base';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { Footer, FooterTab, Thumbnail, View } from 'native-base';



export default class SignupScreen extends React.Component {

  //checking state for if font is loaded or not.
  public state: any = {
    lastName: '',
    firstName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    agreed: true
  }

  private signup(): void {
    console.log('Clickeado')
    console.log(this.state)
  }

  render() {
    return (
      <Container>
        <Content>

          <View style={{ alignItems: 'center', paddingTop: 30 }}>
            <Thumbnail style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
          </View>

          <Form>
            <Item floatingLabel>
              <Label>Apellidos</Label>
              <Input onChangeText={(lastName) => this.setState({ lastName })} value={this.state.lastName} />
            </Item>
            <Item floatingLabel last>
              <Label>Nombres</Label>
              <Input onChangeText={(firstName) => this.setState({ firstName })} value={this.state.firstName} />
            </Item>
            <Item floatingLabel last>
              <Label>Correo Electrónico</Label>
              <Input onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
            </Item>
            <Item floatingLabel last>
              <Label>Contraseña</Label>
              <Input secureTextEntry onChangeText={(password) => this.setState({ password })} value={this.state.password} />
            </Item>
            <Item floatingLabel last>
              <Label>Confirme Contraseña</Label>
              <Input secureTextEntry onChangeText={(confirmPassword) => this.setState({ confirmPassword })} value={this.state.confirmPassword} />
            </Item>
          </Form>

          <View style={{ alignItems: 'center', paddingHorizontal: 10, paddingTop: 30 }}>
            <Button full onPress={() => { this.signup() }}>
              <Text>Regístrate</Text>
            </Button>
          </View>


        </Content>
        <Footer >
          <FooterTab>
            <Button full >
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
