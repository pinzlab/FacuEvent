import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { View, Right, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import EventService from '../../service/EventService';
import AssistedService from '../../service/AssistedService';


export default class RegisterAssistanceScreen extends React.Component {

    public state: any = {
        scanned: false,
    };




    private handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.registerAssistance(Number(data))

    };

    private async  registerAssistance(eventId: number) {
        const service: AssistedService = new AssistedService()
        await service.registerAssistance(eventId)
            .then((res: any) => {
                if (res.saved)
                    alert(`La asistencia al evento ha sido registrada.`)
            })
            .catch(() => alert('No se pudo registrar la asistencia, por favor intente de nuevo.'))
            .finally(() => Actions.pop())
    }

    render() {
        const { scanned } = this.state;

        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.bottomBar}>
                    <Right>
                        <TouchableOpacity
                            onPress={() => Actions.pop()}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </Right>
                </View>
                <StatusBar hidden />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
});