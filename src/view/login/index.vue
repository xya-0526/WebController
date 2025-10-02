<template>
    <div class="w-full h-full">
        <div
            class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 relative overflow-hidden"
        >
            <!-- 背景装饰 -->
            <div
                class="absolute inset-0 overflow-hidden opacity-20"
            >
                <div
                    class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-300 blur-3xl"
                ></div>
                <div
                    class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-300 blur-3xl"
                ></div>
            </div>

            <div
                class="bg-white shadow-2xl rounded-2xl flex w-[50%] max-w-4xl aspect-[3/2] overflow-hidden relative z-10 transform hover:shadow-indigo-200/20 transition-all duration-300"
            >
                <!-- 左侧标题（动态渐变背景） -->
                <div
                    class="flex-1 flex items-center justify-center relative overflow-hidden"
                    style="
                        background: linear-gradient(
                            135deg,
                            rgba(
                                    99,
                                    102,
                                    241,
                                    1
                                )
                                0%,
                            rgba(
                                    139,
                                    92,
                                    246,
                                    1
                                )
                                50%,
                            rgba(
                                    168,
                                    85,
                                    247,
                                    1
                                )
                                100%
                        );
                        background-size: 200%
                            200%;
                        animation: gradientShift
                            8s ease
                            infinite;
                    "
                >
                    <!-- 动态装饰元素 -->
                    <div
                        class="absolute top-0 left-0 w-full h-full overflow-hidden"
                    >
                        <div
                            class="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse"
                        ></div>
                        <div
                            class="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-white/5 blur-3xl animate-pulse"
                            style="
                                animation-delay: 1s;
                            "
                        ></div>
                    </div>

                    <h1
                        class="text-4xl md:text-5xl font-bold tracking-widest text-white z-10 transform hover:scale-105 transition-transform duration-300"
                    >
                        博客后台管理
                    </h1>
                </div>

                <!-- 右侧 登录/注册 -->
                <div
                    class="w-[50%] aspect-[3/2] p-10 flex flex-col justify-center relative overflow-hidden"
                >
                    <transition
                        name="slide-fade"
                        mode="out-in"
                    >
                        <!-- 登录表单 -->
                        <div
                            v-if="
                                !isRegister
                            "
                            key="login"
                            class="absolute inset-0 p-10 flex flex-col justify-center bg-white"
                        >
                            <h2
                                class="text-2xl font-bold text-center mb-8 text-gray-700"
                            >
                                登录
                            </h2>
                            <div
                                class="space-y-8 flex flex-col justify-around h-[50%]"
                            >
                                <input
                                    v-model="
                                        loginUser.phoneNumber
                                    "
                                    type="text"
                                    placeholder="用户名"
                                    class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition-all duration-300"
                                />
                                <input
                                    v-model="
                                        loginUser.passWord
                                    "
                                    type="password"
                                    placeholder="密码"
                                    class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition-all duration-300"
                                />
                                <button
                                    @click="
                                        handleLogin
                                    "
                                    class="w-full py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                >
                                    {{
                                        loading
                                            ? '登录中...'
                                            : '登录'
                                    }}
                                </button>
                            </div>
                            <p
                                class="text-sm text-center text-gray-500 mt-8"
                            >
                                没有账号？
                                <button
                                    @click="
                                        toggleForm
                                    "
                                    class="text-indigo-500 hover:text-indigo-700 hover:underline transition-colors"
                                >
                                    立即注册
                                </button>
                            </p>
                        </div>

                        <!-- 注册表单 -->
                        <div
                            v-else
                            key="register"
                            class="absolute inset-0 p-10 flex flex-col justify-center bg-white"
                        >
                            <h2
                                class="text-2xl font-bold text-center mb-8 text-gray-700"
                            >
                                注册
                            </h2>

                            <!-- 头像上传 -->
                            <div
                                class="flex justify-center mb-8"
                            >
                                <label
                                    class="relative cursor-pointer"
                                >
                                    <input
                                        type="file"
                                        class="hidden"
                                        accept="image/*"
                                        @change="
                                            onAvatarChange
                                        "
                                    />
                                    <div
                                        class="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:border-indigo-400"
                                    >
                                        <img
                                            v-if="
                                                registerUser.avatar
                                            "
                                            :src="
                                                registerUser.avatar
                                            "
                                            alt="头像"
                                            class="w-full h-full object-cover"
                                        />
                                        <span
                                            v-else
                                            class="text-gray-400 text-sm"
                                            >添加头像</span
                                        >
                                    </div>
                                </label>
                            </div>

                            <div
                                class="space-y-8 justify-around h-[100%] flex flex-col"
                            >
                                <input
                                    v-model="
                                        registerUser.name
                                    "
                                    type="text"
                                    placeholder="用户名"
                                    class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition-all duration-300"
                                />
                                <input
                                    v-model="
                                        registerUser.phoneNumber
                                    "
                                    type="text"
                                    placeholder="手机号"
                                    class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition-all duration-300"
                                />
                                <input
                                    v-model="
                                        registerUser.passWord
                                    "
                                    type="password"
                                    placeholder="密码"
                                    class="w-full px-5 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:outline-none transition-all duration-300"
                                />
                                <button
                                    @click="
                                        handleRegister
                                    "
                                    class="w-full py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                >
                                    {{
                                        loading
                                            ? '注册中...'
                                            : '注册'
                                    }}
                                </button>
                            </div>
                            <p
                                class="text-sm text-center text-gray-500 mt-8"
                            >
                                已有账号？
                                <button
                                    @click="
                                        toggleForm
                                    "
                                    class="text-indigo-500 hover:text-indigo-700 hover:underline transition-colors"
                                >
                                    去登录
                                </button>
                            </p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
/**@description 登录模块
 *
 */
import {
    applyReq,
    login
} from '@/request/req'
import type { User } from '@/type/auth.api/auth.api'
import { reactive, ref } from 'vue'
import { userStore } from '@/store/user.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const { user } = storeToRefs(
    userStore()
)
const isRegister = ref(false)
const loading = ref(false)
const upflie = ref<File>()
const router = useRouter()

// 登录用户数据
const loginUser = reactive<User>({
    phoneNumber: '',
    passWord: ''
})
// 注册用户数据
const registerUser = reactive<User>({
    name: '',
    phoneNumber: '',
    passWord: '',
    avatar: ''
})

// 切换表单
const toggleForm = () => {
    isRegister.value = !isRegister.value
}

// 登录
const handleLogin = async () => {
    loading.value = true
    const isOK = await login(loginUser)
    if (isOK) {
        user.value.phoneNumber =
            loginUser.phoneNumber
        router.push({
            name: 'homePage'
        })
    }
    setTimeout(() => {
        loading.value = false
    }, 1200)
}

// 注册
const handleRegister = async () => {
    if (
        !upflie.value ||
        !registerUser.passWord ||
        !registerUser.phoneNumber ||
        !registerUser.name
    )
        return alert('缺少信息')
    loading.value = true
    const code = await applyReq(
        registerUser,
        upflie.value
    )
    setTimeout(() => {
        if (
            code.code < 300 &&
            code.code === 0
        ) {
            isRegister.value =
                !isRegister.value
            Object.assign(
                registerUser,
                {
                    name: '',
                    phoneNumber: '',
                    passWord: '',
                    avatar: ''
                }
            )
        }
        loading.value = false
    }, 1000)
}
// 头像上传
const onAvatarChange = (e: Event) => {
    const file = (
        e.target as HTMLInputElement
    ).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
            registerUser.avatar = event
                .target
                ?.result as string
        }
        reader.readAsDataURL(file)
        upflie.value = file
    }
}
</script>

<style scoped>
/* 平移动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s ease;
}

.slide-fade-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
