import React from 'react'
import { Actions } from 'react-native-router-flux'
import { StatusBar, StyleSheet } from 'react-native'
import { Thumbnail, View, Button, Text } from 'native-base'
import { color } from '../util/config'
export default class Welcome extends React.Component {


  render() {
    return (


      <View style={style.container}>
        <View>
          <Thumbnail
            style={{ alignSelf: 'center', width: 150, height: 150 }}
            source={require('../../assets/icon.png')} />
          <Text style={style.title}>FacuEvent</Text>
          <Text style={style.welcome}>Bienvenido</Text>
          <Button
            style={{ backgroundColor: 'white', paddingHorizontal: 25 }}
            onPress={() => { Actions.replace('main'); }}
            full
            rounded>
            <Text style={{ color: color.primary }}>Entrar</Text>
          </Button>
        </View>
        <View style={style.bottomBar}>
          <Text style={{ color: 'rgba(255,255,255,.75)' }}>  © 2019 Perdiz</Text>
        </View>
        <StatusBar hidden />
      </View>

    );
  }
}




const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  welcome: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 35,
    marginBottom: 50,
    fontSize: 40
  },
  title: {
    color: 'rgba(255,255,255,.75)',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
});