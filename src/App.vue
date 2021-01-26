<template>
  <div id="app">
    <div class="dashboard">
      <header>
        <h1>Your Sales Dashboard</h1>
        <section style="display: flex; align-items: center; margin-right: 26px;">
          <div style="margin-right:10px">Showing data from</div>
          <v-date-picker mode="range" v-model="range" :popover="{placement:'bottom-end'}" />
        </section>
      </header>
      <div class="dashboard">
        <section class="dashboard__summary">
          <total-sales-spark :values="transactions" :start="range.start" :end="range.end"/>
          <total-ytd-spark :values="transactions" :start="range.start" :end="range.end"/>
          <change-customers-spark :values="transactions"/>
        </section>
        <section class="content">
          <div class="content__col">
            <div class="content__row">
              <div class="cell" style="flex:2;">
                <latest-transactions ref="latestTransactions" :data="last30DaysTransactions" />
              </div>
              <div class="cell">
                <transaction-breakdown ref="transactionBreakdown" :data="transactions" />
              </div>
            </div>
            <div class="content__row">
              <div class="cell">
                <latest-transactions-grid :data="last30DaysTransactions" @mouseover="handleRowHover"/>
              </div>
            </div>
          </div>
          <div class="content__col">
            <div class="cell">
              <total-sales-per-month :data="transactions" />
            </div>
            <div class="cell">
              <year-to-date :data="transactions" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
  --light-blue: #2196f3;
}
h1 {
  margin: 0;
}
header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}
nav {
  display: flex;
  align-items: center;
}
a {
  color: var(--light-blue);
  text-decoration: none;
  font-size: 1.1rem;
}
a + a {
  margin: 0 1rem;
}
a:visited {
  color: var(--light-blue);
}
a:hover {
  text-decoration: none;
}
a.router-link-exact-active {
  font-weight: 500;
  border-bottom: 2px solid var(--light-blue);
}
/* LAYOUT */
.dashboard {
  width: 100%;
}
.dashboard__summary {
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 0;
}
.content {
  display: flex;
  height: 600px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}
.content__col {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 780px;
  max-width: 780px;
  min-height: 600px;
  max-height: 600px;
}
.content__col + .content__col {
  padding-left: 1rem;
  border-left: 1px solid #ddd;
}
.content__row {
  flex: 1;
  display: flex;
}
.cell {
  flex: 1;
  margin: 1rem;
}

/* SCORECARD */
.scorecard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
.scorecard__value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-blue);;
}
.scorecard__header {
  margin-top: 0.4rem;
}
.scorecard__subheader {
  font-size: 0.8rem;
}

/* CHEVRONS */
.chevron::before {
	border-style: solid;
	border-width: 0.15em 0.15em 0 0;
	content: '';
	display: inline-block;
	height: 0.45em;
	left: 0.15em;
	position: relative;
	top: 0.45em;
	transform: rotate(-45deg);
	vertical-align: top;
	width: 0.45em;
}
.chevron.right:before {
	left: 0;
	transform: rotate(45deg);
}
.chevron.bottom:before {
	top: .15em;
	transform: rotate(135deg);
}
.chevron.left:before {
	left: 0.25em;
	transform: rotate(-135deg);
}

@media only screen and (max-width: 700px) {
  .content__col {
    width: 100%;
    min-width: inherit;
    max-width: inherit;
  }
  .cell {
    width: 100%;
    overflow: scroll;
  }
}
</style>
<script>
import rawTransactions from "./dataset/transactions.js";
import TotalSalesPerMonth from "./components/TotalSalesPerMonth.vue";
import YearToDate from "./components/YearToDate.vue";
import TransactionBreakdown from "./components/TransactionBreakdown.vue";
import LatestTransactions from "./components/LatestTransactions.vue";
import LatestTransactionsGrid from "./components/LatestTransactionsGrid.vue";
import TotalSalesSpark from "./components/TotalSalesSpark.vue";
import TotalYTDSpark from "./components/TotalYTDSpark.vue";
import ChangeCustomersSpark from "./components/ChangeCustomersSpark.vue";

export default {
  name: "app",
  components: {
    LatestTransactions,
    LatestTransactionsGrid,
    TotalSalesPerMonth,
    YearToDate,
    TransactionBreakdown,
    TotalSalesSpark,
    "total-ytd-spark": TotalYTDSpark,
    ChangeCustomersSpark
  },
  computed: {
    transactions() {
      return this.rawTransactions.filter(entry => {
        return (
          entry.timestamp >= this.range.start.getTime() &&
          entry.timestamp < this.range.end.getTime()
        );
      });
    },
    // Limit by the last 30 days
    last30DaysTransactions() {
      let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
      return this.transactions.filter(entry => 
        this.range.end.getTime() - entry.timestamp < THIRTY_DAYS);
    }
  },
  methods: {
    handleRowHover(e) {
      // Set a guide on the LatestTransactions line chart to the corresponding row
      let ltChart = this.$refs.latestTransactions;
      const chartId = ltChart.$children[0].$el.getAttribute('id');
      window.zingchart.exec(chartId, 'setguide', {
        keyvalue : e.detail.ZGData.data.timestamp,
      });

      // Set a hoverState on the LatestTransactions pie chart
      let ltPie = this.$refs.transactionBreakdown;
      const pieId = ltPie.$children[0].$el.getAttribute('id');

      // Determine the node index that corresponds to the transaction type
      const data = window.zingchart.exec(pieId, 'getseriesdata');
      const index = data.findIndex((o) => {
        return o.text === e.detail.ZGData.data.purchase_type;
      });

     window.zingchart.exec(pieId, 'showhoverstate', {
        plotindex: index,
        nodeindex: 0,
      });
    },
  },
  data() {
    return {
      rawTransactions,
      range: {
        start: new Date(2019, 0, 1), 
        end: new Date(2019, 9, 8) 
      }
    };
  }
};
</script>

