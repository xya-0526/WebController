<template>
    <div
        class="productsManage w-full h-full rounded-b-xl flex flex-col bg-main-bgColor p-6"
    >
        <!-- 标题 -->
        <div class="mb-6">
            <p
                class="text-3xl text-[#3F2B96] font-bold"
            >
                添加产品
            </p>
        </div>

        <!-- 表单容器 -->
        <div
            class="flex-1 w-full bg-white rounded-lg shadow p-8"
        >
            <form
                class="flex flex-col gap-y-8 text-[#555]"
            >
                <!-- 产品名称 -->
                <div
                    class="flex items-center gap-x-4"
                >
                    <span
                        class="w-30 text-right text-[1.2rem]"
                        >产品名称：</span
                    >
                    <a-input
                        style="
                            width: 320px;
                        "
                        placeholder="请输入产品名称"
                        v-model="
                            formData.name
                        "
                    />
                </div>

                <!-- 产品图片 -->
                <div
                    class="flex items-center gap-x-4"
                >
                    <span
                        class="w-30 text-right text-[1.2rem]"
                        >产品图片：</span
                    >
                    <uplode
                        @getUrl="getUrl"
                        :transformFileUrl="
                            formData.image
                        "
                    />
                </div>

                <!-- 产品介绍 -->
                <div
                    class="flex items-start gap-x-4"
                >
                    <span
                        class="w-30 text-right leading-[2rem] text-[1.2rem]"
                        >产品介绍：</span
                    >
                    <a-textarea
                        placeholder="请输入产品介绍"
                        style="
                            width: 70vw;
                            height: 150px;
                        "
                        v-model="
                            formData.desc
                        "
                    />
                </div>

                <!-- 按钮 -->
                <div
                    class="flex justify-end gap-x-4 mt-6"
                >
                    <a-button
                        v-if="
                            !route
                                .params
                                .id
                        "
                        shape="round"
                        type="primary"
                        @click="POST"
                        >保存</a-button
                    >
                    <a-button
                        v-else
                        shape="round"
                        type="primary"
                        @click="UPDATA"
                        >更新</a-button
                    >
                    <router-link
                        :to="{
                            name: 'productPage_2'
                        }"
                    >
                        <a-button
                            shape="round"
                            >取消</a-button
                        >
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    createProduct,
    updateProduction
} from '@/request/req'
import uplode from './components/uplode.vue'
import {
    onMounted,
    reactive,
    ref
} from 'vue'

import { useRoute } from 'vue-router'
import { productionStore } from '@/store/production.stroe'

let route = useRoute()
const formData = reactive({
    name: '',
    desc: '',
    image: ''
})
let file = ref<File>()
const getUrl = (value: File) => {
    file.value = value
}
async function POST() {
    const res = await createProduct(
        formData,
        file.value as File
    )
}
async function UPDATA() {
    console.log(formData)
    const res = await updateProduction(
        route.params.id as string,
        formData,
        file.value as File
    )
}

onMounted(() => {
    if (route.params.id) {
        Object.assign(
            formData,
            productionStore().Production
        )
    }
})
</script>
