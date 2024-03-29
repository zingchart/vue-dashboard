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
  
  let salesPerMonth = computed(() => {
    const monthSales = [];
    const currentYear = 2019;

    // Loop through all the customers and bucket each sale by month
    props.data.forEach((transaction) => {
      // Check the paid date if its within the calendar year.
      const paidDate = new Date(transaction.timestamp);
      if (paidDate.getFullYear() === currentYear) {
        if(transaction.purchase_type !== 'cancellation') {
          monthSales[paidDate.getMonth()] = monthSales[paidDate.getMonth()] || 0;
          monthSales[paidDate.getMonth()] += parseFloat(transaction.amount);
        }
      }
    });

    return monthSales;
  });

  let chartConfig = computed(() => {
    return {
      type: 'bar',
      title: {
        text: 'Sales Numbers by Month',
        adjustLayout: true,
        align: 'left',
        margin: 0,
      },
      series: [
        {
          values: salesPerMonth.value,
          text: 'Sales'
        }
      ],
      crosshairX:{
        plotLabel: {
          negation: 'currency',
          text: '$%v',
          thousandsSeparator: ','
        }
      },
      tooltip: { visible: false },
      plotarea: {
        margin: '35 20 60 50'

      },
      plot: {
        animation:{
          effect: 4,
          speed: 200,
          method: 5,
          sequence: 3
        },
      },
      scaleX: {
        step: 'month',
        minValue: firstDayOfTheCurrentYear(),
        label: {
          text: 'Month/Year',
        },
        transform: {
          type: 'date',
          all: '%m/%y',
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

  function firstDayOfTheCurrentYear() {
    const today = new Date();
    return new Date('1/1/' + today.getFullYear()).getTime();
  }
</script>

<template>
  <ZingChart :data="chartConfig" :theme="theme" :width="width" :height="'100%'"/>
</template>
