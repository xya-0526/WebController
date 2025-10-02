<template>
    <a-layout class="layout-demo">
        <a-layout-sider
            theme="dark"
            breakpoint="lg"
            :width="230"
            collapsible
            :collapsed="collapsed"
            @collapse="onCollapse"
            class="sider-transition"
        >
            <div
                class="logo flex items-center justify-center gap-2 px-3 py-4"
            >
                <div
                    class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"
                >
                    <IconLayout />
                </div>
                <span
                    v-if="!collapsed"
                    class="font-bold text-white text-lg"
                    >管理系统</span
                >
            </div>
            <a-menu
                @menuItemClick="
                    onClickMenuItem
                "
                selected-keys="0_1"
                class="menu-transition"
            >
                <a-menu-item
                    key="0_1"
                    class="menu-item"
                >
                    <IconHome
                        class="icon-margin"
                    />
                    <span>首页</span>
                </a-menu-item>
                <a-sub-menu key="1">
                    <template #title>
                        <span
                            class="flex items-center"
                        >
                            <IconCalendar
                                class="icon-margin"
                            />
                            技术博文
                        </span>
                    </template>
                    <a-menu-item
                        key="1_1"
                        class="menu-item"
                        >文章发布</a-menu-item
                    >
                    <a-menu-item
                        key="1_2"
                        class="menu-item"
                        >文章管理</a-menu-item
                    >
                </a-sub-menu>
                <a-sub-menu key="2">
                    <template #title>
                        <span
                            class="flex items-center"
                        >
                            <IconCalendar
                                class="icon-margin"
                            />
                            自研产品
                        </span>
                    </template>
                    <a-menu-item
                        key="2_1"
                        class="menu-item"
                        >产品发布</a-menu-item
                    >
                    <a-menu-item
                        key="2_2"
                        class="menu-item"
                        >产品管理</a-menu-item
                    >
                </a-sub-menu>
                <a-menu-item
                    key="3-1"
                    class="menu-item"
                >
                    <IconCalendar
                        class="icon-margin"
                    />
                    <span>设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header
                ><Header></Header
            ></a-layout-header>
            <a-layout
                style="padding: 0 24px"
            >
                <a-layout-content>
                    <div
                        class="content-container h-full"
                    >
                        <slot></slot>
                    </div>
                </a-layout-content>
                <a-layout-footer
                    class="footer-style"
                >
                    博客后台管理 ©{{
                        new Date().getFullYear()
                    }}
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import {
    IconHome,
    IconCalendar,
    IconLayout // 新增布局图标
} from '@arco-design/web-vue/es/icon'
import Header from '@components/layout/components/header/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
enum pathNumber {
    '0_1' = 1,
    '1_1' = 2,
    '1_2' = 3,
    '2_1' = 4,
    '2_2' = 5,
    '3-1' = 6
}
const collapsed = ref(false)
const onClickMenuItem = (
    key: keyof typeof pathNumber
) => {
    const pathMap: Record<
        number,
        string
    > = {
        1: 'homePage',
        2: 'articalPage_1',
        3: 'articalPage_2',
        4: 'productPage_1',
        5: 'productPage_2',
        6: 'settingPage'
    }
    const value = pathNumber[key]
    Message.info({
        content: `你选择了 ${key}`,
        showIcon: true
    })
    router.push({
        name: pathMap[value]
    })
}
const onCollapse = (val: any) => {
    collapsed.value = val
}
</script>

<style scoped>
.layout-demo {
    height: 100vh;
    background: var(--color-fill-2);
    border: 1px solid
        var(--color-border);
}

/* 侧边栏样式 */
.sider-transition {
    transition: all 0.3s
        cubic-bezier(0.25, 0.8, 0.25, 1);
    background: #1e1e2d;
}

.logo {
    height: 64px;
    margin: 0;
    background: #1a1a27;
    border-bottom: 1px solid
        rgba(255, 255, 255, 0.05);
}

/* 菜单样式 */
.menu-transition {
    background: transparent !important;
}

.menu-item {
    transition: all 0.2s !important;
    margin: 4px 8px !important;
    border-radius: 6px !important;
    height: 42px !important;
    line-height: 42px !important;
}

:deep(.arco-menu-item-active) {
    background: rgba(
        124,
        58,
        237,
        0.15
    ) !important;
    color: #c084fc !important;
}

:deep(
    .arco-menu-item:hover:not(
            .arco-menu-item-active
        )
) {
    background: rgba(
        255,
        255,
        255,
        0.05
    ) !important;
    color: #e0e0e0 !important;
}

:deep(.arco-sub-menu-title) {
    transition: all 0.2s !important;
    margin: 4px 8px !important;
    border-radius: 6px !important;
    height: 42px !important;
    line-height: 42px !important;
}

:deep(
    .arco-sub-menu-title:hover:not(
            .arco-menu-item-active
        )
) {
    background: rgba(
        255,
        255,
        255,
        0.05
    ) !important;
    color: #e0e0e0 !important;
}

.icon-margin {
    margin-right: 8px;
}

/* 内容区域 */
.content-container {
    padding: 20px;
    background: var(--color-bg-3);
    border-radius: 8px;
    margin: 16px 0;
    min-height: calc(100vh - 180px);
    box-shadow: 0 2px 8px
        rgba(0, 0, 0, 0.05);
}

/* 页脚样式 */
.footer-style {
    height: 48px;
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 48px;
    text-align: center;
    border-top: 1px solid
        var(--color-border);
    margin-top: 16px;
}

/* 响应式调整 */
@media (max-width: 992px) {
    .content-container {
        padding: 16px;
        margin: 12px 0;
    }
}
</style>
