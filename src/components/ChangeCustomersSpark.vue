<script setup>
  import { computed, onMounted, ref} from 'vue';
  
  const props = defineProps({
    values: {
      type: Array,
      required: false
    },
    formatter: {
      type: Function,
      required: false
    },
    type: {
      type: String,
      default: 'line'
    }
  });

  const chart = ref(null);

  let changeClass = computed(() => {
    return currentValue.value > 0 ? 'change--positive' : 'change--negative';
  });

  let customerChange = computed(() => {
    let monthChange = {};
    props.values.forEach(val => {
      const date = new Date(val.timestamp);
      const key = date.getMonth() + '-' + date.getFullYear();
      switch (val.purchase_type) {
        case 'new':
          monthChange[key] = monthChange[key] || 0;
          monthChange[key]++;
          break;
        case 'cancellation':
          monthChange[key] = monthChange[key] || 0;
          monthChange[key]--;
          break;
      }
    });
    const res = Object.keys(monthChange).map(month => {
      return monthChange[month];
    });
    return res;
  });

  let chartConfig = computed(() => {
    const config = {
      type: 'line',
      theme: 'spark',
      crosshairX: {
        alpha: 0,
        marker: {
          visible: true,
          size: 5
        },
        plotLabel: {
          alpha: 0
        },
        scaleLabel: {
          visible: false
        }
      },
      plotarea: {
        margin: '15px'
      },
      plot: {
        lineWidth: 3,
        rules: [
          {
            rule: '%v > 0',
            lineColor: '#04A3F5'
          },
          {
            rule: '%v < 0',
            lineColor: '#295A73'
          }
        ]
      },
      tooltip: {
        visible: false
      },
      series: [
        {
          values: customerChange.value,
          lineColor: '#04A3F5',
          backgroundColor: '#04A3F5'
        }
      ]
    };
    return config;
  });

  let currentValue = ref(props.values[props.values.length-1]);

  function changeValue(e) {
    currentValue.value = e.items[0].value;
  };

  function setGuide() {
    chart.value.setguide({ keyvalue: customerChange.value.length - 1 });
  };

  onMounted(() => {
    setGuide();
  });
</script>

<template>
  <div class="scorecard" @mouseleave="setGuide">
    <ZingChart
      ref="chart"
      :data="chartConfig"
      :values="customerChange"
      :width="100"
      :height="50"
      @guideMousemove="changeValue"
    />
    <div class="scorecard__value" :class="changeClass">
      <span v-if="currentValue < 0" class="chevron bottom"></span>
      <span v-else class="chevron top"></span>
      &nbsp;
      <span>{{Math.abs(currentValue)}}</span>
    </div>
    <div class="scorecard__header">Change in Customers</div>
    <div class="scorecard__subheader">from the month prior</div>
  </div>
</template>
<style scoped>
.change--positive {
  color: #04a3f5;
}
.change--negative {
  color: #295a73;
}
</style>
