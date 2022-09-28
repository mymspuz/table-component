import { IData } from '../share'

export async function getData(): Promise<IData[]> {
    return new Promise<IData[]>((resolve, reject) => {
        const result: IData[] = [
            {id: 1, name: 'Pyshky.net', status: 'green', type: 'TRST', conditions: 'x 2,6 months', volume: 120000, roi: 4, free: 20, hedge: 20},
            {id: 2, name: 'NFT-Flowershop', status: 'yellow', type: 'THT', conditions: 'x 4,2 years', volume: 80000, roi: 23, free: 12, hedge: 0},
            {id: 3, name: 'Tokenhunt.club', status: 'green', type: 'THC', conditions: 'x 2,1 year', volume: 120000, roi: 23, free: 2, hedge: 20},
            {id: 4, name: 'Web3 P2P University', status: 'red', type: 'TRST', conditions: 'x 2,1 year', volume: 200000, roi: 6, free: 1, hedge: 0}
        ]
        resolve(result)
    })
}