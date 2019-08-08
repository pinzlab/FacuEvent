import React from 'react';
import { Scene, Router, Drawer, Tabs } from 'react-native-router-flux';
import { StyleSheet } from 'react-native'
import { Container } from 'native-base';
import * as Font from 'expo-font'; //to include font from expo.
import Authentication from './app/component/Authentication'
import LoginScreen from './app/screen/user/LoginScreen'
import SignupScreen from './app/screen/user/SignupScreen'
import EventListScreen from './app/screen/event/EventListScreen'
import EventScreen from './app/screen/event/EventScreen'
import ActivityScreen from './app/screen/activity/ActivityScreen'
import ProfessionalScreen from './app/screen/professional/professionalScreen'
import { color } from './app/util/config'

import DrawerContent from './app/component/DrawerContent';
import TabsContent from './app/component/TabsContent';
import SettingsScreen from './app/screen/settings/SettingsScreen';
import EditProfileScreen from './app/screen/user/EditProfileScreen'
import EditPasswordScreen from './app/screen/user/EditPasswordScreen';
import AssistedScreen from './app/screen/assisted/AssistedScreen';
import RegisterAssistanceScreen from './app/screen/assisted/RegisterAssistanceScreen'





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
          <Router sceneStyle={{ backgroundColor: '#81b71a' }}>

            <Scene key="root" hideNavBar>

              {/*********************************************************************
              *                             Authentication                          *
              *********************************************************************/}

              <Scene key="auth" hideNavBar >
                <Scene key="authentication" component={Authentication} initial hideNavBar />
                <Scene key="login" component={LoginScreen} hideNavBar />
                <Scene key="signup" component={SignupScreen} hideNavBar />
              </Scene>


              {/*********************************************************************
              *                                TABS                                 *
              **********************************************************************/}

              <Scene hideNavBar key="main">
                <Tabs tabBarComponent={TabsContent} >
                  <Scene key='root'>
                    <Scene
                      hideNavBar
                      key="eventListScreen"
                      component={EventListScreen}
                    />

                    <Scene
                      hideNavBar
                      key="assistedScreen"
                      component={AssistedScreen}
                    />

                    <Scene
                      hideNavBar
                      key="settingsScreen"
                      component={SettingsScreen}
                    />
                  </Scene>
                </Tabs>


                {/*********************************************************************
              *                            Secondary Screens                        *
                *********************************************************************/}

                <Scene
                  hideNavBar
                  key="registerAssistanceScreen"
                  component={RegisterAssistanceScreen}
                />

                <Scene
                  key="eventScreen"
                  component={EventScreen}
                />

                <Scene
                  key="activityScreen"
                  component={ActivityScreen}
                />

                <Scene
                  key="professionalScreen"
                  component={ProfessionalScreen}
                />

                <Scene
                  key="editProfileScreen"
                  component={EditProfileScreen}
                />

                <Scene
                  key="editPasswordScreen"
                  component={EditPasswordScreen}
                />

              </Scene>



            </Scene>
          </Router>
        ) : null}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});
