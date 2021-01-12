<template>
  <zingchart :data="chartConfig" :theme="theme" :width="width" :height="'100%'"/>
</template>

<script>
import theme from '../theme/theme.js';
export default {
 props: ['data', 'width'],
  data() {
    return {
      theme,
    };
  },
  computed: {
    transactions() {
      let sorted = this.data.slice(0).sort((a,b) => a.timestamp - b.timestamp);
      return sorted.map(o => {
        return [o.timestamp, parseFloat(o.amount.slice(1,-1))]
      });
    },

    chartConfig() {
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
            values: this.transactions,
            text: 'Sales'
          }
        ],
        plot: {
          aspect: 'spline',
          marker: {
            visible: false,
          },
          animation: {
              effect: "ANIMATION_SLIDE_LEFT",
          },
        },
        crosshairX:{
          plotLabel :{
            negation: "currency",
            text: '$%v',
            'thousands-separator': ","
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
    
    }
  }
};

</script>