<template>
  <div class="scorecard" @mouseleave="setGuide">
    <zingchart
      ref="chart"
      :data="chart"
      :values="accumulatedValues"
      :width="100"
      :height="50"
      @guide_mousemove="changeValue"
    />
    <div class="scorecard__value">{{currentValue}}</div>
    <div class="scorecard__header">Total Sales this Year</div>
  </div>
</template>

<script>
export default {
  props: {
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
      default: "line"
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  },
  methods: {
    formatValue(value) {
      return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    },
    changeValue(e) {
      this.currentValue = this.formatValue(e.items[0].value);
    },
    setGuide() {
      window.zingchart.exec(this.$refs.chart.$el.getAttribute("id"), "setguide", {
        keyvalue: this.accumulatedValues.length - 1
      });
    }
  },
  mounted() {
    this.setGuide();
  },
  watch: {
    values() {
      this.currentValue = this.formatValue(
        this.accumulatedValues[this.accumulatedValues.length - 1]
      );
    }
  },
  computed: {
    thisYearsTransactions() {
      const date = this.end;
      const currentYear = date.getFullYear();

      const min = new Date(`1/1/${currentYear}`).getTime();
      const max = date.getTime();

      const list = this.values.filter(entry => {
        let time = entry.timestamp;
        return time >= min && time < max;
      });
      return list;
    },
    accumulatedValues() {
      let total = 0;
      const result = this.thisYearsTransactions.map(
        entry => (total += parseFloat(entry.amount))
      );
      return result;
    },
    chart() {
      return {
        type: "area",
        theme: "spark",
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
          margin: "15px"
        },
        plot: {
          lineWidth: 3,
          rules: [
            {
              rule: "%v > 0",
              "line-color": "#04A3F5"
            },
            {
              rule: "%v < 0",
              "line-color": "#295A73"
            }
          ]
        },
        tooltip: {
          visible: false
        },
        series: [
          {
            values: this.accumulatedValues,
            lineColor: "#04A3F5"
          }
        ]
      };
    }
  },
  data() {
    return {
      currentValue: null
    };
  }
};
</script>

<style scoped>
</style>