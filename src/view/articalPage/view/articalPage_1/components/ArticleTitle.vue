<template>
    <input
        v-model="localValue"
        type="text"
        placeholder="请输入文章标题..."
        class="w-full text-3xl font-bold text-gray-900 border-0 border-b-3 border-gray-200 px-3 py-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300 bg-white rounded-t-xl shadow-sm"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    modelValue: string
}>()
const emit = defineEmits<{
    (
        e: 'update:modelValue',
        v: string
    ): void
}>()
const localValue = computed({
    get: () => props.modelValue,
    set: (v) =>
        emit('update:modelValue', v)
})
</script>

<style scoped>
input::placeholder {
    color: #c084fc;
    opacity: 0.7;
}
</style>
