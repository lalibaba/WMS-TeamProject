<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
    class="my-dialog"
  >
    <el-upload
      class="drop"
      drag
      action="#"
      :file-list="fileList"
      :on-change="onChange"
      :limit="1"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <div class="upload-img">
        <img src="@/assets/no data/upload.png" alt="">
      </div>
      <div class="upload-tit">点击或将表格文件拖拽到这里上传</div>
      <div class="upload-text">仅支持单个表单文件导入</div>
    </el-upload>
    <!-- <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover" @change="handleClick" @click="handleUpload">
      <div class="upload-img">
        <img src="@/assets/no data/upload.png" alt="">
      </div>
      <div class="upload-tit">点击或将表格文件拖拽到这里上传</div>
      <div class="upload-text">仅支持单个表单文件导入</div>
    </div> -->
    <span slot="footer" class="mt-btn">
      <el-button round class="reset-btn" @click="handleClose">取 消</el-button>
      <el-button round class="search-btn" :disabled="!loading" @click="confirmUpload">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UploadExcel',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      file: null
    }
  },
  methods: {
    onChange(file, fileList) {
      this.file = ''
      this.fileList = fileList
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.file = ''
      this.fileList = []
    },
    beforeUpload(file) {
      const fileType = ['xlsx', 'xls']
      if (!fileType.includes(file.name.split('.')[1])) {
        this.$message.error(`表单格式只能为${fileType.join('')}`)
        return false
      }
      if (file.size > 10000 * 1024) {
        this.$message.error(`表单大小限制为10MB`)
        return false
      }
      return true
    },
    upload(data) {
      try {
        this.file = data.file
        this.loading = true
      } catch (e) {
        this.$message.error('表单上传失败，请重试')
      }
    },
    confirmUpload() {
      this.$emit('confirmUpload', this.file)
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
            padding: 17px 20px 20px;
            font-weight: 700;
            .el-dialog__title{
                font-size: 16px;
            }
        }
        .el-dialog__body{
            min-height: 189px;
            padding: 20px 20px 28px 20px;
            color: #1f2d3d;
            font-size: 14px;
            word-break: break-all;
        }
        .el-dialog__footer{
            height: 70px;
            padding: 0 20px 30px;
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
            .is-disabled{
              background: #f8f5f5;
              color: #b5abab;
            }
        }
    }

}
.excel-upload-input{
  display: none;
  z-index: -9999;
}
::v-deep .drop{
  min-height: 150px;
  max-height: 170px;
  padding: 12px 20px 0px;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  text-align: center;
  color: #332929;
  line-height: 20px;
  cursor: pointer;
  .el-upload-list__item-name{
    margin-top: -25px;
    margin-bottom: 25px;
  }
  .el-upload-dragger{
    border:none;
    height: 136px;
    background-color: transparent;
  }
  .upload-img{
    margin-left: 50%;
    transform:translate(-50%);
    width: 57px;
    height: 57px;
    margin-bottom: 5px;
    img{
      width: 100%;
    }
  }
  .upload-tit{
    font-size:16px;
    color: #1f2d3d;
    padding-bottom: 8px;
  }
  .upload-text{
    font-size: 14px;
    color: #b5abab;
  }
}
</style>
