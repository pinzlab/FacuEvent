import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Thumbnail } from 'native-base';

export default class Authentication extends React.Component {
  async componentDidMount() {
    let hasSession: string = await AsyncStorage.getItem('isLogged')
    if (hasSession === 'true')
      Actions.replace('main');
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
