import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button } from 'native-base';
import { Right, Body, Icon, Text, Spinner } from 'native-base';
import { Card, CardItem, List, ListItem } from 'native-base';
import ActivityService from '../../service/ActivityService';
import { color } from '../../util/config';


export default class ActivityScreen extends React.Component {

    public activity: any;
    public props: any
    public state: any = {
        // state of charge of events
        isLoading: true
    }

    componentDidMount() {
        let service: ActivityService = new ActivityService()
        service.getById(this.props.id)
            .then((res: any) => {
                this.activity = res.activity
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
        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <List>
                                <ListItem itemHeader first>
                                    <Text>{this.activity.name.toUpperCase()}</Text>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Lugar</Text>
                                        <Text note>{this.activity.place}</Text>
                                    </Body>
                                </ListItem>
                                {(this.activity.inCharge) ? (
                                    <ListItem onPress={() => { Actions.professionalScreen({ id: this.activity.inCharge.id }) }}>
                                        <Body>
                                            <Text>Persona a Cargo</Text>
                                            <Text note>{this.activity.inCharge.lastName} {this.activity.inCharge.firstName}</Text>
                                        </Body>
                                        <Right><Icon name='arrow-forward' /></Right>
                                    </ListItem>
                                ) : null}

                                <ListItem >
                                    <Body>
                                        <Text>Hora de inicio</Text>
                                        <Text note>{this.activity.startTime}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Hora de cierre</Text>
                                        <Text note>{this.activity.finishTime}</Text>
                                    </Body>
                                </ListItem>
                                {(this.activity.requireInscription) ? (
                                    <ListItem >
                                        <Body>
                                            <Text>Cupos disponibles</Text>
                                            <Text note>{this.activity.quota}</Text>
                                        </Body>
                                    </ListItem>
                                ) : null}

                            </List>
                            {(this.activity.requireInscription) ? (
                                <Button
                                    onPress={() => { console.log(`Suscribirse: "${this.activity.name}"`) }}
                                    disabled={!(this.activity.quota > 0)}
                                    full style={{
                                        backgroundColor: color.secondary,
                                        marginHorizontal: 10,
                                        marginVertical: 50
                                    }}><Text>Inscribirme</Text></Button>
                            ) : null}
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
