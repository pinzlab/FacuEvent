import React from 'react';
import { Rating } from 'react-native-ratings';
import { Actions } from 'react-native-router-flux';
import { Container, Content, View, Right } from 'native-base';
import { Body, Left, Text, Spinner, Button } from 'native-base';
import { Thumbnail, List, ListItem, Icon } from 'native-base';
import Inexistente from '../../component/Inexistente'
import AssistedService from '../../service/AssistedService';
import { color } from '../../util/config';


export default class AssistedScreen extends React.Component {

    private assisteds: any[] = []
    public state: any = {
        isLoading: true
    }

    componentDidMount() {
        let service: AssistedService = new AssistedService()
        service.getAssistedEvents()
            .then((res: any) => {
                this.assisteds = res
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

    private async updateScore(assistantId: number, score: number) {
        const service: AssistedService = new AssistedService()
        await service.updateScore(assistantId, score)
    }



    render() {
        let list: any = [];
        if (this.assisteds !== undefined)
            this.assisteds.forEach((assisted: any, index: number) => {
                let event = assisted.event;
                list.push(
                    <ListItem key={index} avatar>
                        <Left>
                            <Thumbnail square source={{ uri: event.image }} />
                        </Left>
                        <Body >
                            <Text>{event.name}</Text>
                            <Text note>{event.eventDate}</Text>
                            <View style={{ alignItems: 'flex-start', marginTop: 15 }}>
                                <Rating

                                    startingValue={assisted.score}
                                    imageSize={25}
                                    onFinishRating={(score) => this.updateScore(assisted.id, score)}
                                />
                            </View>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => { Actions.eventScreen({ id: event.id }); }}>
                                <Icon name="eye" style={{ color: color.secondary }} />
                            </Button>
                        </Right>
                    </ListItem>


                )
            })
        return (

            <Container>
                {
                    !this.state.isLoading
                        ? ((list.length > 0)
                            ? <Content><List>{list}</List></Content>
                            : <Inexistente title="No hay asistencias"/>
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
