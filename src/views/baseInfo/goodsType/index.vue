<template>
  <div class="container">
    <!-- 搜索卡片 -->
    <el-card class="elradis">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="类型编号" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="primary"
          style="color: #000; margin-right: 10px"
          round
          @click="search"
        >搜索</el-button>
        <el-button round style="background: #f8f5f5;border: 1px solid #f8f5f5;" @click="reset">重置</el-button>
      </div>
    </el-card>

    <!-- 表格卡片 -->
    <el-card class="elradis2">
      <el-button
        style="
          background: #00be76;
          color: #fff;
          margin: 0 0 20px 30px;
        "
        round
        @click="openDialog"
      >新增货品类型</el-button>
      <el-table
        v-loading
        :data="tableData"
        border
        style="width: 100%"
        stripe
        :header-cell-style="{
          textAlign: 'center',
          height: '44px',
          background: '#f9f6ee',
          padding: '0',
          fontSize: '13px',
        }"
        :cell-style="{ height: '44px', padding: '0', textAlign: 'center',fontSize: '13px', color: '#332929' }"
      >
        <el-table-column type="index" label="序号" width="68" />
        <el-table-column prop="code" label="货品类型编号" />
        <el-table-column prop="name" label="货品类型名称" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button
              type="text"
              size="small"
              @click="openDialog(row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="delGoodsType(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="display: flex; justify-content: center; margin: 20px 0">
        <el-pagination
          :current-page="formInline.current"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="formInline.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加修改dialog -->
    <el-dialog :before-close="colseDialog" :visible="isShow" width="30%" :title="isAdd?'添加货品类型':'修改货品类型'">
      <el-form ref="Form" :rules="rules" :model="formData">
        <el-form-item label="货品类型编号" prop="code">
          <el-input v-model="formData.code" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货品类型名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div style="display:flex;justify-content:right;margin-top:30px">
        <el-button style="background-color:#f8f5f5; border:none; margin-right:10px" round @click="colseDialog">取消</el-button>
        <el-button round type="primary" @click="YesBtn">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getGoodsTypeList, addGoodsType, editGoodsType, delGoodsType, nextCode } from '@/api'
export default {
  name: 'GoodsType',

  data() {
    return {
      newCode: '',
      isAdd: true,
      isShow: false,
      loading: false,
      formInline: {
        code: '',
        name: '',
        ownerName: '',
        current: 1,
        size: 10
      },
      formData: {
        code: '',
        name: ''
      },
      rules: {
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [{ required: true, message: '必填', trigger: 'blur' }]
      },

      tableData: [],

      total: 0
    }
  },

  created() {
    this.getGoodsTypeList()
    this.nextCode()
  },

  methods: {
    async nextCode() {
      this.newCode = await nextCode('HPLX')
    },
    // 打开弹窗
    async openDialog(row) {
      if (row.id) {
        this.isShow = true
        this.isAdd = false
        this.formData = row
      } else {
        this.isShow = true
        this.isAdd = true
        this.formData.code = this.newCode
      }
    },
    // 确定
    async YesBtn() {
      try {
        this.loading = true
        await this.$refs.Form.validate()
        if (this.isAdd) {
          await addGoodsType(this.formData)
          this.$message.success('恭喜你！添加成功')
          this.nextCode()
        } else {
          await editGoodsType(this.formData)
          this.$message.success('恭喜你！修改成功')
        }
        this.colseDialog()
      } catch (e) { console.dir(e) } finally {
        this.loading = false
      }
    },
    // 关闭弹窗
    colseDialog() {
      this.isShow = false
      this.$refs.Form.resetFields()
      this.formData = {
        code: '',
        name: ''
      }
      this.getGoodsTypeList()
    },

    // 编辑货品类型
    editOwner(row) {
      this.$router.push('/baseInfo/goods/details/' + row.id)
    },
    // 删除货品类型
    async delGoodsType(row) {
      this.loading = true
      try {
        await this.$confirm('此操作将永久删除该货品类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delGoodsType({ 'ids[]': row.id })
        this.getGoodsTypeList()
        this.$message.success('删除货品类型成功')
      } catch (e) {
        console.dir(e)
      } finally {
        this.loading = false
      }
    },

    // 请求货品类型列表
    async getGoodsTypeList() {
      const { records, size, total, current } = await getGoodsTypeList(
        this.formInline
      )
      this.tableData = records
      this.total = +total
      this.formInline.current = +current
      this.formInline.size = +size
    },
    // 分页
    handleSizeChange(val) {
      this.formInline.size = val
      this.getGoodsTypeList()
    },
    handleCurrentChange(val) {
      this.formInline.current = val
      this.getGoodsTypeList()
    },
    // 搜索
    search() {
      this.getGoodsTypeList()
    },
    reset() {
      this.formInline = {
        code: '',
        name: '',
        ownerName: '',
        current: 1,
        size: 10
      }
      this.getGoodsTypeList()
    }
  }
}
</script>

<style   scoped>
.container {
  margin: 20px 30px 30px 30px;
}
</style>
<style scoped lang="scss" >
//搜索card
::v-deep .el-card {
  margin-bottom: 20px;
}
.elradis {
  border-radius: 12px;
  ::v-deep .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 30px 20px 30px;
  }
}
.elradis2 {
  border-radius: 12px;

  ::v-deep .el-card__body {
    padding: 20px 0px;
  }
}
::v-deep .demo-form-inline {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 3px;
  .el-form-item__label {
    position: absolute;
    top: -25px;
    font-size: 12px;
    font-weight: 500;
    color: #887e7e;
  }
  .el-form-item {
    margin: 10px 15px;
    margin-right: 0 !important;
  }

  .el-form-item__content {
    width: 100%;
  }
  .el-input__inner {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    background: #f8f5f5 !important;
    border-radius: 6px;
  }
  .el-input {
    width: 240px;
  }
}

::v-deep .el-dialog__header{
  font-weight: 700;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
}

::v-deep .el-dialog__body{
  padding: 10px 20px;
  .el-form{
    .el-form-item:first-child {
      .el-input__inner {
          background-color:#f3ebeb
        }
    }
    .el-form-item:last-child {
      .el-input__inner {
          background-color:#f8f5f5
        }
    }

  .el-form-item__label {
    font-size: 12px;
    font-family: PingFangSC,PingFangSC-Medium;
    font-weight: 500;
    color: #887e7e;
    line-height: 27px !important;
}

  }
}
</style>
