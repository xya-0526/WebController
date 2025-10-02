<template>
    <div class="flex gap-3">
        <a-button
            type="primary"
            shape="round"
            @click="$emit('save')"
            >保存草稿</a-button
        >
        <a-button
            v-if="!id"
            type="primary"
            shape="round"
            @click="$emit('publish')"
            >发布文章</a-button
        >
        <a-button
            v-else
            type="primary"
            shape="round"
            @click="$emit('updata')"
            >更新文章</a-button
        >
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'save'): void
    (e: 'publish'): void
    (e: 'updata'): void
}>()
defineProps<{
    id: string | number | undefined
}>()
</script>
