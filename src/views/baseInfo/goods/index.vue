<template>
  <div class="container">
    <!-- 搜索卡片 -->
    <el-card class="elradis">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="货品编号" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货品名称" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="货主名称" prop="ownerName">
          <el-input v-model="formInline.ownerName" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="color: #000; margin-right: 10px"
            round
            @click="search"
          >搜索</el-button>
          <el-button round style="background: #f8f5f5;border: 1px solid #f8f5f5;" @click="reset">重置</el-button>
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
        @click="addGood"
      >新增货品</el-button>
      <el-table
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
        :cell-style="{ height: '44px', padding: '0', textAlign: 'center',fontSize: '13px' }"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="goodsTypeName" label="货品类型名称" width="160" />
        <el-table-column prop="code" label="货品编号" width="160" />
        <el-table-column prop="barCode" label="货品条码" width="160" />
        <el-table-column prop="name" label="货品名称" width="160" />
        <el-table-column prop="ownerName" label="货主名称" width="160" />
        <el-table-column prop="inspectionType" label="质检方式" width="140">
          <template slot-scope="{row}">{{ inspectionType[row.inspectionType] }}</template>
        </el-table-column>
        <el-table-column prop="temperatureType" label="温度要求" width="140">
          <template slot-scope="{row}">{{ temperatureType[row.temperatureType] }}</template>
        </el-table-column>
        <el-table-column prop="bearingType" label="承重要求" width="140">
          <template slot-scope="{row}">{{ bearingType[row.bearingType] }}</template>
        </el-table-column>
        <el-table-column prop="areaName" label="指定货区" width="140" />
        <el-table-column prop="volume" label="体积m3" width="140" />
        <el-table-column prop="price" label="单价(元)" width="140" />
        <el-table-column prop="unit" label="单位" width="140" />
        <el-table-column prop="guaranteeDay" label="质保天数(天)" width="140" />
        <el-table-column prop="updateTime" label="更新时间" width="250" />
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="{row}">
            <el-button
              type="text"
              size="small"
              @click="editOwner(row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="delGood(row)"
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
import { getGoodsList, delGood } from '@/api'
export default {
  name: 'Goods',

  data() {
    return {
      inspectionType: { BCL: '不处理', QJ: '全检', CJ: '抽检' },
      temperatureType: { CW: '常温', LC: '冷藏', HW: '恒温' },
      bearingType: { ZX: '重型', QX: '轻型', BX: '中型' },
      loading: false,
      formInline: {
        code: '',
        name: '',
        ownerName: '',
        current: 1,
        size: 10
      },

      tableData: [],

      total: 0
    }
  },

  mounted() {
    this.getGoodsList()
  },

  methods: {
    // 编辑货品
    editOwner(row) {
      this.$router.push('/baseInfo/goods/details/' + row.id)
    },
    // 删除货品
    async delGood(row) {
      try {
        await this.$confirm('此操作将永久删除该货品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delGood({ 'ids[]': row.id })
        this.getGoodsList()
        this.$message.success('删除货品成功')
      } catch (e) {
        console.dir(e)
      } finally {
        this.loading = false
      }
    },
    // 新增货品
    addGood() {
      this.$router.push('/baseInfo/goods/detail')
    },
    // handleClick(row) {
    //   this.$router.push('/business/goodsOwner/details/' + row.id)
    // },

    // 请求货品列表
    async getGoodsList() {
      const { records, size, total, current } = await getGoodsList(
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
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.formInline.current = val
      this.getGoodsList()
    },
    // 搜索
    search() {
      this.getGoodsList()
    },
    reset() {
      this.formInline = {
        code: '',
        name: '',
        ownerName: '',
        current: 1,
        size: 10
      }
      this.getGoodsList()
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
