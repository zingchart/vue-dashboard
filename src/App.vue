<script setup>
  import { computed, ref } from 'vue';

  import rawTransactions from "./dataset/transactions.js";
  import TotalSalesPerMonth from "./components/TotalSalesPerMonth.vue";
  import YearToDate from "./components/YearToDate.vue";
  import TransactionBreakdown from "./components/TransactionBreakdown.vue";
  import LatestTransactions from "./components/LatestTransactions.vue";
  import LatestTransactionsGrid from "./components/LatestTransactionsGrid.vue";
  import TotalSalesSpark from "./components/TotalSalesSpark.vue";
  import TotalYTDSpark from "./components/TotalYTDSpark.vue";
  import ChangeCustomersSpark from "./components/ChangeCustomersSpark.vue";

  let latestTransactions = ref();
  let transactionBreakdown = ref();

  let range = ref({
    start: new Date(2019, 0, 1), 
    end: new Date(2019, 9, 8) 
  });

  let transactions = computed(() => {
    return rawTransactions.filter(entry => {
      return (
        entry.timestamp >= range.value.start.getTime() &&
        entry.timestamp < range.value.end.getTime()
      );
    })
  });

  // Limit by the last 30 days
  let last30DaysTransactions = computed(() => {
    let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
    return transactions.value.filter(entry => 
      range.value.end.getTime() - entry.timestamp < THIRTY_DAYS);
  });

  function handleRowHover(e) {
    // Set a guide on the LatestTransactions line chart to the corresponding row
    const chartId = latestTransactions.value.id;
    zingchart.exec(chartId, 'setguide', {
      keyvalue : e.detail.ZGData.data.timestamp,
    });

    // Set a hoverState on the LatestTransactions pie chart
    const pieId = transactionBreakdown.value.id;

    // Determine the node index that corresponds to the transaction type
    const data = zingchart.exec(pieId, 'getseriesdata');
    const index = data.findIndex((o) => {
      return o.text === e.detail.ZGData.data.purchase_type;
    });

    zingchart.exec(pieId, 'showhoverstate', {
      plotindex: index,
      nodeindex: 0,
    });
  };
</script>

<template>
  <div id="app">
    <div class="dashboard">
      <header>
        <h1>Your Sales Dashboard</h1>
        <section style="display: flex; align-items: center; margin-right: 26px;">
          <div style="margin-right:10px">Showing data from</div>
          <!-- <VDatePicker v-model.range="range" :hide-time-header="true" :popover="{placement:'bottom-end'}" /> -->
          <VDatePicker v-model.range="range">
            <template #default="{ togglePopover }">
              <button @click="togglePopover">
                Select date
              </button>
            </template>
          </VDatePicker>
        </section>
      </header>
      <div class="dashboard">
        <section class="dashboard__summary">
          <TotalSalesSpark :values="transactions" :start="range.start" :end="range.end" />
          <TotalYTDSpark :values="transactions" :start="range.start" :end="range.end" />
          <ChangeCustomersSpark :values="transactions" />
        </section>
        <section class="content">
          <div class="content__col">
            <div class="content__row">
              <div class="cell" style="flex:2;">
                <LatestTransactions ref="latestTransactions" :data="last30DaysTransactions" />
              </div>
              <div class="cell">
                <TransactionBreakdown ref="transactionBreakdown" :data="transactions" />
              </div>
            </div>
            <div class="content__row">
              <div class="cell">
                <LatestTransactionsGrid :data="last30DaysTransactions" @mouseover="handleRowHover" />
              </div>
            </div>
          </div>
          <div class="content__col">
            <div class="cell">
              <TotalSalesPerMonth :data="transactions" />
            </div>
            <div class="cell">
              <YearToDate :data="transactions" />
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
