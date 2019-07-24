import React from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Footer, FooterTab, Button, Icon } from 'native-base'
import { Body, Left, Right } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { color } from '../util/config'
import Logout from './Logout';


export default class DrawerContent extends React.Component {

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: color.primary }} />
                <Content>
                    <List>
                        <ListItem icon onPress={Actions.eventListScreen}>
                            <Left>
                                <Button transparent>
                                    <Icon style={{ color: color.secondary }} name="calendar" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Eventos</Text>
                            </Body>
                        </ListItem>

                        <ListItem icon onPress={Actions.assistedScreen}>
                            <Left>
                                <Button transparent>
                                    <Icon style={{ color: color.secondary }} name="reorder" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Asistidos</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <FooterTab style={{ backgroundColor: 'transparent' }}>
                        <Button onPress={Actions.settingsScreen}>
                            <Icon style={{ color: color.secondary }} name="settings" />
                        </Button>
                        <Logout />
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


