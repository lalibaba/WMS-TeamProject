<template>
  <el-dialog
    :title="`确认${use}`"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
    class="my-dialog"
  >
    <span>确定要{{ use }}：{{ name }} 吗？</span>
    <span slot="footer" class="mt-btn">
      <el-button round class="reset-btn" @click="handleClose">取 消</el-button>
      <el-button round class="search-btn" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'StopRun',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      use: '',
      name: ''
    }
  },
  methods: {
    changeName(use, name) {
      this.use = use
      this.name = name
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async confirm() {
      await this.$emit('confirm')
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.my-dialog {
    ::v-deep .el-dialog{
        .el-dialog__header{
            height: 56px;
            background: #fff;
            box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
            padding: 17px 30px 20px;
            font-weight: 700;
            .el-dialog__title{
                font-size: 16px;
            }
        }
        .el-dialog__body{
            height: 64px;
            padding: 20px 30px 28px 30px;
            color: #1f2d3d;
            font-size: 14px;
            word-break: break-all;
        }
        .el-dialog__footer{
            height: 70px;
            padding: 0 30px 30px;
            .el-button{
                    height:40px;
                    color: #332929;
                    font-weight: 500;
                    padding-left: 26px;
                    padding-right: 26px;
                    border: none;
                    margin-left: 20px;
                }
            .search-btn{
                background-color:#ffb200;
                    &:hover{
                        background-color: #FF8E00;
                    }
                    }
            .reset-btn{
                background-color:#f8f5f5;
                    &:hover{
                        background-color: #ffb200;
                    }
                }
        }
    }

}
</style>
