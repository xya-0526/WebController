export interface CreateProduction {
    name: string
    desc: string
    image: string
}
export interface Production
    extends CreateProduction {
    id: number
    createTime: string
    status: number
}
export interface ProductionListRes {
    productions: Production[]
    totial: number
}
