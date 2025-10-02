export interface User {
    name?: string | undefined
    phoneNumber: string
    passWord?: string
    avatar?: string | undefined // 新增头像字段（存图片 base64 或 url）
    token?: string | undefined | null
    email?: string
}
export interface PassWord {
    passWord: string
    newPassword: string
}
