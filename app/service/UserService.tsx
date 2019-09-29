import { AsyncStorage } from 'react-native'
import { serverUrl } from '../util/config'


export default class UserService {

    private async loadCookies() {
        return await AsyncStorage.getItem('cookies');
    }

    public async login(emailAddress: string, password: string) {
        return await fetch(`${serverUrl}/api/v1/account/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailAddress,
                password
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

        return await fetch(`${serverUrl}/api/v1/user/signup`, {
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
        await AsyncStorage.removeItem('cookies')
        const headers: any = await JSON.parse(await this.loadCookies())

        return await fetch(`${serverUrl}/api/v1/account/logout`, {
            method: 'PUT',
            headers
        })
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

    public async updateAvatar(avatar: any) {
        const headers: any = await JSON.parse(await this.loadCookies())
        headers['Content-Type'] = 'multipart/form-data'
        return await fetch(`${serverUrl}/file/image/user`, {
            headers,
            method: 'PUT',
            body: avatar
        })
            .then((res: any) => {
                return res.json()
            })
            .then((res: any) => { return res })
    }

    public async me() {

        const headers: any = await JSON.parse(await this.loadCookies())

        return await fetch(`${serverUrl}/api/v1/account/me`, { headers })
            .then((res: any) => res.json())
            .then((res: any) => { return res })


    }

    public async resetPassToken(emailAddress: string) {
        return await fetch(`${serverUrl}/api/v1/account/password/reset/token`, {
            method: 'POST',
            body: JSON.stringify({ emailAddress })
        })
            .then((res: any) => { return (res.status === 200) ? { sent: true } : { sent: false } })
            .then((res: any) => { return res })
    }

    public async resetPass(token: string, password: string) {
        return await fetch(`${serverUrl}/api/v1/account/password/reset`, {
            method: 'POST',
            body: JSON.stringify({ token, password })
        })
            .then(async (res: any) => {
                let response: any = {}
                switch (res.status) {
                    case 200:
                        response.status = 200
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

                        break;
                    default:
                        response.status = 403
                        break;
                }
                return response
            })
            .then((res: any) => { return res })
    }
}