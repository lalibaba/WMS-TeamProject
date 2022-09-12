<template>
  <div class="container-box">
    <el-form class="demo-form-inline" label-position="top">
      <el-row type="flex">
        <el-col class="form-row-col" :span="6">
          <el-form-item :label="input1">
            <el-input v-model="searchdata.value1" placeholder="请输入" class="inputbox" clearable />
          </el-form-item>
        </el-col>
        <el-col class="form-row-col" :span="6">
          <el-form-item :label="input2">
            <el-input v-model="searchdata.value2" placeholder="请输入" class="inputbox" clearable />
          </el-form-item>
        </el-col>
        <el-col class="form-row-col" :span="6">
          <el-form-item :label="input3">
            <el-input v-model="searchdata.value3" placeholder="请输入" class="inputbox" clearable />
          </el-form-item>
        </el-col>
        <el-col class="form-row-col rightbtnbox" :span="6">
          <div class="btn-box">
            <el-button class="search" @click="search">搜索</el-button>
            <el-button class="reset" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    input1: {
      type: String,
      default: ''
    },
    input2: {
      type: String,
      default: ''
    },
    input3: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchdata: {
        value1: '',
        value2: '',
        value3: ''
      }
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchdata)
    },
    reset() {
      this.searchdata = {
        value1: '',
        value2: '',
        value3: ''
      }
      this.$emit('reset', this.searchdata)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-box{
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    // margin: 30px 30px 0 30px;
    margin-bottom: 20px;
    padding: 30px;
    .form-row-col{
      padding: 0 15px;
      .el-form-item{
        margin-bottom: 0px;
      }
    }
    .rightbtnbox{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding: 0px;
    }
    .btn-box{
      text-align: end;
      justify-content: end;
      .search{
        width: 90px;
        height: 40px;
        color: black;
        background: rgb(255, 178, 0);
        box-shadow: 0px 2px 9px rgba(255, 178, 0, 0.47);;
        border-radius: 20px;
      }
      .reset{
        width: 90px;
        height: 40px;
        color: black;
        background: rgb(248, 245, 245);
        border-radius: 20px;
      }
    }

}
</style>
