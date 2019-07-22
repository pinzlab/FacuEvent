import React from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { color } from '../util/config'


export default class DrawerContent extends React.Component {

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: color.primary }} />
                <Content>
                    <List>
                        <ListItem onPress={Actions.eventListScreen}><Text>Eventos</Text></ListItem>
                        <ListItem onPress={Actions.eventListScreen}><Text>Asistencias</Text></ListItem>
                        <ListItem onPress={Actions.eventListScreen}><Text>Subscripciones</Text></ListItem>
                        <ListItem onPress={Actions.eventListScreen}><Text>Carrera</Text></ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}


