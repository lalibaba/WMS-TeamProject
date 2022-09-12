<template>
  <el-table
    :data="tablelist"
    style="width: 100%"
    :cell-style="{border: '0px',padding: '7px 0px'}"
    :row-style="{padding: '30px'}"
  >
    <slot name="table" />
  </el-table>
</template>
<script>
export default {
  name: 'Table',
  props: {
    tablelist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  created() {
    console.log(this.tableData)
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style scoped>

</style>
