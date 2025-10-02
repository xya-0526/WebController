<template>
    <div
        class="w-[60%] aspect-[2.5/1] relative left-[3rem] top-[3rem] bg-white rounded-2xl shadow-md"
    >
        <div
            ref="chartDom"
            class="w-[100%] aspect-[2.5/1] bg-gradient-to-r from-[#A548C2] to-[#3F2B96] rounded-2xl absolute bottom-4 right-4"
        ></div>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick
} from 'vue'
import * as echarts from 'echarts'

let Data = ref([
    10, 20, 30, 10, 40, 10, 50
])
const chartDom = ref(null)
let chartInstance: any = null

onMounted(async () => {
    await nextTick()
    chartInstance = echarts.init(
        chartDom.value
    )

    const option = {
        title: {
            text: '每日访问量',
            left: 'center',
            top: 15,
            textStyle: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor:
                'rgba(0, 0, 0, 0.7)',
            borderRadius: 8,
            padding: 12,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        legend: {
            data: ['访问量'],
            top: 45,
            left: 'center',
            textStyle: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            top: '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun'
            ],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 12
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value} 人',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: '访问量',
                type: 'bar',
                data: Data.value,
                barWidth: '60%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: 'rgba(255, 255, 255, 0.9)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255, 0.4)'
                            }
                        ]
                    ),
                    borderRadius: [
                        6, 6, 0, 0
                    ]
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#ffffff'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255, 0.6)'
                                }
                            ]
                        )
                    }
                },
                animationDuration: 1500,
                animationEasing:
                    'elasticOut'
            }
        ]
    }

    window.addEventListener(
        'resize',
        function () {
            chartInstance.resize()
        }
    )

    chartInstance.setOption(option)
})

onUnmounted(() => {
    if (
        chartInstance &&
        chartInstance.dispose
    ) {
        chartInstance.dispose()
    }
})
</script>
