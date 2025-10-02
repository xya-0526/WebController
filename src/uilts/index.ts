import request from '@/request'
import type { User } from '@/type/auth.api/auth.api'

export class TokenSrivce {
    private TOKEN = 'TOKEN'
    constructor() {}
    SetToken(token: string): void {
        return localStorage.setItem(
            this.TOKEN,
            token
        )
    }
    GetToken(): string | null {
        return localStorage.getItem(
            this.TOKEN
        )
    }
    async VerifyToken(
        token: string
    ): Promise<boolean | undefined> {
        return (
            await request.get(
                `/auth/verifyToken?token=${token}`
            )
        ).data
    }
    ClearToken(): void {
        return localStorage.removeItem(
            this.TOKEN
        )
    }
}
export class userService {
    private readonly KEY: string =
        'USERINOF'
    constructor() {}
    setUserInof(userInof: User) {
        return localStorage.setItem(
            this.KEY,
            JSON.stringify(userInof)
        )
    }
    getUserInOf(): User | null {
        const userInof =
            localStorage.getItem(
                this.KEY
            )
        return userInof
            ? JSON.parse(userInof)
            : null
    }
    ClearUserInof(): void {
        return localStorage.removeItem(
            this.KEY
        )
    }
}
