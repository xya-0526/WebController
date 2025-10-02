<template>
    <div
        class="w-[18%] p-[2rem] aspect-square absolute bg-white right-[1rem] bottom-[1rem] rounded-2xl flex flex-col justify-around items-center shadow-md"
    >
        <div
            class="text-[#3F2B96] text-[1rem] font-extrabold p-3"
        >
            快速操作
        </div>
        <div
            class="w-[85%] aspect-[1/1] flex flex-col justify-around"
        >
            <a-button
                v-for="item in actions"
                :key="item.label"
                type="outline"
                shape="round"
                long
                class="aspect-[4/1]"
            >
                <router-link
                    :to="{
                        name: item.path
                    }"
                >
                    <icon-plus />
                    <span
                        class="text-[#ABABAB] text-[0.7rem]"
                        >{{
                            item.label
                        }}</span
                    >
                </router-link>
            </a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
const actions = [
    {
        label: '发布技术博文',
        path: 'articalPage_1'
    },
    {
        label: '发布产品',
        path: 'productPage_1'
    }
]
</script>
