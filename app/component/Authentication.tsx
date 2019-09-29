import React from 'react'
import { AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container } from 'native-base'
import Crypto from '../util/crypto'
import UserService from '../service/UserService'

export default class Authentication extends React.Component {
  async componentDidMount() {
    const service: UserService = new UserService()
    const hasSession: string = await AsyncStorage.getItem('isLogged')
    if (hasSession === 'true') {
      service.me()
        .then(() => {
          Actions.replace('main');
        })
        .catch(async () => {
          const emailAddress: string = await AsyncStorage.getItem('emailAddress')
          const password: string = await AsyncStorage.getItem('password')
          service.login(emailAddress, Crypto.decrypt(emailAddress.split('@')[0], password))
            .then(() => { Actions.replace('main'); })
            .catch(() => { Actions.replace('login'); })
        })
    }
    else
      Actions.replace('login');
  }
  render() {
    return (
      <Container>
      </Container>
    );
  }
}
