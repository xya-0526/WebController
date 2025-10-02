<template>
    <div
        ref="chartDom2"
        class="w-[25%] aspect-square absolute top-[1rem] right-[1rem] bg-white rounded-2xl shadow-md"
    ></div>
</template>

<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick
} from 'vue'
import * as echarts from 'echarts'

const chartDom2 = ref(null)
let chartInstance: unknown = null

onMounted(async () => {
    await nextTick()
    chartInstance = echarts.init(
        chartDom2.value
    )

    // 定义渐变颜色数组，与主色调协调
    const colors = [
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#A548C2'
                },
                {
                    offset: 1,
                    color: '#8A2BE2'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#7B68EE'
                },
                {
                    offset: 1,
                    color: '#483D8B'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#3F2B96'
                },
                {
                    offset: 1,
                    color: '#2A1B81'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#9370DB'
                },
                {
                    offset: 1,
                    color: '#663399'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#BA55D3'
                },
                {
                    offset: 1,
                    color: '#9370DB'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#8A2BE2'
                },
                {
                    offset: 1,
                    color: '#9932CC'
                }
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
                {
                    offset: 0,
                    color: '#9400D3'
                },
                {
                    offset: 1,
                    color: '#800080'
                }
            ]
        )
    ]

    const option = {
        title: {
            x: 15,
            y: 15,
            show: true,
            text: '技术博文',
            textStyle: {
                color: '#3F2B96',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
            },
            subtext: '分类占比',
            subtextStyle: {
                color: '#6B7280',
                fontSize: '0.7rem'
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor:
                'rgba(255, 255, 255, 0.95)',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            textStyle: {
                color: '#1F2937',
                fontSize: '0.8rem'
            },
            formatter:
                '{a} <br/>{b}: {c} ({d}%)',
            boxShadow:
                '0 2px 8px rgba(0, 0, 0, 0.1)'
        },
        legend: {
            icon: 'circle',
            bottom: 15,
            left: 'center',
            itemHeight: 8,
            itemWidth: 8,
            itemGap: 12,
            textStyle: {
                fontSize: '0.65rem',
                color: '#4B5563'
            },
            formatter: function (name) {
                // 限制图例文字长度，过长显示省略号
                if (name.length > 6) {
                    return (
                        name.substring(
                            0,
                            6
                        ) + '...'
                    )
                }
                return name
            }
        },
        series: [
            {
                name: '文章数量',
                type: 'pie',
                radius: ['65%', '45%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    color: function (
                        params
                    ) {
                        return colors[
                            params
                                .dataIndex
                        ]
                    },
                    borderRadius: 4, // 扇形边缘圆角
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize:
                            '1rem',
                        fontWeight:
                            'bold',
                        color: '#3F2B96',
                        formatter:
                            '{d}%'
                    },
                    scale: true, // 选中时放大效果
                    scaleSize: 5,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor:
                            'rgba(165, 72, 194, 0.3)'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 1048,
                        name: 'Vue'
                    },
                    {
                        value: 735,
                        name: 'Nest.js'
                    },
                    {
                        value: 580,
                        name: 'React'
                    },
                    {
                        value: 484,
                        name: 'ES6'
                    },
                    {
                        value: 300,
                        name: 'TypeScript'
                    },
                    {
                        value: 200,
                        name: 'JavaScript'
                    },
                    {
                        value: 150,
                        name: 'Css'
                    }
                ],
                // 动画效果
                animationDuration: 1500,
                animationEasing:
                    'cubicOut',
                animationDelay:
                    function (idx) {
                        return idx * 100
                    }
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
        chartInstance != null &&
        chartInstance.dispose
    ) {
        chartInstance.dispose()
    }
})
</script>
