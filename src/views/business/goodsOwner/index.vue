<template>
  <div>演示</div>
</template>

<script>
import { getownerList } from '@/api'
export default {
  name: 'GoodsOwner',

  data() {
    return {
      options: {
        // size: 10,
        // current: 1,
        // descs: 'createTime'
      }
    }
  },

  mounted() {
    this.getownerList()
  },

  methods: {
    async getownerList() {
      const res = await getownerList(this.options)
      console.log(res)
    }
  }
}
</script>

<style   scoped>

</style>
