import React from 'react';
import { Button, Text } from 'native-base';
import ScoreSubscriptionService from '../service/ScoreSubscriptionService';
import { color } from '../util/config';

export default class Subcription extends React.Component {
  public props: any;

  public state: any = {}

  async componentDidMount() {
    let service: ScoreSubscriptionService = new ScoreSubscriptionService()
    service.hasSubscription(this.props.activity)
      .then((res: any) => {
        this.setState({ hasSubscription: res.subscribed })
      })
      .catch((err: any) => console.log(err))
  }

  private async subscribe() {
    let service: ScoreSubscriptionService = new ScoreSubscriptionService()
    await service.subscribe(this.props.activity)
      .then((res: any) => {
        this.setState({ hasSubscription: res.subscribed })
        this.props.onPress();
      })
      .catch((err: any) => console.log(err))
  }
  render() {
    return (
      <Button
        onPress={() => this.subscribe()}
        disabled={this.props.disabled}
        full style={{
          backgroundColor: (this.state.hasSubscription) ? color.grey : color.primary,
          marginHorizontal: 10,
          marginVertical: 50
        }}>
        <Text> {(this.state.hasSubscription) ? 'Retirarse' : 'Inscribirme'}</Text>
      </Button>
    );
  }
}
