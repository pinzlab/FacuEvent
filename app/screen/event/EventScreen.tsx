import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';
import { Left, Right, Body, Icon, Button, Text } from 'native-base';
import { Card, CardItem, Spinner, List, ListItem } from 'native-base';
import { EventService } from '../../service/EventService';
import { color } from '../../util/config';


export default class EventScreen extends React.Component {

    public event: any;

    public state: any = {
        // state of charge of events
        isLoading: true
    }

    componentDidMount() {
        let service: EventService = new EventService()
        service.getById(1)
            .then((res: any) => {
                this.event = res.event
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
        let activitiesListView: any = [];
        if (this.event !== undefined)
            this.event.activities.forEach((activity: any, index: number) => {
                activitiesListView.push(
                    <ListItem key={index} onPress={() => { console.log(activity.name) }}>
                        <Body><Text>{activity.name}</Text></Body>
                        <Right><Icon name='arrow-forward' /></Right>
                    </ListItem>
                )
            })

        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <Card transparent>
                                <CardItem cardBody>
                                    <Image source={{ uri: this.event.image }} style={{ height: 250, width: null, flex: 1 }} />
                                </CardItem>
                            </Card>
                            <List>
                                <ListItem itemHeader first>
                                    <Text>{this.event.name.toUpperCase()}</Text>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Descripción</Text>
                                        <Text note>{this.event.description}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Fecha del Evento</Text>
                                        <Text note>{this.event.eventDate}</Text>
                                    </Body>
                                </ListItem>
                                {(this.event.activities.length > 0) ? (
                                    <ListItem itemHeader first>
                                        <Text>ACTIVIDADES</Text>
                                    </ListItem>
                                ) : null}
                                {activitiesListView}
                            </List>
                        </Content>
                        )
                        : (
                            <Content>
                                <Spinner />
                            </Content>
                        )
                }

            </Container>
        );
    }
}
