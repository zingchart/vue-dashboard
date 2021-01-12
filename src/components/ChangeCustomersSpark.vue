<template>
  <div class="scorecard" @mouseleave="setGuide">
    <zingchart
      ref="chart"
      :data="chart"
      :values="customerChange"
      :width="100"
      :height="50"
      @guide_mousemove="changeValue"
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
    }
  },
  mounted() {
    this.setGuide();
  },
  methods: {
    changeValue(e) {
      this.currentValue = e.items[0].value;
    },
    setGuide() {
      window.zingchart.exec(this.$refs.chart.$el.getAttribute("id"), "setguide", {
        keyvalue: this.customerChange.length - 1
      });
    }
  },
  computed: {
    changeClass() {
      return this.currentValue > 0 ? "change--positive" : "change--negative";
    },
    customerChange() {
      let monthChange = {};
      this.values.forEach(val => {
        const date = new Date(val.timestamp);
        const key = date.getMonth() + "-" + date.getFullYear();
        switch (val.purchase_type) {
          case "new":
            monthChange[key] = monthChange[key] || 0;
            monthChange[key]++;
            break;
          case "cancellation":
            monthChange[key] = monthChange[key] || 0;
            monthChange[key]--;
            break;
        }
      });
      const res = Object.keys(monthChange).map(month => {
        return monthChange[month];
      });
      return res;
    },
    chart() {
      const config = {
        type: "line",
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
            values: this.customerChange,
            lineColor: "#04A3F5",
            backgroundColor: "#04A3F5"
          }
        ]
      };
      return config;
    }
  },
  data() {
    return {
      baseTotalCustomers: 2000,
      currentValue: this.values[this.values.length - 1]
    };
  }
};
</script>