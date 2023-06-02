<script setup>
  import { computed, onMounted, ref, watch } from 'vue';

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
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  });

  const chart = ref();

  function formatValue(value) {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  function changeValue(e) {
    currentValue.value = formatValue(e.items[0].value);
  };

  function setGuide() {
    chart.value.setguide({ keyvalue: accumulatedValues.value.length - 1 });
  };

  watch(() => props.values, () => {
    currentValue.value = formatValue(
      accumulatedValues.value[accumulatedValues.value.length - 1]
    );
  });

  let thisYearsTransactions = computed(() => {
    const date = props.end;
    const currentYear = date.getFullYear();

    const min = new Date(`1/1/${currentYear}`).getTime();
    const max = date.getTime();

    const list = props.values.filter(entry => {
      let time = entry.timestamp;
      return time >= min && time < max;
    });
    return list;
  });

  let accumulatedValues = computed(() => {
    let total = 0;
    const result = thisYearsTransactions.value.map(
      entry => (total += parseFloat(entry.amount))
    );
    return result;
  });

  let chartConfig = computed(() => {
    return {
      type: 'area',
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
          values: accumulatedValues.value,
          lineColor: '#04A3F5'
        }
      ]
    };
  });

  let currentValue = ref(formatValue(
    accumulatedValues.value[accumulatedValues.value.length - 1]
  ));

  onMounted(() => {
    setGuide();
  });
</script>

<template>
  <div class="scorecard" @mouseleave="setGuide">
    <ZingChart
      ref="chart"
      :data="chartConfig"
      :values="accumulatedValues"
      :width="100"
      :height="50"
      @guideMousemove="changeValue"
    />
    <div class="scorecard__value">{{currentValue}}</div>
    <div class="scorecard__header">Total Sales this Year</div>
  </div>
</template>