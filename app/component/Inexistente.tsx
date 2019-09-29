import React from 'react'
import { StyleSheet } from 'react-native'
import { Thumbnail, View, Text } from 'native-base'
export default class Inexistente extends React.Component {

  public props: any;
  render() {
    return (
      <View style={style.container}>
        <Thumbnail
          style={{ alignSelf: 'center', width: 150, height: 150 }}
          source={require('../../assets/icon_light.png')} />
        <Text style={style.title}>{this.props.title}</Text>
      </View>

    );
  }
}




const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ECECEC',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
});