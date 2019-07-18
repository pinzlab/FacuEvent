import React from 'react';
import { Container } from 'native-base';
import * as Font from 'expo-font'; //to include font from expo.
import { LoginScreen } from './app/screen/user/LoginScreen'
import { SignupScreen } from './app/screen/user/SignupScreen'
export default class App extends React.Component {
  //checking state for if font is loaded or not.
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <Container>
        {this.state.fontLoaded ? (

          <LoginScreen/>
        ) : null}
      </Container>
    );
  }
}
