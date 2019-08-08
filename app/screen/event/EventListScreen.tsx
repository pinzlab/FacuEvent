import React from 'react';
import { StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';
import { Right, Body, Icon, Button, Text } from 'native-base';
import { Card, CardItem, Spinner } from 'native-base';
import EventService from '../../service/EventService';
import QrScanner from '../../component/QrScanner'
import { color } from '../../util/config';


export default class EventListScreen extends React.Component {

    public events: any = [];

    public state: any = {
        // state of charge of events
        isLoading: true
    }

    componentDidMount() {
        let service: EventService = new EventService()
        service.getAll()
            .then((res: any) => {
                this.events = res
                this.setState({
                    isLoading: false,
                }, () => {
                    this.state.isLoading = false;
                });
            })
            .catch((err: any) => {
                console.error(err);
            });
    }



    render() {
        let eventsListView: any = [];
        this.events.forEach((event: any, index: number) => {
            eventsListView.push(
                <Card key={index} >
                    <CardItem cardBody>
                        <Image source={{ uri: event.image }} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Body style={{ minWidth: 250 }}>
                            <Text>{event.name} </Text>
                            <Text note>{event.description}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => { Actions.eventScreen({ id: event.id }); }}>
                                <Icon style={{ color: color.secondary }} active name="eye" />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            )
        })

        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            {eventsListView}


                        </Content>
                        )
                        : (
                            <Content>
                                <Spinner />
                            </Content>
                        )
                }
                <QrScanner />
                <StatusBar hidden />
            </Container>
        );
    }
}
