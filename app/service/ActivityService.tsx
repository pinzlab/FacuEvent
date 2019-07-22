import { serverUrl } from '../util/config'

export default class ActivityService {

    public async getById(id: number) {
        return await fetch(`${serverUrl}/api/v1/activity/${id}`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}