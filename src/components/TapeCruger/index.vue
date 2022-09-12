<template>
  <div class="container">
    <slot name="new" />
  </div>
</template>

<script>
export default {
  name: 'TapeCruger',
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
    /* min-height: 200px; */
    overflow: hidden;
    overflow-x: auto;
    padding: 30px;
    margin: 20px;
    background-color: #ffffff;
    border-radius:12px;
    box-shadow: 0px 0px 20px #eeeeee;
}
</style>
