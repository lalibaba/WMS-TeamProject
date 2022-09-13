<template>
  <el-table
    :data="tablelist"
    style="width: 100%"
    :cell-style="{border: '0px',padding: '7px 0px'}"
    :row-style="{padding: '30px'}"
    @selection-change="selectionchange"
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
  },
  methods: {
    selectionchange(selection) {
      const arr = []
      selection.forEach((ele, index) => {
        arr.push(ele.id)
      })
      this.$emit('selectionchange', arr)
    }
  }
}
</script>
<style scoped>
</style>
