import type { User } from '@/type/auth.api/auth.api'
import {
    TokenSrivce,
    userService
} from '@/uilts'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const userStore = defineStore(
    'user',
    () => {
        const user = reactive<User>({
            ...(new userService().getUserInOf() as User),
            token:
                new TokenSrivce().GetToken() ||
                undefined
        })
        return { user }
    }
)
