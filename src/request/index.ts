import axios, {
    AxiosError
} from 'axios'
import { StatusCodeHandler } from './Httpstatus'
import { TokenSrivce } from '@/uilts'
const request = axios.create({
    baseURL: import.meta.env
        .VITE_API_BASE_URL,
    timeout: 5000
})
request.interceptors.request.use(
    (config) => {
        const token =
            new TokenSrivce().GetToken()
        if (token)
            config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        throw new AxiosError(error)
    }
)
request.interceptors.response.use(
    (config) => {
        const statusHandler =
            new StatusCodeHandler()
        const { code } = config.data
        const message =
            config.data.message
        Object.assign(
            config.data,
            statusHandler.handle(
                config.status,
                code
            )
        )
        if (message)
            config.data.message =
                message
        return config
    },
    (error) => {
        const statusHandler =
            new StatusCodeHandler()
        statusHandler.handle(
            error.status
        )
        console.log(
            statusHandler.handle(
                error.status
            )
        )
        const message =
            error.response.data
                .message ||
            statusHandler.handle(
                error.status
            ).message ||
            error.message ||
            '未知错误'
        // alert(message)
        throw new AxiosError(error)
    }
)
export default request
