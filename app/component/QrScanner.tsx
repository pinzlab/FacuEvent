import * as React from 'react';
import { Button, Icon } from 'native-base';
import * as Permissions from 'expo-permissions';
import { Actions } from 'react-native-router-flux';
import { color } from '../util/config'

export default class BarcodeScannerExample extends React.Component {
    public state: any = {
        hasCameraPermission: false,
    };


    private async getPermissions() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

        if (this.state.hasCameraPermission)
            Actions.registerAssistanceScreen()
        else
            alert('No tiene acceso de cámara para registrar asistencia.')
    }

    render() {

        return (
            <Button
                transparent
                onPress={() => this.getPermissions()}>
                <Icon name='qr-scanner' />
            </Button>
        );
    }
}
