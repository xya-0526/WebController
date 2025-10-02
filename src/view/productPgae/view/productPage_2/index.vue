<template>
    <div
        class="productsManage w-full h-full rounded-b-xl flex flex-col bg-main-bgColor p-6"
    >
        <!-- 第一行：标题 -->
        <div class="mb-6">
            <p
                class="text-3xl text-[#3F2B96]"
            >
                全部产品
            </p>
        </div>

        <!-- 第二行：全选 + 按钮 -->
        <div
            class="flex items-center justify-between mb-6"
        >
            <!-- 左边：全选 -->
            <a-checkbox
                :model-value="
                    isAllseleted
                "
                @change="
                    handlerAllseleted(
                        isAllseleted
                    )
                "
            >
                全选
            </a-checkbox>

            <!-- 右边：按钮组 -->
            <div
                class="flex items-center gap-x-4"
            >
                <a-button
                    type="primary"
                    shape="round"
                    class="w-[8vw]"
                >
                    <router-link
                        :to="{
                            name: 'productPage_1'
                        }"
                        >添加产品</router-link
                    >
                </a-button>
                <a-button
                    type="text"
                    class="w-[4vw]"
                    @click="deleteAll"
                    >批量删除</a-button
                >
            </div>
        </div>

        <!-- 表格部分：加卡片容器 -->
        <div
            class="flex-1 w-full bg-white rounded-lg shadow p-4 overflow-auto"
        >
            <a-table
                :show-header="true"
                :columns="columns"
                :data="data.productions"
                row-class="common-row"
                row-key="id"
                :row-selection="
                    rowSelection
                "
                column-resizable
                :bordered="{
                    cell: false
                }"
                :pagination="pagination"
                v-model:selectedKeys="
                    selectedKeys
                "
                @change="handleChange"
                @page-change="
                    pageChange
                "
            >
                <template #tr>
                    <tr class="my-tr" />
                </template>
                <template #td>
                    <td class="my-td" />
                </template>
                <template
                    #image="{ record }"
                >
                    <a-image
                        :style="{
                            width: '6rem',
                            height: '6rem'
                        }"
                        :src="
                            record.image
                        "
                    />
                </template>
                <template
                    #action="{ record }"
                >
                    <a-button
                        type="text"
                        @click="
                            updateArtical(
                                record
                            )
                        "
                        >编辑</a-button
                    >
                    <a-button
                        type="text"
                        status="danger"
                        @click="
                            deleteDate(
                                record
                            )
                        "
                        >删除</a-button
                    >
                </template>

                <template
                    #status="{ record }"
                >
                    <a-switch
                        v-if="
                            record.status !==
                            'null'
                        "
                        :default-checked="
                            record.status ===
                            1
                        "
                        @change="
                            (
                                checked:
                                    | boolean
                                    | any
                            ) =>
                                handleSwitchChange(
                                    checked,
                                    record
                                )
                        "
                    />
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * @description 活动表单表格组件
 */

import {
    DeleteProduction,
    getArticalList,
    getProductionlList
} from '@/request/req'
import { useRouter } from 'vue-router'
import { articalStore } from '@/store/artical.store'
import {
    ref,
    watch,
    onMounted,
    reactive
} from 'vue'
import type {
    Production,
    ProductionListRes
} from '@/type/production.api'
import { productionStore } from '@/store/production.stroe'
import { storeToRefs } from 'pinia'
let isAllseleted = ref<boolean>(false)
let data = reactive<ProductionListRes>({
    productions: [],
    totial: 0
})
const store = productionStore()
const router = useRouter()
const pagination = ref({
    pageSize: 5,
    total: 0,
    showTotal: true
})
const columns = [
    {
        title: '产品名',
        dataIndex: 'name'
    },
    {
        title: '图片',
        slotName: 'image'
    },
    {
        title: '时间',
        dataIndex: 'createTime'
    },
    {
        title: '状态',
        dataIndex: 'status',
        slotName: 'status'
    },
    {
        title: '操作',
        slotName: 'action'
    } // 只有操作要用插槽
]
const handleChange = (data: any) => {
    console.log(data, 'XXXXXXXX')
}
const pageChange = async (
    page: number
) => {
    const datalist =
        await getArticalList(page)
    Object.assign(data, datalist)
    isAllseleted.value = false
}
const formatImageUrl = (
    imagePath: string
) => {
    return (
        import.meta.env
            .VITE_API_BASE_URL +
        '/xya/' +
        imagePath
    )
}
const handleSwitchChange = async (
    checked: boolean,
    record: Production
) => {}
const selectedKeys = ref<number[]>([])
const rowSelection = reactive({
    type: 'checkbox',
    onlyCurrent: true
})
const deleteDate = async (
    record: Production
) => {
    try {
        const res =
            await DeleteProduction(
                record.id
            )
        console.log(res)
        data.productions =
            data.productions.filter(
                (i: Production) =>
                    i.id != record.id
            )
    } catch (e) {}
}
function updateArtical(
    record: Production
) {
    Object.assign(
        store.Production,
        record
    )
    router.push({
        name: 'productPage_1',
        params: { id: record.id }
    })
    console.log(1)
}
function handlerAllseleted(
    value: boolean
) {
    isAllseleted.value = !value
    if (isAllseleted.value) {
        data.productions.forEach(
            (i: Production) => {
                selectedKeys.value.push(
                    Number(i.id)
                )
            }
        )
    } else {
        selectedKeys.value = []
    }
}
async function deleteAll() {
    const reqlist =
        selectedKeys.value.map((i) => {
            return DeleteProduction(i)
        })
    try {
        await Promise.all(reqlist)
        data.productions = []
    } catch (e) {
        console.error('批量删除失败', e)
        throw e
    }
}
watch(
    [
        () => selectedKeys.value,
        () => data.productions.length,
        () => selectedKeys.value.length
    ],
    async (newvalue, oldvalue) => {
        if (
            newvalue[1] !== oldvalue[1]
        ) {
            const datalist =
                await getProductionlList()
            Object.assign(
                data,
                datalist
            )
            data.productions.map(
                (i) => {
                    if (
                        i.image.includes(
                            '/xya/'
                        )
                    ) {
                        return i
                    }
                    i.image =
                        formatImageUrl(
                            i.image
                        )
                    return i
                }
            )
            pagination.value.total =
                data.totial
            console.log(
                pagination.value.total,
                data.totial,
                'xxxxxxxxxxxx'
            )
        }
        if (
            newvalue[2] === newvalue[1]
        ) {
            isAllseleted.value = true
        } else {
            isAllseleted.value = false
        }
    }
)
onMounted(async () => {
    const res =
        await getProductionlList()
    Object.assign(data, res)
    data.productions.map((i) => {
        i.image = formatImageUrl(
            i.image
        )
        return i
    })

    pagination.value.total = res.totial
    console.log(
        pagination.value.total,
        data.totial,
        'xxxxxxxxxxxx'
    )
})
</script>
<style scoped>
:deep(.arco-table-th) {
    background: #f6f2fe !important;
    color: #3f2b96 !important;
    font-size: 1.5rem !important;
    font-weight: 700 !important;
}
:deep(.arco-table-cell) {
    text-align: start !important;
    font-size: 1rem !important;
    width: 100% !important;
    aspect-ratio: 5 / 1 !important;
}
</style>
