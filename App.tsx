import React from 'react';
import { Container } from 'native-base';
import * as Font from 'expo-font'; //to include font from expo.
import LoginScreen from './app/screen/user/LoginScreen'
import SignupScreen from './app/screen/user/SignupScreen'
import HomeScreen from './app/screen/home/HomeScreen'
import EventListScreen from './app/screen/event/EventListScreen'
export default class App extends React.Component {
  //checking state for if font is loaded or not.
  public state: any = {
    isReady: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    //Setting the state to true when font is loaded.
    this.setState({ isReady: true });
  }
  render() {
    return (
      <Container>
        {this.state.isReady ? (
          <EventListScreen />
        ) : null}
      </Container>
    );
  }
}
