import React from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { color } from '../util/config'


export default class TabsContent extends React.Component {

  public state: any = {
    tab: 'tab1'
  }
  private changeTab(tab: string): void {
    switch (tab) {
      case 'tab1':
        if (this.state.tab !== 'tab1') {
          this.setState({ tab: 'tab1' })
          Actions.eventListScreen()
        }
        break;
      case 'tab2':
        if (this.state.tab !== 'tab2') {
          this.setState({ tab: 'tab2' })
          Actions.assistedScreen()
        }
        break;
      case 'tab3':
        if (this.state.tab !== 'tab3') {
          this.setState({ tab: 'tab3' })
          Actions.settingsScreen()
        }
        break;
    }
  }
  render() {
    return (
      <Footer style={{ borderTopWidth: .5, borderColor: color.grey }}>
        <FooterTab style={{ backgroundColor: 'white' }} >
          <Button onPress={() => this.changeTab('tab1')} transparent >
            <Icon name="home" style={{ color: (this.state.tab === 'tab1') ? color.primary : 'grey' }} />
          </Button>
          <Button onPress={() => this.changeTab('tab2')} transparent >
            <Icon name="bookmarks" style={{ color: (this.state.tab === 'tab2') ? color.primary : 'grey' }} />
          </Button>
          <Button onPress={() => this.changeTab('tab3')} transparent  >
            <Icon name="contact" style={{ color: (this.state.tab === 'tab3') ? color.primary : 'grey' }} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}


