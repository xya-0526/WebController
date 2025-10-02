import type { Artical } from '@/type/artical.api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const articalStore = defineStore(
    'artical',
    () => {
        const Artical =
            reactive<Artical>({
                title: '',
                content: '',
                category: '',
                id: undefined as unknown as number,
                createTime: '',
                status: undefined as unknown as number
            })
        return { Artical }
    }
)
