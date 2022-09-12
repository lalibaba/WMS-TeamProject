<template>
  <div class="container">
    <slot name="buttom" />
  </div>
</template>

<script>
export default {
  name: 'Libraryfrom',
  components: {
  },
  props: {
  },
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.container{
    min-height: 630px;
    overflow: hidden;
    overflow-x: auto;
        margin: 20px;
    background-color: #ffffff;
    border-radius:12px;
    box-shadow: 0px 0px 20px #eeeeee;
}
</style>
