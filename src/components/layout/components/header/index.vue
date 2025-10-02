<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from 'vue'
import { userStore } from '@/store/user.store'
import { storeToRefs } from 'pinia'
import UserCard from './components/UserCard.vue'
import {
    useRoute,
    useRouter
} from 'vue-router'
import {
    TokenSrivce,
    userService
} from '@/uilts'
const router = useRouter()
const { user } = storeToRefs(
    userStore()
)
const userAvater = computed(() => {
    return (
        import.meta.env
            .VITE_API_BASE_URL +
        '/xya/' +
        user.value.avatar
    )
})
const dropdownOpen = ref(false)
const userCardOpen = ref(false) // 控制卡片弹出
const currentTime = ref('')

function toggleDropdown() {
    dropdownOpen.value =
        !dropdownOpen.value
}

function openUserCard() {
    userCardOpen.value = true
    dropdownOpen.value = false // 打开卡片时关闭下拉
}

function logout() {
    new userService().ClearUserInof()
    new TokenSrivce().ClearToken()
    router.push({ name: 'login' })
    dropdownOpen.value = false
}

function updateTime() {
    const now = new Date()
    const Y = now.getFullYear()
    const M = String(
        now.getMonth() + 1
    ).padStart(2, '0')
    const D = String(
        now.getDate()
    ).padStart(2, '0')
    const weekDay = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ][now.getDay()]
    let h = now.getHours()
    const m = String(
        now.getMinutes()
    ).padStart(2, '0')
    const s = String(
        now.getSeconds()
    ).padStart(2, '0')
    const period =
        h >= 12 ? '下午' : '上午'
    if (h === 0) h = 12
    else if (h > 12) h -= 12
    const hh = String(h).padStart(
        2,
        '0'
    )
    currentTime.value = `${Y}-${M}-${D} ${weekDay} ${period} ${hh}:${m}:${s}`
}

let timer: number
onMounted(() => {
    updateTime()
    timer = window.setInterval(
        updateTime,
        1000
    )
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
    <header
        class="flex items-center justify-between px-6 h-13 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm border-b border-gray-200"
    >
        <!-- 左侧 Logo / 标题 -->
        <div
            class="flex items-center space-x-3"
        >
            <button
                @click="
                    $emit(
                        'toggleSidebar'
                    )
                "
                class="md:hidden text-gray-600 hover:text-gray-900"
            ></button>
            <h1
                class="font-semibold text-gray-700 tracking-wide"
            >
                后台管理系统
            </h1>
        </div>

        <!-- 右侧 用户区 -->
        <div
            class="flex justify-around items-center w-[30%]"
        >
            <!-- 时间显示 -->
            <div
                class="flex items-center px-4 py-2 border-gray-200 text-gray-700 font-medium"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span
                    class="text-[1.1rem] font-semibold"
                    >{{
                        currentTime
                    }}</span
                >
            </div>

            <!-- 用户菜单 -->
            <div class="relative">
                <div
                    class="flex flex-col items-center px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    @click="
                        toggleDropdown
                    "
                >
                    <img
                        :src="
                            userAvater
                        "
                        alt="avatar"
                        class="w-9 h-9 rounded-full border shadow-sm"
                    />
                    <span
                        class="mt-1 text-gray-700 text-sm font-medium text-[0.7rem]"
                        >{{
                            user.name
                        }}</span
                    >
                </div>

                <!-- 下拉菜单 -->
                <transition name="fade">
                    <div
                        v-if="
                            dropdownOpen
                        "
                        class="absolute z-20 right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg py-1 overflow-hidden"
                    >
                        <button
                            @click="
                                openUserCard
                            "
                            class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            个人中心
                        </button>
                        <div
                            class="border-t border-gray-100 my-0.5"
                        ></div>
                        <button
                            @click="
                                logout
                            "
                            class="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            退出登录
                        </button>
                    </div>
                </transition>
            </div>
        </div>
    </header>

    <!-- 弹出用户信息卡片 -->
    <UserCard
        v-if="userCardOpen"
        v-model:isOpen="userCardOpen"
    />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
