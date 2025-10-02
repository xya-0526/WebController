import type { Production } from '@/type/production.api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const productionStore =
    defineStore('production', () => {
        const Production =
            reactive<Production>({
                name: '',
                desc: '',
                image: '',
                id: undefined as unknown as number,
                createTime: '',
                status: undefined as unknown as number
            })
        return { Production }
    })
