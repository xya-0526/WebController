<template>
    <div
        class="flex flex-col md:flex-row gap-4"
    >
        <!-- 分类选择 -->
        <select
            v-model="localCategory"
            class="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
            <option value="">
                选择分类
            </option>
            <option value="Nest">
                Nest.js
            </option>
            <option value="ES6">
                ES6
            </option>
            <option value="JavaScript">
                JavaScript
            </option>
            <option value="Css">
                Css
            </option>
            <option value="TypeScript">
                TypeScript
            </option>
            <option value="TypeScript">
                Vue
            </option>
            <option value="TypeScript">
                React
            </option>
        </select>

        <!-- 标签输入 -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    category: string
}>()
const emit = defineEmits<{
    (
        e: 'update:category',
        v: string
    ): void
    (
        e: 'update:tags',
        v: string[]
    ): void
}>()
const localCategory = computed({
    get: () => props.category,
    set: (v) =>
        emit('update:category', v)
})
</script>
