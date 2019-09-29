import React from 'react'
import { Actions } from 'react-native-router-flux'
import { Image } from 'react-native'
import { Container, Content } from 'native-base'
import { Right, Body, Icon, Text, Spinner } from 'native-base'
import { Card, CardItem, List, ListItem } from 'native-base'
import ToolBar from '../../component/ToolBar'
import EventService from '../../service/EventService'


export default class EventScreen extends React.Component {

    public event: any;
    public props: any
    public state: any = {
        isLoading: true
    }

    componentDidMount() {
        let service: EventService = new EventService()
        service.getById(this.props.id)
            .then((res: any) => {
                this.event = res
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
        let activitiesListView: any = []
        if (this.event !== undefined)
            this.event.activities.forEach((activity: any, index: number) => {
                activitiesListView.push(
                    <ListItem key={index} onPress={() => { Actions.activityScreen({ id: activity.id }) }}>
                        <Body><Text>{activity.name}</Text></Body>
                        <Right><Icon name='arrow-forward' /></Right>
                    </ListItem>
                )
            })

        return (
            <Container>
                <ToolBar title="Evento"  />
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
                                        <Text>Lugar de concentración</Text>
                                        <Text note>{this.event.place}</Text>
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
