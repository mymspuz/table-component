import {ISetSort, TStatus, TStatusColor} from './index'

export function getColor(status: TStatus): TStatusColor {
    switch (status) {
        case 'green':
            return 'success'
        case 'yellow':
            return 'warning'
        case 'red':
            return 'danger'
    }
}

export function formatPrice(price: number): string {
    return `${price}`.split('').reverse().map((el, index) => index % 3 !== 2 ? el : ` ${el}`).reverse().join('')
}

export function byField(setSort: ISetSort): any {
    switch (setSort.direction) {
        case 'asc':
            return (a: any, b: any) => a[setSort.field] > b[setSort.field] ? 1 : -1
        case 'desc':
            return (a: any, b: any) => a[setSort.field] > b[setSort.field] ? -1 : 1
    }
}
