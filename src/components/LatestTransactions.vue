<script setup>
  import { computed } from 'vue';
  import theme from '../theme/theme.js';

  const props = defineProps({
    data: {
      type: Array,
      required: false
    },
    width: {
      type: String,
      required: false
    },
  });

  const id = 'latestTransactions';

  defineExpose({
    id
  });

  let transactions = computed(() => {
    let sorted = props.data.slice(0).sort((a,b) => a.timestamp - b.timestamp);
    return sorted.map(o => {
      return [o.timestamp, parseFloat(o.amount.slice(1,-1))]
    });
  });

  let chartConfig = computed(() => {
    return {
      type: 'line',
      title: {
        text: 'Latest Transactions',
        adjustLayout: true,
        align: 'left',
        margin: 0,
      },
      subtitle: {
        text: 'Last 30 days',
        align: 'left'
      },
      series: [
        {
          values: transactions.value,
          text: 'Sales'
        }
      ],
      plot: {
        aspect: 'spline',
        marker: {
          visible: false,
        },
        animation: {
            effect: 'ANIMATION_SLIDE_LEFT',
        },
      },
      crosshairX:{
        plotLabel :{
          negation: 'currency',
          text: '$%v',
          thousandsSeparator: ','
        },
        marker: {
          visible: false,
        }
      },
      tooltip: { 
        visible: false,

      },
      plotarea: {
        margin: '35 35 60 60'

      },
      scaleX: {
        transform: {
          type: 'date',
          all: '%M %d',
        }
      },
      scaleY: {
        label: {
          text: 'Amount in USD',
        },
        short:true,
        shortUnit: 'K',
      }
    };
  });
</script>

<template>
  <ZingChart :id="id" :data="chartConfig" :theme="theme" :width="width" :height="'100%'"/>
</template>
