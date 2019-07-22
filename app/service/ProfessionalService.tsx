import { serverUrl } from '../util/config'

export default class ProfessionalService {

    public async getById(id: number) {
        return await fetch(`${serverUrl}/api/v1/professional/${id}`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }


}