import { AsyncStorage } from 'react-native';
import { serverUrl } from '../util/config'
import { Body } from 'native-base';

export default class UserService {

    private async loadCookies() {
        return await AsyncStorage.getItem('cookies');
    }

    public async login(emailAddress: string, password: string, rememberMe?: boolean) {

        return await fetch(`${serverUrl}/api/v1/entrance/login`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailAddress,
                password,
                rememberMe
            }),
        })
            .then(async (res: any) => {
                if (res.status === 200) {
                    try {
                        await AsyncStorage.setItem('isLogged', 'true')
                        await AsyncStorage.setItem('cookies', JSON.stringify({
                            Accept: 'application/json',
                            Connection: 'keep-alive',
                            ETag: res.headers.map.etag,
                            'Content-Type': 'application/json; charset=utf-8',
                            'Cache-Control': 'no-cache, no-store',
                            Cookie: res.headers.map['set-cookie']
                        }));
                    } catch (error) {
                        console.log('error')
                    }
                }
                return res.json()
            })
            .then((res: any) => { return res })

    }

    public async signup(lastName: string, firstName: string, emailAddress: string, password: string) {

        return await fetch(`${serverUrl}/api/v1/entrance/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                emailAddress,
                password
            }),
        })
            .then(async (res: any) => {
                if (res.status === 200) {
                    await AsyncStorage.setItem('isLogged', 'true')
                    await AsyncStorage.setItem('cookies', JSON.stringify({
                        Accept: 'application/json',
                        Connection: 'keep-alive',
                        ETag: res.headers.map.etag,
                        'Content-Type': 'application/json; charset=utf-8',
                        'Cache-Control': 'no-cache, no-store',
                        Cookie: res.headers.map['set-cookie']
                    }));
                }
                return res.json()
            })
            .then((res: any) => { return res })
    }

    public async logout() {
        await AsyncStorage.setItem('isLogged', 'false')
        return await AsyncStorage.removeItem('cookies')
    }

    public async updateProfile(lastName: string, firstName: string, telephone: string) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/account/update/profile`, {
            headers,
            method: 'PUT',
            body: JSON.stringify({
                lastName,
                firstName,
                telephone
            }),
        })
            .then((res: any) => {
                return (res.status === 200) ? { updated: true } : { updated: false }
            })
            .then((res: any) => { return res })
    }


    public async updatePassword(newPassword: string) {
        const headers: any = await JSON.parse(await this.loadCookies())
        return await fetch(`${serverUrl}/api/v1/account/update/password`, {
            headers,
            method: 'PUT',
            body: JSON.stringify({
                password: newPassword
            }),
        })
            .then((res: any) => {
                return (res.status === 200) ? { updated: true } : { updated: false }
            })
            .then((res: any) => { return res })
    }

    public async me() {

        const headers: any = await JSON.parse(await this.loadCookies())

        return await fetch(`${serverUrl}/api/v1/account/me`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })


    }
}