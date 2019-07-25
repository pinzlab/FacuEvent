import { serverUrl } from '../util/config'
import { AsyncStorage } from 'react-native';

export default class AssistedService {
    private async loadCookies() {
        return await AsyncStorage.getItem('cookies');
    }

    public async getAssistedEvents() {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/assistant/from/logged`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async updateScore(assistantId: number, score: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/assistant/${assistantId}/event/score`, {
            headers,
            method: 'PUT',
            body: JSON.stringify({ score })
        })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async registerAssistance(eventId: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/assistant`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ eventId })
        })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}