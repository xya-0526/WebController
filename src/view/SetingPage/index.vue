<template>
    <div
        class="min-h-screen bg-gray-100 p-6"
    >
        <div
            class="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6"
        >
            <h1
                class="text-3xl font-bold text-gray-800 mb-6"
            >
                设置
            </h1>

            <!-- 初始设置列表 -->
            <div
                v-if="
                    currentView ===
                    'list'
                "
                class="flex flex-col gap-4"
            >
                <button
                    @click="
                        currentView =
                            'account'
                    "
                    class="flex justify-between items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
                >
                    <span
                        class="text-gray-700 font-medium text-lg"
                        >账号设置</span
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            <!-- 账号设置菜单 -->
            <div
                v-else-if="
                    currentView ===
                    'account'
                "
            >
                <!-- 返回按钮 -->
                <button
                    @click="
                        currentView =
                            'list'
                    "
                    class="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    返回
                </button>

                <h2
                    class="text-2xl font-semibold text-gray-800 mb-4"
                >
                    账号设置
                </h2>

                <div
                    class="flex flex-col gap-4"
                >
                    <button
                        @click="
                            currentView =
                                'password'
                        "
                        class="flex justify-between items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
                    >
                        <span
                            class="text-gray-700 font-medium"
                            >修改密码</span
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <button
                        @click="
                            currentView =
                                'phone'
                        "
                        class="flex justify-between items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
                    >
                        <span
                            class="text-gray-700 font-medium"
                            >更换手机号</span
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 修改密码页面 -->
            <div
                v-else-if="
                    currentView ===
                    'password'
                "
            >
                <!-- 返回按钮 -->
                <button
                    @click="
                        currentView =
                            'account'
                    "
                    class="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    返回
                </button>

                <h2
                    class="text-2xl font-semibold text-gray-800 mb-4"
                >
                    修改密码
                </h2>

                <div
                    class="flex flex-col gap-4 mb-6"
                >
                    <input
                        type="password"
                        v-model="
                            PASSWORD.password
                        "
                        placeholder="当前密码"
                        class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    />
                    <input
                        type="password"
                        v-model="
                            PASSWORD.newPassword
                        "
                        placeholder="新密码"
                        class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    />
                    <input
                        type="password"
                        v-model="
                            PASSWORD.confirmPassword
                        "
                        placeholder="确认新密码"
                        class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    />
                </div>

                <div
                    class="flex justify-end"
                >
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md transition"
                        @click="
                            changePassword
                        "
                    >
                        保存修改
                    </button>
                </div>
            </div>

            <!-- 更换手机号页面 -->
            <div
                v-else-if="
                    currentView ===
                    'phone'
                "
            >
                <!-- 返回按钮 -->
                <button
                    @click="
                        currentView =
                            'account'
                    "
                    class="mb-4 text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    返回
                </button>

                <h2
                    class="text-2xl font-semibold text-gray-800 mb-4"
                >
                    更换手机号
                </h2>

                <div
                    class="flex flex-col gap-4 mb-6"
                >
                    <input
                        type="text"
                        v-model="
                            Phone.phoneNumber
                        "
                        placeholder="请输入新手机号"
                        class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                    />

                    <div
                        class="flex gap-2"
                    >
                        <input
                            type="text"
                            v-model="
                                Phone.verifyCode
                            "
                            placeholder="验证码"
                            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
                        />
                        <button
                            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                            :disabled="
                                countdown >
                                0
                            "
                            @click="
                                getVerifyCode
                            "
                        >
                            {{
                                countdown >
                                0
                                    ? countdown +
                                      's 后重试'
                                    : '获取验证码'
                            }}
                        </button>
                    </div>
                </div>

                <div
                    class="flex justify-end"
                >
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md transition"
                        @click="
                            savePhone
                        "
                    >
                        确认更换
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChangePassword } from '@/request/req'
import { reactive, ref } from 'vue'

type View =
    | 'list'
    | 'account'
    | 'password'
    | 'phone'
const currentView = ref<View>('list')
const PASSWORD = reactive({
    password: '',
    newPassword: '',
    confirmPassword: ''
})
const Phone = reactive({
    phoneNumber: '',
    verifyCode: ''
})
// 倒计时
const countdown = ref(0)
let timer: number | null | undefined =
    null

function getVerifyCode() {
    timer && clearInterval(timer)
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            clearInterval(timer!)
        }
    }, 1000)
}

async function changePassword() {
    if (
        !PASSWORD.password ||
        !PASSWORD.newPassword
    )
        return alert('请输入信息')
    if (
        PASSWORD.newPassword !==
        PASSWORD.confirmPassword
    )
        return alert('密码不一致')
    const res = await ChangePassword({
        passWord: PASSWORD.password,
        newPassword:
            PASSWORD.newPassword
    })
    alert(res.message)
}

function savePhone() {}
</script>

<style scoped>
/* Tailwind 已经足够美观，这里可按需加点细节 */
</style>
