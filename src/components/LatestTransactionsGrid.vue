<template>
  <zing-grid
    ref="myGrid"
    caption="Latest Transactions"
    layout="row"
    pager
    page-size="3"
    page-size-options="2,5,20"
    control-bar="false"
    style="width: 100%;"
    sort
    filter
    height="150px"
    :data.prop="data"
  >
    <zg-colgroup>
      <zg-column index="timestamp" header="Date" type="date" ></zg-column>
      <zg-column index="company" header="Company" type="text"></zg-column>
      <zg-column index="amount" header="Cost" type="currency"></zg-column>
      <zg-column index="license_type" header="License" type="select"
      type-select-options="enterprise,saas,website"></zg-column>
      <zg-column index="purchase_type" header="Type" type="select" type-select-options="renewal, new, cancellation"></zg-column>
    </zg-colgroup>
  </zing-grid>
</template>

<script>
export default {
  props: ['data'],
  mounted() {

    // Attach an event listener to ZingGrid
    this.$refs.myGrid.addEventListener('record:mouseover', (e) => {
      this.$emit('mouseover', e);
    });
  }
}
</script>
<style>
zg-head-cell {
  background: white;
  color: #5d7d9a;
  font-size: 1rem;
}
zg-row:nth-child(odd) {
  background: rgb(250, 250, 250);
}
zg-control-bar {
  display: none;
}
zg-caption {
  background: #5d7d9a;
  font-weight: bold;
  display: none;
}
zing-grid {
  border: 0px;
}

zing-grid input[type="text"], zing-grid input[type="number"]{
  border-radius: 5px;
}

</style>