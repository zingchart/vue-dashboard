<template>
  <zingchart :data="chartConfig" :theme="theme" :width="width" :height="'100%'" />
</template>

<script>
import theme from "../theme/theme.js";
export default {
  props: ["data", "width"],
  data() {
    return {
      theme
    };
  },
  computed: {
    salesPerMonth() {
      let types = ["referral", "organic", "marketing", "legacy", "unknown"];
      this.data.map(customer => {
        if (parseInt(Math.random() * 10) % 2 === 0) {
          customer.acquisition = types[parseInt(Math.random() * 2)];
        } else {
          customer.acquisition = types[parseInt(Math.random() * 4)];
        }
        return customer;
      });

      const monthSales = [];
      const currentYear = new Date().getFullYear();

      // Loop through all the customers and bucket each sale by month
      this.data.forEach(customer => {
        let customerTotal = 0;
        customer.products.forEach(product => {
          // Check the paid date if its within the calendar year.
          const paidDate = new Date(product.paid);
          if (paidDate.getFullYear() === currentYear) {
            monthSales[paidDate.getMonth()] = product.price * product.quantity;
          }
        });
      });
      return monthSales;
    },
    chartConfig() {
      return {
        type: "area",
        title: {
          text: "Daily Campaign Tracker",
          align: "left",
          margin: 0
        },
        series: [
          {
            values: [24, 54, 43, 65, 76, 34, 34],
            text: "Twitter"
          },
          {
            values: [54, 68, 43, 46, 43, 46, 89],
            text: "Facebook"
          },
          {
            values: [23, 53, 43, 13, 68, 35, 34],
            text: "Keywords"
          }
        ],
        legend: {},
        crosshairX: {},
        tooltip: { visible: false },
        plot: {
          stacked: true
        },
        plotarea: {
          margin: "35 20 60 50"
        },
        scaleX: {
          labels: ["Mon", "Tue", "Weds", "Thurs", "Fri", "Sat", "Sun"]
        },
        scaleY: {
          label: {
            text: "Number of inbound visits"
          }
        }
      };
    }
  }
};

function firstDayOfTheCurrentYear() {
  const today = new Date();
  return new Date("1/1/" + today.getFullYear()).getTime();
}
</script>