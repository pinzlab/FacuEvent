import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ListItem, Left, Body, Button, Text, Icon } from 'native-base';
import UserService from '../service/UserService'
import { color } from '../util/config'
export default class Logout extends React.Component {
  private async logout() {
    const service: UserService = new UserService()
    service.logout()
      .then(() => {
        Actions.replace('login');
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  render() {
    return (
      <ListItem icon style={{ marginTop: 50 }} onPress={() => this.logout()}>
        <Left>
          <Button transparent>
            <Icon style={{ color: color.primary, fontSize: 30 }} name="exit" />
          </Button>
        </Left>
        <Body>
          <Text>Salir</Text>
          <Text note>Cerrar session</Text>
        </Body>
      </ListItem>
    );
  }
}
