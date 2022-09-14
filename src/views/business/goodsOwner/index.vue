<template>
  <div class="container">
    <!-- 搜索卡片 -->
    <el-card class="elradis">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="货主编号" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货主名称" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人" prop="personName">
          <el-input v-model="formInline.personName" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="color: #000; margin-right: 10px"
            round
            @click="search"
          >搜索</el-button>
          <el-button round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格卡片 -->
    <el-card class="elradis2">
      <el-button
        style="
          background: #00be76;
          width: 110px;
          color: #fff;
          margin: 0 0 20px 30px;
        "
        round
        @click="addowner"
      >新增货主</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{
          textAlign: 'center',
          height: '44px',
          background: '#f9f6ee',
          padding: '0',
          fontSize: '13px',
        }"
        :cell-style="{ height: '44px', padding: '0', textAlign: 'center',fontSize: '13px' }"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="code" label="货主编号" width="160" />
        <el-table-column prop="name" label="货主名称" width="160" />
        <el-table-column prop="personName" label="联系人" width="160" />
        <el-table-column prop="phone" label="联系电话" width="160" />
        <el-table-column prop="email" label="联系邮箱" width="160" />
        <el-table-column prop="location" label="省/市/区" width="278" />
        <el-table-column prop="address" label="详细地址" width="300" />
        <el-table-column prop="updateTime" label="更新时间" width="200" />
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >查看详情</el-button>
            <el-button
              type="text"
              size="small"
              @click="editOwner(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="delOwner(scope.row.id)"
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
  </div>
</template>

<script>
import { getownerList, delOwner } from '@/api'
export default {
  name: 'GoodsOwner',

  data() {
    return {
      loading: false,
      formInline: {
        code: '',
        name: '',
        personName: '',
        current: 1,
        size: 5
      },

      tableData: [],

      total: 0
    }
  },

  mounted() {
    this.getownerList()
  },

  methods: {
    // 编辑货主
    editOwner(row) {
      this.$router.push('/business/goodsOwner/detail/' + row.id)
    },
    // 删除货主
    async delOwner(id) {
      try {
        await this.$confirm('此操作将永久删除该货主, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delOwner({ 'ids[]': id })
        this.getownerList()
        this.$message.success('删除货主成功')
      } catch (e) {
        console.dir(e)
      } finally {
        this.loading = false
      }
    },
    // 新增货主
    addowner() {
      this.$router.push('/business/goodsOwner/details')
    },
    handleClick(row) {
      this.$router.push('/business/goodsOwner/details/' + row.id)
    },

    // 请求货主列表
    async getownerList() {
      const { records, size, total, current } = await getownerList(
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
      this.getownerList()
    },
    handleCurrentChange(val) {
      this.formInline.current = val
      this.getownerList()
    },
    // 搜索
    search() {
      this.getownerList()
    },
    reset() {
      this.formInline = {
        code: '',
        name: '',
        personName: '',
        current: 1,
        size: 10
      }
      this.getownerList()
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
</style>
