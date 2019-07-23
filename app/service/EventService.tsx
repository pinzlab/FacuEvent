import { serverUrl } from '../util/config'
import { AsyncStorage } from 'react-native';
export default class EventService {

    private async loadCookies() {
        return await AsyncStorage.getItem('cookies');
    }

    public async getAll() {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/events`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async getById(id: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/event/${id}`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async getByQrCode(qrCode: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/event/qr/${qrCode}`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}