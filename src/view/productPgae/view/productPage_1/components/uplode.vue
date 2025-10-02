<template>
    <div class="w-[20vw]">
        <a-space
            direction="vertical"
            :style="{ width: '100%' }"
        >
            <a-upload
                action="/"
                :fileList="
                    file ? [file] : []
                "
                :show-file-list="false"
                @progress="onProgress"
                @change="onChange"
            >
                <template
                    #upload-button
                >
                    <div
                        :class="`arco-upload-list-item${
                            file &&
                            file.status ===
                                'error'
                                ? ' arco-upload-list-item-error'
                                : ''
                        }`"
                    >
                        <div
                            class="arco-upload-list-picture custom-upload-avatar"
                            v-if="
                                file &&
                                file.url
                            "
                        >
                            <img
                                :src="
                                    file.url
                                "
                            />
                            <div
                                class="arco-upload-list-picture-mask"
                            >
                                <IconPlus />
                                <IconEdit />
                            </div>
                            <a-progress
                                v-if="
                                    file.status ===
                                        'uploading' &&
                                    file.percent <
                                        100
                                "
                                :percent="
                                    file.percent
                                "
                                type="circle"
                                size="mini"
                                :style="{
                                    position:
                                        'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform:
                                        'translateX(-50%) translateY(-50%)'
                                }"
                            />
                        </div>
                        <div
                            class="arco-upload-picture-card"
                            v-else
                        >
                            <div
                                class="arco-upload-picture-card-text"
                            >
                                <div
                                    style="
                                        margin-top: 10px;
                                        font-weight: 600;
                                    "
                                >
                                    <icon-plus-circle-fill
                                        :size="
                                            60
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        <a-space
                            class="ml-2.5"
                        >
                            <a-button
                                shape="round"
                                >更改图片</a-button
                            >
                        </a-space>
                    </div>
                </template>
            </a-upload>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    ref,
    watch
} from 'vue'

import {
    IconPlus,
    IconEdit
} from '@arco-design/web-vue/es/icon'

// 声明 props 和 emit
const props = defineProps<{
    transformFileUrl?: string
}>()

const emit = defineEmits(['getUrl'])

// 初始 file 值（使用传入的 prop）
const file = ref()
// 文件上传逻辑
const onChange = async (
    _: any,
    currentFile: any
) => {
    const rawFile =
        currentFile.file as File
}

// 上传进度处理

const onProgress = (
    currentFile: any
) => {
    file.value = currentFile
    emit('getUrl', file.value.file)
}
watch(
    () => props.transformFileUrl,
    (newVal) => {
        if (newVal) {
            file.value = {
                uid: Date.now().toString(),
                name: 'server-image',
                url: newVal,
                status: 'done'
            }
        }
    },
    { immediate: true } // 第一次也执行
)
// onMounted(() => {
//     console.log(
//         props.transformFileUrl,
//         'xxxxxxxxxxxxxxxx'
//     )
//     if (props.transformFileUrl) {
//         file.value = {
//             uid: Date.now().toString(),
//             name: 'server-image',
//             url: props.transformFileUrl,
//             status: 'done'
//         }
//         console.log(file.value.url)
//     }
// })
</script>
<style>
.arco-upload-picture-card {
    width: 300px !important;
    height: 200px !important;
}
.arco-upload-list-picture {
    width: 300px !important;
    height: 200px !important;
}
</style>
