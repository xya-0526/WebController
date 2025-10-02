<template>
    <div class="relative w-full h-full">
        <!-- 页面标题 -->
        <p
            class="text-[2rem] font-bold text-gray-900 tracking-tight absolute top-2 left-1/2 -translate-x-1/2 my-6"
        >
            ✍️
            {{
                route.params.id
                    ? '编辑文章'
                    : '发布新文章'
            }}
        </p>

        <!-- 标题 -->
        <div
            class="w-[50%] absolute top-20 left-1/2 -translate-x-1/2"
        >
            <ArticleTitle
                v-model="form.title"
            />
        </div>

        <!-- 分类 / 标签 -->
        <div
            class="w-[50%] absolute top-20 left-[85%]"
        >
            <ArticleMeta
                v-model:category="
                    form.category
                "
            />
        </div>

        <!-- 编辑器 -->
        <div
            class="w-[95%] h-[65vh] top-[9rem] left-1/2 -translate-x-1/2 absolute"
        >
            <ArticleEditor
                v-model="form.content"
            />
        </div>
        <!-- 操作按钮 -->
        <div
            class="absolute left-5/6 bottom-1"
        >
            <ArticleActions
                @save="handleSave"
                @publish="handlePublish"
                @updata="updatArtical"
                :id="route.params.id"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    reactive,
    toRefs
} from 'vue'
import ArticleTitle from '@view/articalPage/view/articalPage_1/components/ArticleTitle.vue'
import ArticleMeta from '@view/articalPage/view/articalPage_1/components/ArticleMeta .vue'
import ArticleEditor from '@view/articalPage/view/articalPage_1/components/ArticleEditor.vue'
import ArticleActions from '@view/articalPage/view/articalPage_1/components/ArticleActions.vue'
import {
    createAritical,
    updateArtical
} from '@/request/req'
import { articalStore } from '@/store/artical.store'
import { storeToRefs } from 'pinia'
import {
    onBeforeRouteUpdate,
    useRoute
} from 'vue-router'
const route = useRoute()
const { Artical } = storeToRefs(
    articalStore()
)
let { title, category, content } =
    toRefs(Artical.value)
const form = reactive({
    title: '',
    category: '',
    content: ''
})
const handleSave = () => {
    console.log(route.path)
    sessionStorage.setItem(
        route.fullPath,
        JSON.stringify(form)
    )
    console.log('保存草稿', form)
}
const handlePublish = async () => {
    const message =
        await createAritical(form)
    alert(message.message)
    Object.assign(form, {
        title: '',
        category: '',
        content: ''
    })
    sessionStorage.removeItem(
        route.fullPath
    )
}
const updatArtical = async () => {
    const message = await updateArtical(
        route.params.id as string,
        form
    )
    alert(message.message)
    Object.assign(form, {
        title: '',
        category: '',
        content: ''
    })
}
onMounted(() => {
    console.log(2)
    if (route.params.id) {
        console.log(2)
        Object.assign(form, {
            title: title.value,
            category: category.value,
            content: content.value
        })
    }
    if (
        sessionStorage.getItem(
            route.fullPath
        )
    ) {
        console.log(1)
        Object.assign(
            form,
            JSON.parse(
                sessionStorage.getItem(
                    route.fullPath
                ) as string
            )
        )
    }
})
onBeforeRouteUpdate((to, from) => {
    const artical = JSON.parse(
        sessionStorage.getItem(
            to.fullPath
        ) as string
    )
    if (artical) {
        Object.assign(form, artical)
    }
})
</script>
