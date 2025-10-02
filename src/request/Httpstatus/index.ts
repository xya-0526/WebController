export enum HttpStatusCode {
    // 成功
    OK = 200, // 请求成功
    CREATED = 201, // 资源创建成功
    NO_CONTENT = 204, // 请求成功但无返回内容
    // 客户端错误
    BAD_REQUEST = 400, // 请求参数错误
    UNAUTHORIZED = 401, // 未授权（token无效/过期）
    FORBIDDEN = 403, // 权限不足
    NOT_FOUND = 404, // 资源不存在
    METHOD_NOT_ALLOWED = 405, // 请求方法不允许
    CONFLICT = 409, // 资源冲突（如重复创建）
    // 服务器错误
    INTERNAL_SERVER_ERROR = 500, // 服务器内部错误
    BAD_GATEWAY = 502, // 网关错误
    SERVICE_UNAVAILABLE = 503 // 服务不可用
}
export enum BusinessCode {
    // 通用成功
    SUCCESS = 0, // 业务处理成功（通常后端用0表示成功）
    // 认证相关
    TOKEN_EXPIRED = 1001, // token过期
    TOKEN_INVALID = 1002, // token无效
    NEED_LOGIN = 1003, // 需要登录
    // 用户相关
    USER_NOT_FOUND = 2001, // 用户不存在
    USERNAME_EXIST = 2002, // 用户名已存在
    PASSWORD_ERROR = 2003, // 密码错误
    // 业务逻辑相关
    PARAM_ERROR = 3001, // 业务参数错误
    RESOURCE_EXHAUSTED = 3002, // 资源耗尽
    OPERATION_FAILED = 3003, // 操作失败
    // 系统相关
    SYSTEM_ERROR = 5000, // 系统错误
    MAINTENANCE = 5001 // 系统维护中
}
const statusMessageMap = {
    // HTTP状态码消息
    [HttpStatusCode.OK]: '请求成功',
    [HttpStatusCode.CREATED]:
        '资源创建成功',
    [HttpStatusCode.NO_CONTENT]:
        '请求成功但无返回内容',
    [HttpStatusCode.BAD_REQUEST]:
        '请求参数错误',
    [HttpStatusCode.UNAUTHORIZED]:
        '未授权，请重新登录',
    [HttpStatusCode.FORBIDDEN]:
        '没有权限执行此操作',
    [HttpStatusCode.NOT_FOUND]:
        '请求的资源不存在',
    [HttpStatusCode.METHOD_NOT_ALLOWED]:
        '不支持的请求方法',
    [HttpStatusCode.CONFLICT]:
        '资源冲突',
    [HttpStatusCode.INTERNAL_SERVER_ERROR]:
        '服务器内部错误',
    // 业务状态码消息
    [BusinessCode.SUCCESS]: '操作成功',
    [BusinessCode.TOKEN_EXPIRED]:
        '登录已过期，请重新登录',
    [BusinessCode.TOKEN_INVALID]:
        '无效的登录信息',
    [BusinessCode.NEED_LOGIN]:
        '请先登录',
    [BusinessCode.USER_NOT_FOUND]:
        '用户不存在',
    [BusinessCode.USERNAME_EXIST]:
        '用户名已被占用',
    [BusinessCode.PASSWORD_ERROR]:
        '密码错误',
    [BusinessCode.PARAM_ERROR]:
        '参数错误，请检查输入',
    [BusinessCode.OPERATION_FAILED]:
        '操作失败',
    [BusinessCode.SYSTEM_ERROR]:
        '系统错误，请稍后重试'
}
export class StatusCodeHandler {
    IsSuccess(
        Httpstatus: number,
        BusinessSatus?: number
    ): boolean {
        const IsHttpSuccess =
            Httpstatus >= 200 &&
            Httpstatus < 300
        if (BusinessSatus === undefined)
            return IsHttpSuccess
        return (
            IsHttpSuccess &&
            BusinessSatus ===
                BusinessCode.SUCCESS
        )
    }

    handle(
        Httpstatus: number,
        BusinessSatus?: number
    ) {
        const IsSuccess =
            this.IsSuccess(
                Httpstatus,
                BusinessSatus
            )

        let message: string =
            statusMessageMap[
                BusinessSatus as keyof typeof statusMessageMap
            ] ??
            statusMessageMap[
                Httpstatus as keyof typeof statusMessageMap
            ] ??
            '未知错误'

        // 成功强制覆盖提示
        if (IsSuccess) {
            message =
                statusMessageMap[
                    BusinessCode.SUCCESS
                ] ||
                statusMessageMap[
                    Httpstatus as keyof typeof statusMessageMap
                ]
        }

        return {
            success: IsSuccess,
            message,
            Httpstatus,
            code: BusinessSatus ?? null
        }
    }
}
