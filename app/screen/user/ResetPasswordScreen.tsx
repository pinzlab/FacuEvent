import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StatusBar } from 'react-native'
import { Container, Content, Spinner } from 'native-base';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { Thumbnail, View, Icon } from 'native-base';
import UserService from '../../service/UserService'
import { color } from '../../util/config'
export default class ResetPasswordScreen extends React.Component {
  public state: any = {
    step: 1,
    showPassword: true
  }


  private sendEmail() {

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validator
    this.setState({
      emailError: (
        this.state.emailAddress === undefined ||
        reg.test(this.state.emailAddress) === false ||
        this.state.emailAddress === ''
      ) ? true : false,
    })


    if (
      !(this.state.emailAddress === undefined ||
        reg.test(this.state.emailAddress) === false ||
        this.state.emailAddress === '')
    ) {
      this.setState({ loader: true })
      const service: UserService = new UserService()
      service.resetPassToken(this.state.emailAddress)
        .then((res: any) => {
          if (res.sent === true) {
            this.setState({ step: 2 })
          } else {
            Actions.pop()
          }
        })
        .catch(() => Actions.pop())
        .finally(() => { this.setState({ loader: false }) })
    }
  }

  private validateToken() {
    this.setState({
      tokenError: (this.state.token === undefined || this.state.token === '') ? true : false,
    })

    if (!(this.state.token === undefined || this.state.token === '')) {
      this.setState({ step: 3 })
    }
  }

  private changePass() {
    const service: UserService = new UserService()
    if (this.isPassValid()) {
      this.setState({ loader: true })
      service.resetPass(this.state.token, this.state.password)
        .then((res: any) => {
          this.setState({ loader: false })
          if (res.status === 200) {
            Actions.replace('main');
          }
        })
        .catch((err: any) => { console.log(err) })
    }
  }

  private isPassValid(): boolean {

    let isValid: boolean = false;
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


  render() {
    return (
      <Container>
        <Button onPress={() => Actions.pop()} transparent style={{ alignSelf: 'flex-end', padding: 10 }}>
          <Icon style={{ color: color.primary }} name='close' />
        </Button>
        <Content>

          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <Thumbnail style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
          </View>
          {(this.state.step === 1) ?
            <Form>
              <Text style={{ marginTop: 25, fontWeight: 'bold', color: 'grey', alignSelf: 'center' }}>¿Olvidaste tu contraseña?</Text>
              <Item floatingLabel error={this.state.emailError}>
                <Label>Correo Electrónico</Label>
                <Input onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
                {(this.state.emailError) ? (
                  <Icon name='close-circle' />
                ) : null}
              </Item>
              <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>
                <Button
                  full
                  rounded
                  style={{ backgroundColor: color.primary }}
                  disabled={this.state.loader}
                  onPress={() => this.sendEmail()} >
                  {(this.state.loader) ? <Spinner color='white' /> : <Text>restablecer la contraseña</Text>}
                </Button>
              </View>
            </Form>
            : null}
          {(this.state.step === 2) ?
            <Form>
              <Text style={{ marginTop: 25, marginHorizontal: 50, color: 'grey', textAlign: 'center', alignSelf: 'center' }}>
                Por favor verifique su correo electrónico y copie el token.
              </Text>
              <Item floatingLabel error={this.state.tokenError}>
                <Label>Token</Label>
                <Input onChangeText={(token) => this.setState({ token })} value={this.state.token} />
                {(this.state.tokenError) ? (
                  <Icon name='close-circle' />
                ) : null}
              </Item>
              <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>
                <Button full rounded style={{ backgroundColor: color.primary }} onPress={() => this.validateToken()} >
                  <Text>Continuar</Text>
                </Button>
              </View>
            </Form>
            : null}
          {(this.state.step === 3) ?
            <Form>
              <Text style={{ marginTop: 25, fontWeight: 'bold', color: 'grey', alignSelf: 'center' }}>Cambiar la contraseña</Text>
              <Item floatingLabel last error={this.state.passwordError || this.state.diferentPassword}>
                <Label>Contraseña nueva</Label>
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
              <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>
                <Button
                  full
                  rounded
                  disabled={this.state.loader}
                  style={{ backgroundColor: color.primary }}
                  onPress={() => this.changePass()} >
                  {(this.state.loader) ? <Spinner color='white' /> : <Text>cambiar la contraseña</Text>}
                </Button>
              </View>
            </Form>
            : null}
        </Content>
        <StatusBar hidden />
      </Container>);
  }
}
