<template>
    <!-- 蒙层 -->
    <div
        class="fixed inset-0 bg-gradient-to-br from-gray-900/60 to-indigo-900/40 flex items-center justify-center z-40 backdrop-blur-sm transition-opacity duration-300"
    >
        <!-- 卡片 -->
        <div
            class="bg-white w-[90%] max-w-md p-6 md:p-8 rounded-2xl shadow-2xl relative transition-all duration-300 ease-in-out transform hover:shadow-indigo-500/10"
        >
            <!-- 关闭按钮 -->
            <button
                @click="
                    $emit(
                        'update:isOpen',
                        !isOpen
                    )
                "
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-all"
            >
                ✕
            </button>

            <!-- 头像 -->
            <div
                class="flex flex-col items-center gap-6 mb-6"
            >
                <h3
                    class="text-xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                >
                    个人资料
                </h3>

                <!-- 点击头像上传 -->
                <label
                    class="cursor-pointer relative group"
                >
                    <div
                        class="relative"
                    >
                        <a-avatar
                            :size="80"
                            class="border-2 border-indigo-100 group-hover:border-indigo-300 transition-all shadow-md"
                        >
                            <img
                                :src="
                                    avatarPreview
                                "
                                alt="avatar"
                                class="rounded-full object-cover"
                            />
                        </a-avatar>
                        <!-- 上传提示覆盖层 -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all p-2"
                        >
                            <span
                                class="text-white text-sm"
                                >更换头像</span
                            >
                        </div>
                    </div>

                    <!-- 文件输入隐藏 -->
                    <input
                        v-if="iShow"
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        @change="
                            handleAvatarUpload
                        "
                    />
                </label>
            </div>

            <!-- 用户信息 -->
            <div
                class="mt-2 flex flex-col gap-4"
            >
                <div
                    class="flex items-center gap-4 p-3 hover:bg-indigo-50 rounded-xl transition-all"
                >
                    <span
                        class="text-indigo-700 font-medium w-20"
                        >姓名：</span
                    >
                    <span
                        v-if="!iShow"
                        class="text-gray-800 flex-1 font-medium"
                        >{{
                            userInof.name
                        }}</span
                    >
                    <input
                        v-if="iShow"
                        class="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm"
                        v-model="
                            userInof.name
                        "
                    />
                </div>

                <div
                    class="flex items-center gap-4 p-3 hover:bg-indigo-50 rounded-xl transition-all"
                >
                    <span
                        class="text-indigo-700 font-medium w-20"
                        >邮箱：</span
                    >
                    <span
                        v-if="!iShow"
                        class="text-gray-800 flex-1 font-medium"
                        >{{
                            userInof.email
                        }}</span
                    >
                    <input
                        v-if="iShow"
                        class="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm"
                        v-model="
                            userInof.email
                        "
                    />
                </div>

                <div
                    class="flex items-center gap-4 p-3 hover:bg-indigo-50 rounded-xl transition-all"
                >
                    <span
                        class="text-indigo-700 font-medium w-20"
                        >电话：</span
                    >
                    <span
                        class="text-gray-800 flex-1 font-medium"
                        >{{
                            userInof.phoneNumber
                        }}</span
                    >
                </div>
            </div>

            <!-- 按钮组 -->
            <div
                class="mt-8 flex justify-end gap-3"
            >
                <!-- 编辑按钮 -->
                <button
                    v-if="!iShow"
                    @click="
                        iShow = true
                    "
                    class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-indigo-300/30"
                >
                    编辑
                </button>

                <!-- 保存/取消按钮 -->
                <div
                    v-else
                    class="flex gap-3"
                >
                    <button
                        class="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-green-300/30"
                        @click="Save"
                    >
                        保存
                    </button>
                    <button
                        class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                        @click="NotSave"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { updataUser } from '@/request/req'
import { userStore } from '@/store/user.store'
import type { User } from '@/type/auth.api/auth.api'
import {
    computed,
    reactive,
    ref
} from 'vue'
defineProps<{ isOpen: boolean }>()
defineEmits<{
    (
        e: 'update:isOpen',
        value: boolean
    ): void
}>()
const iShow = ref<boolean>(false)
let userInof = reactive<User>({
    ...userStore().user
})
const Avatar = ref<File>()
const avatarPreview = computed(() => {
    return (
        import.meta.env
            .VITE_API_BASE_URL +
        '/xya/' +
        userInof.avatar
    )
})
const Save = async () => {
    try {
        const data = await updataUser(
            userInof,
            Avatar.value
        )
        userStore().user = userInof
        alert(data.message)
    } catch (e) {}
    iShow.value = false
}
const NotSave = () => {
    userInof = { ...userStore().user }
    iShow.value = false
}
function handleAvatarUpload(
    event: Event
) {
    const file = (
        event.target as HTMLInputElement
    ).files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        userInof.avatar = e.target
            ?.result as string
    }
    reader.readAsDataURL(file)
    Avatar.value = file
    console.log(file)
}
</script>

<style scoped>
/* 蒙层和弹窗动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
