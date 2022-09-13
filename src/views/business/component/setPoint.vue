<template>
  <div>
    <el-dialog :before-close="colseDialog" :visible="isShow" width="38%" title="分配货主库位">
      <el-cascader
        v-model="temp"
        :options="options"
        :props=" { multiple: true}"
        clearable
        @change="clearableValue"
      />
      <div style="display:flex;justify-content:right;margin-top:30px">
        <el-button type="primary" style="color:#000;margin-right:10px" round @click="colseDialog">取消</el-button>
        <el-button round @click="postBatch">确定</el-button>
      </div>
    </el-dialog>
    <el-button style="background:#00be76;width:110px; color:#fff;margin: 0 0 20px 30px" round @click="isShow=true">分配库位</el-button>
    <el-button style="background:#f8f5f5;width:110px ;margin: 0 0 20px 30px" round @click="isShow2 = true">取消分配</el-button>
    <div class="contain">
      <!-- 表格 -->
      <template v-if="tableData.length!==0">
        <!-- v-fit-columns -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          :header-cell-style="{
            textAlign: 'center',
            height: '44px',
            background: '#f9f6ee',
            padding:'0',
            fontSize: '13px'
          }"
          :cell-style="{height: '44px',padding:'0',textAlign: 'center',}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
          />
          <el-table-column
            type="index"
            label="序号"
          />
          <el-table-column
            prop="warehouseName"
            label="仓库名称"
          />
          <el-table-column
            prop="areaName"
            label="库区名称"
          />
          <el-table-column
            prop="locationCode"
            label="库位编号"
          />
          <el-table-column
            prop="locationName"
            label="库位名称"
          />

          <el-table-column
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="delOwnerLocation(row)">取消分配</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="display: flex; justify-content: center;margin:20px 0">
          <el-pagination
            :current-page="page.current"
            :page-sizes="[5,10, 20, 30, 40]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

      </template>
      <img v-else style="height:150px;width:150px;display:block;margin:100px auto; " src="@/assets/business/null.png" alt="">
    </div>

    <div
      style="
            border-top: solid 1px #ccc;
            padding: 0 25px;
            display: flex;
            justify-content: center;
          "
    >
      <el-button
        round
        style="
              width: 170px;
              margin: 30px;
              background-color: #f8f5f5;
              border: 0px solid #000;
            "
        @click="backFn"
      >上一步</el-button>
      <el-button
        round
        type="primary"
        style="width: 170px; color: #000; margin: 30px"
        @click="$router.push('/business/goodsOwner')"
      >提交</el-button>
    </div>
    <el-dialog :before-close="colseDialog2" :visible="isShow2" width="30%" title="确定取消提示">
      <span>确定取消分配？</span>
      <div style="display:flex;justify-content:right;margin-top:30px">
        <el-button type="primary" style="color:#000;margin-right:10px" round @click="colseDialog2">取消</el-button>
        <el-button round @click="delSelect">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllWarehouse, getAreatree, postBatch, getPageDetail, delOwnerLocation } from '@/api'
// import { digui } from '@/utils'
export default {
  name: 'SetPoint',
  components: {

  },
  props: {
    ownerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      multipleSelection: [],
      temp: '',
      isShow: false,
      isShow2: false,
      options: [],
      postObj: {
        idStrArray: [],
        ownerId: this.ownerId
      },
      tableData: [],
      total: 0,
      page: {
        current: 1,
        size: 10,
        ownerId: this.ownerId
      }
    }
  },
  watch: {

  },
  mounted() {
    this.getTree()
    this.getPageDetail()
  },
  destroyed() {
  },
  methods: {
    // 单个删除分配
    async delOwnerLocation(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.isShow2 = true
    },
    // 多个删除分配
    async delSelect() {
      try {
        const ids = this.multipleSelection.map(ele => {
          return ele.id
        })
        await delOwnerLocation({ ids: ids })
        this.getPageDetail()
        this.$message.success('取消成功')
      } catch (e) { console.dir(e) } finally {
        this.isShow2 = false
      }
    },
    // 多选表格
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 分页
    handleSizeChange(val) {
      this.page.size = val
      this.getPageDetail()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getPageDetail()
    },
    // 获取货主库位列表
    async  getPageDetail() {
      const { records, size, total, current } = await getPageDetail(this.page)
      this.tableData = records
      this.total = +total
      this.page.current = +current // 当前页
      this.page.size = +size // 当前页数
    },
    // 分配库位请求
    clearableValue(val) {
      this.postObj.idStrArray.push(val.join(','))
    },
    async postBatch() {
      try {
        await postBatch(this.postObj)
        this.getPageDetail()
        this.getTree()
      } catch (e) { console.dir(e) } finally {
        this.postObj = {
          idStrArray: [],
          ownerId: this.ownerId
        }
        this.isShow = false
        this.temp = ''
      }
    },
    // 关闭弹窗
    colseDialog() {
      this.isShow = false
      this.getPageDetail()
    },
    colseDialog2() {
      this.isShow2 = false
      this.getPageDetail()
    },
    // 上一步
    backFn() {
      this.$parent.$parent.ischange = true
      this.$parent.$parent.nextCode()
    },
    async getTree() {
      // 查询所有仓库id
      const idList = await getAllWarehouse({ status: 1 })
      idList.forEach(ele => {
        this.options.push({ label: ele.name, value: ele.id })
      })
      // 查询仓库树
      idList.forEach(async item => {
        const res = await getAreatree({ '仓库id': item.id })
        await this.options.forEach(ele => {
          if (ele.value === item.id) {
            ele['children'] = res
            return
          }
        })
      })
      // this.options = digui(this.options)
      // console.log(this.options)
    }

  }
}
</script>

<style   scoped>
::v-deep .el-dialog__header{
  font-weight: 700;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
}
.contain{
  margin: 0 20px;
}
</style>
