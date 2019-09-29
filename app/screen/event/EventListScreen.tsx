import React from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Image } from 'react-native'
import { Container, Content } from 'native-base'
import { Right, Body, Text, Thumbnail } from 'native-base'
import { Card, CardItem, Spinner, Header, Left, Title } from 'native-base'
import EventService from '../../service/EventService'
import QrScanner from '../../component/QrScanner'
import Inexistente from '../../component/Inexistente'
import { color } from '../../util/config'


export default class EventListScreen extends React.Component {

    public events: any = []

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
        let list: any = []
        this.events.forEach((event: any, index: number) => {
            list.push(
                <Card key={index} >
                    <TouchableOpacity onPress={() => { Actions.eventScreen({ id: event.id }); }}>
                        <CardItem cardBody>
                            <Image source={{ uri: event.image }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Body style={{ minWidth: 250 }}>
                                <Text>{event.name} </Text>
                                <Text note>{event.description}</Text>
                            </Body>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
            )
        })

        return (
            <Container>
                <Header style={{ backgroundColor: color.primary }}>
                    <Left>
                        <Thumbnail style={{ width: 48, height: 48 }}
                            source={require('../../../assets/icon.png')} />
                    </Left>
                    <Body>
                        <Title>FacuEvent</Title>
                    </Body>
                    <Right>
                        <QrScanner />
                    </Right>
                </Header>
                {
                    !this.state.isLoading
                        ? ((list.length > 0)
                            ? <Content>{list}</Content>
                            : <Inexistente title="No hay eventos" />
                        )
                        : (
                            <Content>
                                <Spinner />
                            </Content>
                        )
                }

                <StatusBar hidden />
            </Container>
        );
    }
}
