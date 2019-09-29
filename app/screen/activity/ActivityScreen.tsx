import React from 'react'
import { Actions } from 'react-native-router-flux'
import { Container, Content } from 'native-base'
import { Right, Body, Icon, Text, Spinner } from 'native-base'
import { List, ListItem } from 'native-base'
import ActivityService from '../../service/ActivityService'
import ToolBar from '../../component/ToolBar'
import Subscription from '../../component/Subcription'


export default class ActivityScreen extends React.Component {

    public props: any
    public state: any = {
        // state of charge of events
        isLoading: true
    }

    async componentDidMount() {
        await this.loadData()
            .then(() => this.setState({ isLoading: false }))
    }


    private async loadData() {
        let service: ActivityService = new ActivityService()
        await service.getById(this.props.id)
            .then((res: any) => {
                this.setState({ activity: res })
            })
            .catch((err: any) => {
                console.log(err);
            });
    }


    render() {
        return (
            <Container>
                <ToolBar title="Actividad" />
                {
                    !this.state.isLoading
                        ? (<Content>
                            <List>
                                <ListItem itemHeader first>
                                    <Text>{this.state.activity.name.toUpperCase()}</Text>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Lugar</Text>
                                        <Text note>{this.state.activity.place}</Text>
                                    </Body>
                                </ListItem>
                                {(this.state.activity.professional) ? (
                                    <ListItem onPress={() => { Actions.professionalScreen({ id: this.state.activity.professional }) }}>
                                        <Body>
                                            <Text>Persona a Cargo</Text>
                                            <Text note>{this.state.activity.professional}</Text>
                                        </Body>
                                        <Right><Icon name='arrow-forward' /></Right>
                                    </ListItem>
                                ) : null}

                                <ListItem >
                                    <Body>
                                        <Text>Fecha</Text>
                                        <Text note>{this.state.activity.activityDate}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Hora de inicio</Text>
                                        <Text note>{this.state.activity.startTime}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Hora de cierre</Text>
                                        <Text note>{this.state.activity.finishTime}</Text>
                                    </Body>
                                </ListItem>
                                {(this.state.activity.requireInscription) ? (
                                    <ListItem >
                                        <Body>
                                            <Text>Cupos disponibles</Text>
                                            <Text note>{this.state.activity.quota - this.state.activity.registered}</Text>
                                        </Body>
                                    </ListItem>
                                ) : null}

                            </List>
                            {(this.state.activity.requireInscription) ? (
                                <Subscription
                                    activity={this.state.activity.id}
                                    disabled={!(this.state.activity.quota > 0)}
                                    onPress={() => { this.loadData() }}
                                />
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
