import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import { Container, Content } from 'native-base';
import { Right, Body, Icon, Text, Spinner } from 'native-base';
import { List, ListItem } from 'native-base';
import ActivityService from '../../service/ActivityService';
import ToolBar from '../../component/ToolBar'
import Subscription from '../../component/Subcription'
import ScoreSubscriptionService from '../../service/ScoreSubscriptionService';


export default class ActivityListScreen extends React.Component {

    public elements: any[] = []
    public state: any = {
        isLoading: true
    }

    async componentDidMount() {
        await this.loadData()
            .then(() => this.setState({ isLoading: false }))
    }


    private async loadData() {
        let service: ScoreSubscriptionService = new ScoreSubscriptionService()
        await service.getSubscribedActivities()
            .then((res: any) => {
                //this.setState({ activity: res.activity })
                this.elements = res.subscribed
            })
            .catch((err: any) => {
                console.log(err);
            })
            .finally(() => this.setState({ isLoading: true }))
    }

    private updateScore(activityId: number, score: number) {
        console.log(`actividad: ${activityId}, score: ${score} `)
        const service: ScoreSubscriptionService = new ScoreSubscriptionService()
        service.score(activityId, score)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
    }

    render() {
        let list: any[] = []
        this.elements.forEach((element: any, index: number) => {
            list.push(
                <ListItem key={index}>
                    <Body>
                        <Text>{element.activity.event.name}</Text>
                        <Text note>{element.activity.name}</Text>
                    </Body>
                    <Right>
                        <Rating
                            startingValue={element.note}
                            imageSize={25}
                            onFinishRating={(score) => this.updateScore(element.activity.id, score)}
                        />
                    </Right>
                </ListItem>
            )
        });
        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <List>
                                {list}
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
