<template>
    <div
        class="productsManage w-full h-full rounded-b-xl flex flex-col bg-main-bgColor p-6"
    >
        <!-- 第一行：标题 -->
        <div class="mb-6">
            <p
                class="text-3xl text-[#3F2B96]"
            >
                全部文章
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
                            name: 'articalPage_1'
                        }"
                        >添加文章</router-link
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
                :data="data.articals"
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

                <!-- 操作列 -->
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

                <!-- 状态列 -->
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
    DeleteArtical,
    getArticalList
} from '@/request/req'
import type {
    Artical,
    ArticalListRes
} from '@/type/artical.api'
import {
    onBeforeRouteUpdate,
    useRouter
} from 'vue-router'
import { articalStore } from '@/store/artical.store'
import {
    ref,
    watch,
    onMounted,
    reactive
} from 'vue'
let isAllseleted = ref<boolean>(false)
let data = reactive<ArticalListRes>({
    articals: [],
    totial: 0
})
const ArticalStore = articalStore()
const router = useRouter()
const pagination = ref({
    pageSize: 5,
    total: 0,
    showTotal: true
})
const columns = [
    {
        title: '文章名',
        dataIndex: 'title'
    },
    {
        title: '类型',
        dataIndex: 'category'
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

const handleSwitchChange = async (
    checked: boolean,
    record: Artical
) => {}
const selectedKeys = ref<number[]>([])
const rowSelection = reactive({
    type: 'checkbox',
    onlyCurrent: true
})
const deleteDate = async (
    record: Artical
) => {
    try {
        const res = await DeleteArtical(
            record.id
        )
        console.log(res)
        data.articals =
            data.articals.filter(
                (i: any) =>
                    i.id != record.id
            )
    } catch (e) {}
}
function updateArtical(
    record: Artical
) {
    Object.assign(
        ArticalStore.Artical,
        record
    )
    router.push({
        name: 'articalPage_1',
        params: { id: record.id }
    })
}
function handlerAllseleted(
    value: boolean
) {
    isAllseleted.value = !value
    if (isAllseleted.value) {
        data.articals.forEach(
            (i: any) => {
                selectedKeys.value.push(
                    Number(i.id)
                )
            }
        )
    } else {
        selectedKeys.value =
            selectedKeys.value.filter(
                (i) => i != i
            )
    }
}
async function deleteAll() {
    const reqlist =
        selectedKeys.value.map((i) =>
            DeleteArtical(i)
        )
    try {
        await Promise.all(reqlist)
        data.articals = []
    } catch (e) {
        console.error('批量删除失败', e)
        throw e
    }
}
watch(
    [
        () => selectedKeys.value,
        () => data.articals.length,
        () => selectedKeys.value.length
    ],
    async (newvalue, oldvalue) => {
        if (
            newvalue[1] !== oldvalue[1]
        ) {
            const datalist =
                await getArticalList()
            Object.assign(
                data,
                datalist
            )
            pagination.value.total =
                data.totial
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
    const datalist =
        await getArticalList()
    Object.assign(data, datalist)
    pagination.value.total = data.totial
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
