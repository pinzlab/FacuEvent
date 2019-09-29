import React from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Spinner } from 'native-base'
import { Form, Item, Label, Input, Button, Text } from 'native-base'
import { Thumbnail, View, Icon } from 'native-base'
import { color } from '../../util/config'
import Crypto from '../../util/crypto'
import UserService from '../../service/UserService'



export default class SignupScreen extends React.Component {

  //checking state for if font is loaded or not.
  public state: any = {
    agreed: true,
    showPassword: true
  }


  private isValid(): boolean {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validator
    let isValid: boolean = false;
    this.setState({
      lastNameError: (this.state.lastName === undefined) ? true : false,
      firstNameError: (this.state.firstName === undefined) ? true : false,
      emailError: (this.state.emailAddress === undefined || reg.test(this.state.emailAddress) === false) ? true : false,
      passwordError: (this.state.password === undefined) ? true : false,
      confirmPasswordError: (this.state.confirmPassword === undefined) ? true : false,
      diferentPasswordError: (this.state.confirmPassword !== this.state.password) ? true : false,
      showPassword: true,
    })
    isValid = (
      this.state.lastName !== undefined &&
      this.state.firstName !== undefined &&
      this.state.emailAddress !== undefined &&
      reg.test(this.state.emailAddress) && //if is a valid email
      this.state.password !== undefined &&
      this.state.confirmPassword !== undefined &&
      this.state.confirmPassword === this.state.password
    )
    return isValid;
  }

  private signup(): void {
    const service: UserService = new UserService();
    if (this.isValid()) {
      this.setState({ loader: true })
      service.signup(
        this.state.lastName,
        this.state.firstName,
        this.state.emailAddress,
        this.state.password)
        .then(async (res: any) => {
          this.setState({ loader: false })
          if (res.raw) {
            this.setState({
              conflict: (res.raw === 'emailAlreadyInUse') ? true : undefined
            })
          }
          if (res.user) {
            console.log({
              emailAddress: this.state.emailAddress,
              password: this.state.password
            })
            await AsyncStorage.setItem('emailAddress', this.state.emailAddress)
            await AsyncStorage.setItem(
              'password',
              Crypto.encrypt(this.state.emailAddress.split('@')[0], this.state.password).toString()
            )
            Actions.replace('welcome');
          }
        })
    }

  }

  render() {
    return (
      <Container>
        <Content>

          <View style={{ alignItems: 'center', paddingTop: 30 }}>
            <Thumbnail style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
          </View>

          <Form>
            <Item floatingLabel error={this.state.lastNameError}>
              <Label>Apellidos</Label>
              <Input onChangeText={(lastName) => this.setState({ lastName })} value={this.state.lastName} />
              {(this.state.lastNameError) ? (
                <Icon name='close-circle' />
              ) : null}
            </Item>
            <Item floatingLabel last error={this.state.firstNameError}>
              <Label>Nombres</Label>
              <Input onChangeText={(firstName) => this.setState({ firstName })} value={this.state.firstName} />
              {(this.state.firstNameError) ? (
                <Icon name='close-circle' />
              ) : null}
            </Item>
            <Item floatingLabel last error={this.state.emailError}>
              <Label>Correo Electrónico</Label>
              <Input onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
              {(this.state.emailError) ? (
                <Icon name='close-circle' />
              ) : null}
            </Item>
            <Item floatingLabel last error={this.state.passwordError || this.state.diferentPasswordError}>
              <Label>Contraseña</Label>
              <Input secureTextEntry={this.state.showPassword} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
              {(this.state.passwordError || this.state.diferentPasswordError) ? (
                <Icon name='close-circle' />
              ) : (
                  (
                    <Icon
                      style={{ color: (this.state.showPassword) ? color.secondary : color.grey }}
                      onPress={() => this.setState({ showPassword: !this.state.showPassword })} name='eye' />
                  )
                )}
            </Item>
            <Item floatingLabel last error={this.state.confirmPasswordError || this.state.diferentPasswordError}>
              <Label>Confirme Contraseña</Label>
              <Input secureTextEntry={this.state.showPassword} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} value={this.state.confirmPassword} />
              {(this.state.confirmPasswordError || this.state.diferentPasswordError) ? (
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
            {(this.state.diferentPasswordError || this.state.conflict) ? (
              <Text style={{
                backgroundColor: color.danger,
                width: '100%',
                marginBottom: 25,
                paddingVertical: 5,
                textAlign: 'center',
                borderRadius: 5,
                color: '#fff',
              }}>{(this.state.diferentPasswordError) ? 'Las contraseñas no coinciden' : 'La dirección de correo electrónico proporcionada ya está en uso.'}</Text>
            ) : null}



            <Button
              full
              rounded
              disabled={this.state.loader}
              style={{ backgroundColor: color.primary }}
              onPress={() => { this.signup() }}>
              {(this.state.loader) ? <Spinner color='white' /> : <Text>Registrarse</Text>}
            </Button>
            <Button full rounded style={{ backgroundColor: color.primary, marginVertical: 25 }} onPress={() => { Actions.replace('login') }}>
              <Text>Logearse</Text>
            </Button>
          </View>


        </Content>
        <StatusBar hidden />
      </Container>
    );
  }
}
