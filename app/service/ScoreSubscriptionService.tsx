import { serverUrl } from '../util/config'
import { AsyncStorage } from 'react-native';

export default class ScoreSubscriptionService {
    private async loadCookies() {
        return await AsyncStorage.getItem('cookies');
    }

    public async getSubscribedActivities() {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/subscription/activity/logged`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }


    public async subscribe(activityId: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/subscribe/activity/${activityId}`, {
            headers,
            method: 'POST',
            //body: JSON.stringify({ score })
        })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async score(activityId: number, score: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/score/activity/${activityId}`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ score })
        })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async hasSubscription(activityId: number) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/hasubscription/activity/${activityId}`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}