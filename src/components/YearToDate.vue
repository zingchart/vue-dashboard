<template>
  <zingchart :data="chartConfig" :theme="theme" :height="'100%'" />
</template>

<script>
import theme from "../theme/theme.js";
export default {
  props: ["data"],
  data() {
    return {
      theme,
      expectedYTD: [
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
      ]
    };
  },
  computed: {
    chartConfig() {
      return {
        type: "bar",
        title: {
          text: "Projected Revenue"
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
            values: this.expectedYTD,
            text: "Projected"
          },
          {
            values: this.yearToDate,
            text: "Actual"
          }
        ],
        tooltip: {
          negation: "currency",
          text: "$%v",
          "thousands-separator": ","
        },
        legend: {},
        scaleX: {
          step: "month",
          minValue: firstDayOfTheCurrentYear(),
          label: {
            text: "Month/Year"
          },
          transform: {
            type: "date",
            all: "%m/%y"
          }
        },
        scaleY: {
          short: true,
          shortUnit: "K"
        }
      };
    },
    yearToDate() {
      const monthSales = [];
      const currentYear = new Date().getFullYear();
      // Loop through all the customers and bucket each sale by month
      this.data.forEach(transaction => {
        // Check the paid date if its within the calendar year.
        const paidDate = new Date(transaction.timestamp);
        if (paidDate.getFullYear() === currentYear) {
          if (transaction.purchase_type !== "cancellation") {
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
    }
  }
};
function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date("1/1/" + today.getFullYear()).getTime();
}
</script>