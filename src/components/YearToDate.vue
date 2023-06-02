<script setup>
  import { computed } from 'vue';
  import theme from '../theme/theme.js';

  const props = defineProps({
    data: {
      type: Array,
      required: false
    },
  });
  
  let expectedYTD = [
    80000,
    120000,
    300000,
    350000,
    400000,
    500000,
    600000,
    620000,
    700000,
    730000
  ];

  let chartConfig = computed(() => {
    return {
      type: 'bar',
      title: {
        text: 'Projected Revenue'
      },
      plot: {
        animation: {
          effect: 11,
          speed: 400,
          method: 11,
          sequence: 1
        }
      },
      series: [
        {
          values: expectedYTD,
          text: 'Projected'
        },
        {
          values: yearToDate.value,
          text: 'Actual'
        }
      ],
      tooltip: {
        negation: 'currency',
        text: '$%v',
        thousandsSeparator: ','
      },
      legend: {},
      scaleX: {
        step: 'month',
        minValue: firstDayOfTheCurrentYear(),
        label: {
          text: 'Month/Year'
        },
        transform: {
          type: 'date',
          all: '%m/%y'
        }
      },
      scaleY: {
        short: true,
        shortUnit: 'K'
      }
    };
  });

  let yearToDate = computed(() => {
    const monthSales = [];
    const currentYear = new Date().getFullYear();
    // Loop through all the customers and bucket each sale by month
    props.data.forEach(transaction => {
      // Check the paid date if its within the calendar year.
      const paidDate = new Date(transaction.timestamp);
      if (paidDate.getFullYear() === currentYear) {
        if (transaction.purchase_type !== 'cancellation') {
          monthSales[paidDate.getMonth()] =
            monthSales[paidDate.getMonth()] || 0;
          monthSales[paidDate.getMonth()] += parseFloat(transaction.amount);
        }
      }
    });
    let total = 0;
    return monthSales.map(amount => {
      total += amount;
      return total;
    });
  });

  function firstDayOfTheCurrentYear() {
    const today = new Date();
    return new Date('1/1/' + today.getFullYear()).getTime();
  }
</script>

<template>
  <ZingChart :data="chartConfig" :theme="theme" :height="'100%'" />
</template>
