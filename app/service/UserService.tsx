import { serverUrl } from '../util/config'

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
            .then((res: any) => {
                console.log(res.headers.map)
                return res.json()
            })
            .then((res: any) => { return res })

    }

    public async me() {
        return await fetch(`${serverUrl}/api/v1/account/me`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}