import React from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Footer, FooterTab, Button, Icon } from 'native-base'
import { Body, Left, Right } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { color } from '../util/config'


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
                                    <Icon name="calendar" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Eventos</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <FooterTab style={{ backgroundColor: 'transparent' }}>
                        <Button onPress={Actions.settingsScreen}>
                            <Icon name="settings" />
                        </Button>
                        <Button>
                            <Icon name="exit" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


