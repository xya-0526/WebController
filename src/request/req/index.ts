import request from '../index'
import {
    TokenSrivce,
    userService
} from '@/uilts'
import type {
    PassWord,
    User
} from '@/type/auth.api/auth.api'
import { userStore } from '@/store/user.store'
import type {
    ArticalListRes,
    CreateArtical
} from '@/type/artical.api'
import type {
    CreateProduction,
    Production,
    ProductionListRes
} from '@/type/production.api'
// 上传头像并注册
export const applyReq = async (
    body: User,
    file: File
) => {
    try {
        const formData = new FormData()
        formData.append('avatar', file) // file 是你要上传的文件
        // formData.append('username', 'xya'); // 也可以追加其他字段
        const res = await request.post(
            '/upload/avatar',
            formData,
            {
                headers: {
                    'Content-Type':
                        'multipart/form-data'
                }
            }
        )
        body.avatar =
            res.data.avatar_url
        const auth = await request.post(
            '/auth/apply',
            body
        )
        alert(auth.data.message)
        return auth.data
    } catch (e) {
        throw new Error(e)
    }
}
//登录
export const login = async (
    body: User
) => {
    const store = userStore()
    const userservice =
        new userService()
    try {
        const res = await request.post(
            '/auth/login',
            body
        )
        if (res.data.token)
            new TokenSrivce().SetToken(
                res.data.token
            )
        store.user.name =
            res.data.user.name
        store.user.avatar =
            res.data.user.avatar.avatar
        store.user.phoneNumber =
            res.data.user.phoneNumber
        userservice.setUserInof({
            name: res.data.user.name,
            avatar: res.data.user.avatar
                .avatar,
            phoneNumber:
                res.data.user
                    .phoneNumber,
            email: res.data.user.email
        })
        alert(res.data.message)
        return true
    } catch (e) {
        throw new Error(e)
    }
}
//更新用户信息
export const updataUser = async (
    body: User,
    file?: File
) => {
    try {
        if (file) {
            const formData =
                new FormData()
            formData.append(
                'avatar',
                file
            ) // file 是你要上传的文件
            // formData.append('username', 'xya'); // 也可以追加其他字段
            const res1 =
                await request.post(
                    '/upload/avatar',
                    formData,
                    {
                        headers: {
                            'Content-Type':
                                'multipart/form-data'
                        }
                    }
                )
            body.avatar =
                res1.data.avatar_url
        }
        const res = await request.patch(
            '/user/updata',
            body
        )
        new userService().setUserInof(
            body
        )
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
//修改用户密码
export const ChangePassword = async (
    body: PassWord
) => {
    try {
        const res = await request.patch(
            '/user/changePassword',
            body
        )
        return res.data
    } catch (e) {}
}
//获取文章列表
export const getArticalList = async (
    page: number | null = 1,
    size: number | null = 5
): Promise<ArticalListRes> => {
    try {
        const res = await request.get(
            `/artical/list?page=${page}&size=${size}`
        )
        console.log(res.data)
        return {
            articals: res.data.articals,
            totial: res.data.totial
        }
    } catch (e) {
        throw new Error(e)
    }
}
//创建文章
export const createAritical = async (
    body: CreateArtical
) => {
    try {
        const res = await request.post(
            '/artical/create',
            body
        )
        console.log(res)
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
//更新文章
export const updateArtical = async (
    id: string,
    body: CreateArtical
) => {
    try {
        const res = await request.patch(
            `/artical/update/${id}`,
            body
        )
        console.log(res)
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
//删除文章
export const DeleteArtical = async (
    id: number
) => {
    try {
        const res =
            await request.delete(
                `artical/delete/${id}`
            )
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
//创建产品
export const createProduct = async (
    body: CreateProduction,
    file: File
) => {
    try {
        const formData = new FormData()
        formData.append(
            'productImage',
            file
        ) // file 是你要上传的文件
        // formData.append('username', 'xya'); // 也可以追加其他字段
        const res = await request.post(
            '/upload/productImage',
            formData,
            {
                headers: {
                    'Content-Type':
                        'multipart/form-data'
                }
            }
        )
        body.image = res.data.avatar_url
        const auth = await request.post(
            '/production/create',
            body
        )
        alert(auth.data.message)
        return auth.data
    } catch (e) {
        throw new Error(e)
    }
}
//获取产品列表
export const getProductionlList =
    async (
        page: number | null = 1,
        size: number | null = 5
    ): Promise<ProductionListRes> => {
        try {
            const res =
                await request.get(
                    `/production/list?page=${page}&size=${size}`
                )
            console.log(res.data)
            return {
                productions:
                    res.data
                        .productions,
                totial: res.data.totial
            }
        } catch (e) {
            throw new Error(e)
        }
    }
export const updateProduction = async (
    id: string,
    body: CreateProduction,
    file?: File
) => {
    try {
        if (file) {
            const formData =
                new FormData()
            formData.append(
                'productImage',
                file
            ) // file 是你要上传的文件
            // formData.append('username', 'xya'); // 也可以追加其他字段
            const res =
                await request.post(
                    '/upload/productImage',
                    formData,
                    {
                        headers: {
                            'Content-Type':
                                'multipart/form-data'
                        }
                    }
                )
            body.image =
                res.data.avatar_url
        }
        const res = await request.patch(
            `/production/update/${id}`,
            body
        )
        alert(res.data.message)
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
//删除产品
export const DeleteProduction = async (
    id: number
) => {
    try {
        const res =
            await request.delete(
                `/production/delete/${id}`
            )
        return res.data
    } catch (e) {
        throw new Error(e)
    }
}
