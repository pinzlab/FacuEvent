import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Body, Right, Title, Subtitle, Button, Icon } from 'native-base';
import { color } from '../util/config';

export default class HeaderComponent extends React.Component {
  public props: any;
  render() {
    return (
      <Header style={{ backgroundColor: color.primary }}>
        <Left>
          <Button transparent onPress={() => { Actions.pop() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          {(this.props.title) ? <Title>{this.props.title}</Title> : null}
          {(this.props.subtitle) ? <Subtitle>{this.props.subtitle}</Subtitle> : null}

        </Body>
        <Right />
      </Header>
    );
  }
}
