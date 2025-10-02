<template>
    <div class="w-full h-[100%]">
        <v-md-editor
            v-model="localValue"
            height="100%"
            class="rounded-xl border border-gray-200 shadow-md overflow-hidden transition-all hover:shadow-lg"
        ></v-md-editor>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: string
}>()
const emit = defineEmits<{
    (
        e: 'update:modelValue',
        value: string
    ): void
}>()

const localValue = computed({
    get: () => props.modelValue,
    set: (val) =>
        emit('update:modelValue', val)
})
</script>

<style scoped></style>
