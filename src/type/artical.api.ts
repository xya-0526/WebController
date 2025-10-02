export interface CreateArtical {
    title: string
    content: string
    category: string
}
export interface Artical
    extends CreateArtical {
    id: number
    createTime: string
    status: number
}
export interface ArticalListRes {
    articals: Artical[]
    totial: number
}
