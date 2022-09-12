<template>
  <div class="mypage">
    <el-pagination
      :page-size="10"
      :page-sizes="[10,20,30,40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Mypage1',
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    currentpage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('currentpage', val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.mypage{
  text-align: center;
}
</style>
