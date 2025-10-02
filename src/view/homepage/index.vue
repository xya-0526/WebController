<template>
    <div class="w-full h-full relative">
        <statisticalCharts></statisticalCharts>
        <PaiCharts></PaiCharts>
        <SpeekAction></SpeekAction>
    </div>
</template>
<script setup lang="ts">
import statisticalCharts from '@view/homepage/components/statisticalCharts.vue'
import PaiCharts from '@view/homepage/components/PaiCharts.vue'
import SpeekAction from '@view/homepage/components/SpeekAction.vue'
</script>
