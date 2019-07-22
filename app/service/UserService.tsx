import { AsyncStorage } from 'react-native';
import { serverUrl } from '../util/config'
import { Body } from 'native-base';

export default class UserService {

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

    public async me() {
        try {
            const cookies: string = await AsyncStorage.getItem('cookies');
            if (cookies !== null)
                return await fetch(`${serverUrl}/api/v1/account/me`, { headers: JSON.parse(cookies) })
                    .then((res: any) => res.json())
                    .then((res: any) => { return res })
        } catch (error) {
            console.log(' Error retrieving data')
        }

    }
}