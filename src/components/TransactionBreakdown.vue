<script setup>
  import { computed } from 'vue';
  import theme from '../theme/theme.js';

  const props = defineProps({
    data: {
      type: Array,
      required: false
    },
  });

  const id = 'transactionBreakdown';

  defineExpose({
    id
  });
  
  let acquisitionBreakdown = computed(() => {
    const categories = props.data.reduce((acc, transaction) => {
      acc[transaction.purchase_type] = acc[transaction.purchase_type] || 0;
      acc[transaction.purchase_type]++;
      return acc;
    }, {});
    return categories;
  });

  let chartConfig = computed(() => {
    const colors = [
      {
        backgroundColor: '#04A3F5',
        hoverState: {
          backgroundColor: '#45D6C4',
        },
      },
      {
        backgroundColor: '#98D1EE',
        hoverState: {
          backgroundColor: '#45D6C4',
        },
      },
      {
        backgroundColor: '#295A73',
        hoverState: {
          backgroundColor: '#45D6C4',
        },
      },
    ];
    const config = {
      type: 'pie',
      tooltip: {
        text: '%npv%',
      },
      plotarea: {
        margin: '5',
      },
      plot: {
        valueBox: {
          fontSize: 10,
          text: '%t',
        },
        animation: {
          effect: 2,
          speed: 400,
          method: 3,
          sequence: 3,
          delay: 2000,
        },
        hoverState: {
          borderWidth: 2,
        },
      },
      series: Object.keys(acquisitionBreakdown.value).map((type, index) => {
        return Object.assign(
          { values: [acquisitionBreakdown.value[type]], text: type },
          colors[index]
        );
      }),
    };
    return config;
  });
</script>

<template>
  <ZingChart :id="id" :data="chartConfig" :theme="theme" :height="'100%'" />
</template>
