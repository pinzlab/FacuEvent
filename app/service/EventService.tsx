import { serverUrl } from '../util/config'

export class EventService {
    public async getAll() {
        return await fetch(`${serverUrl}/api/v1/events`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async getById(id: number) {
        return await fetch(`${serverUrl}/api/v1/event/${id}`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }

    public async getByQrCode(qrCode: number) {
        return await fetch(`${serverUrl}/api/v1/event/qr/${qrCode}`)
            .then((res: any) => res.json())
            .then((res: any) => { return res })

    }
}