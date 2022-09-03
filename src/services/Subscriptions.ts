import { useUser } from '@/lib/gun/useUser'
import Logger from '@/utils/Logger'

const user = useUser()
const logger = new Logger('Subscriptions')

export function channelSubscribe(claimId: string, following: boolean) {
    user
    .get('subscriptions')
    .put(claimId)
    .get(claimId)
    .put(following, (ack: any) => {
        logger.log(ack)
    })
}

export function getSubscription(claimId: string) {
    return user
        .get('subscriptions')
        .get(claimId)
        .then()
}

export async function getAllSubscriptions() {

    const subscriptions = new Promise<string[]>((resolve) => {
        let subsArr: string[] = []

        user
        .get('subscriptions')
        .map()
        .once((data: any, key: any) => {
            if (key !== '_') {
                subsArr.push(key)
            }
        })

        setTimeout(() => {
            resolve(subsArr)
        }, 100)  // How much should this even be !???
    })

    return subscriptions
}