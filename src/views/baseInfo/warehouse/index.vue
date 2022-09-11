<template>
  <div class="app-container">
    <el-card class="app-card">
      <el-form ref="warehouseSearchForm" :model="wareHouseData" :inline="true">
        <el-form-item label="仓库编号">
          <el-input v-model="wareHouseData.like_code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="仓库名称">
          <el-input v-model="wareHouseData.like_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="仓库状态">
          <el-select v-model="wareHouseData.status" placeholder="请选择">
            <el-option v-for="item in warehouseStatus" :key="item.status" :label="item.name" :value="item.status" />
          </el-select>
        </el-form-item>
        <el-form-item class="mt-btn">
          <el-button round class="search-btn" @click="searchWareHouse">搜索</el-button>
          <el-button round class="reset-btn" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 仓库表格 -->
    <div class="my-table">
      <button class="main-button" @click="$router.push({path: '/baseinfo/warehouse/details/null'})">新增仓库</button>

      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        header-row-class-name="my-table-header"
      >
        <el-table-column label="序号" width="67" type="index" />
        <el-table-column label="仓库编码" width="150" prop="code" />
        <el-table-column label="仓库名称" width="150" prop="name" />
        <el-table-column label="仓库类型" width="150" prop="type" />
        <el-table-column label="省/市/区" width="200" prop="location" />
        <el-table-column label="详细地址" width="150" prop="address" />
        <el-table-column label="仓库状态" width="150" prop="status" />
        <el-table-column label="仓库面积m²" width="150" prop="surface" />
        <el-table-column label="库区数量" width="150" prop="includedNum" />
        <el-table-column label="负责人" width="150" prop="personName" />
        <el-table-column label="联系电话" width="150" prop="phone" />
        <el-table-column label="更新时间" width="200" prop="updateTime" />
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push({path: `/baseinfo/warehouse/details/${row.id}`})">编辑</el-button>
            <el-button v-if="row.status==='停用'" type="text" size="small" @click="useChange(row)">启用</el-button>
            <el-button v-else type="text" size="small" @click="useChange(row)">停用</el-button>
            <el-button type="text" size="small" @click="deleteWare(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="center">
        <el-pagination
          :current-page.sync="getListData.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="getListData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="my-pagination"
          @size-change="getWareHouseList"
          @current-change="getWareHouseList"
        />
      </el-row>
    </div>

    <StopRun ref="stopRun" :dialog-visible.sync="useShow" @confirm="confirmChange" />
    <StopRun ref="delete" :dialog-visible.sync="deleteShow" @confirm="confirmDelete" />
  </div>
</template>

<script>
import { getWareHouseList, changeNewWarehouse, delWarehouse } from '@/api/baseInfo'
import { warehouseStatus, warehouseType } from '@/api/constant/warehouse'
import StopRun from '@/components/StopRun'
export default {
  components: {
    StopRun
  },
  data() {
    return {
      wareHouseData: {
        like_code: null,
        like_name: null,
        status: null
      },
      tableData: [],
      total: null,
      getListData: {
        current: 1,
        size: 10,
        descs: 'createTime'
      },
      warehouseStatus: warehouseStatus,
      useShow: false,
      // 修改仓库状态需要的信息
      changeWareHouseStatus: {},
      // 删除确认弹窗
      deleteShow: false,
      delWareId: null
    }
  },
  mounted() {
    this.getWareHouseList()
  },
  methods: {
    async getWareHouseList() {
      const res = await getWareHouseList(this.getListData)
      this.total = res.total * 1
      this.tableData = this.processData(res.records)
    },
    async searchWareHouse() {
      const res = await getWareHouseList({ ...this.getListData, ...this.wareHouseData })
      this.total = res.total * 1
      this.tableData = res.records
    },
    reset() {
      this.wareHouseData = {
        like_code: null,
        like_name: null,
        status: null
      }
      this.getWareHouseList()
    },
    add(row) {
      console.log(row)
    },
    // 启用或者停用仓库
    useChange(row) {
      let status = ''
      if (row.status === '启用') {
        status = '停用'
      } else {
        status = '启用'
      }
      warehouseStatus.forEach((item) => {
        if (status === item.name) {
          this.changeWareHouseStatus.status = item.status
        }
      })
      this.changeWareHouseStatus.id = row.id
      this.$refs.stopRun.changeName(status, row.name)
      this.useShow = true
    },
    // 改变仓库状态
    async confirmChange() {
      try {
        await changeNewWarehouse(this.changeWareHouseStatus)
        this.getWareHouseList()
        this.$message.success('状态改变成功')
      } catch (e) {
        console.log(e)
      }
    },
    // 删除仓库
    async deleteWare(row) {
      this.delWareId = row.id
      this.$refs.delete.changeName('删除', row.name)
      this.deleteShow = true
    },
    async confirmDelete() {
      try {
        await delWarehouse({ 'ids[]': this.delWareId })
        this.getWareHouseList()
        this.$message.success('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    processData(data) {
      data.forEach((ele) => {
        warehouseStatus.forEach((item) => {
          if (ele.status === item.status) {
            ele.status = item.name
          }
        })
        warehouseType.forEach((item) => {
          if (ele.type === item.type) {
            ele.type = item.name
          }
        })
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.app-card{
    height:127px;
    padding:30px;
    padding-left: 15px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    box-sizing: border-box;
   ::v-deep .el-card__body{
        padding: 0;
        .el-form-item{
            width: 25%;
            margin: unset;
            padding-left: 15px;
            padding-right: 15px;
            .el-form-item__label{
                display:block;
                height:18px !important;
                line-height:12px;
                font-size: 12px;
                font-weight: 500;
                color:#887e7e;
                padding-right: 0;
                margin-bottom: 10px;
                float: left;
            }
            .el-form-item__content
            {
                width: 100%;
                font-size: 14px;
                .el-input{
                    height: 40px;
                    .el-input__inner{
                         &:hover{
                        outline: none;
                        border: 1px solid #887E7E;
                    }
                        &:focus{
                        outline: none;
                        border: 1px solid #FFB200;
                    }
                        line-height: 40px;
                        border: 1px solid #f8f5f5;
                        background: #f8f5f5;
                        border-radius: 6px;
                        padding: 0 12px;
                    }
                }
                .el-select{
                    width: 100%;
                }
            }
        }
        .mt-btn{
            height: 68px;
            padding-right:0px;
             .el-form-item__content{
                height: 100%;
                display:flex;
                justify-content: flex-end;
                align-items: flex-end;
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
}

::v-deep .my-table{
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    box-sizing: border-box;
    .el-table th{
          padding: 10px 0;
        }
    .el-table td{
      padding: 5.5px 0;
    }
    .el-table__header-wrapper{
      height: 45px;
    }
    .el-table__row--striped{
     td{
       background-color: #FDFCF9 !important;
     }
    }
    .main-button{
        height: 40px;
        border-radius: 20px;
        border: 0;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        line-height: 40px;
        padding-left: 26px;
        padding-right: 26px;
        cursor: pointer;
        outline: 0;
        background: #00be76;
        color: #fff;
        margin-left: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        &:hover{
            background-color: #007A4C;
        }
    }
    .my-table-header{
        font-weight: 500;
        background-color: rgb(249, 246, 238);
        height: 44px;
        th{
            background-color: unset;
        }
        .cell{
          color: #887e7e;
        }
    }
    .cell{
        text-align: center;
        font-size: 13px;
        color: #332929;
    }
    .my-pagination{
      padding-top:18px;
      padding-bottom:34px;
      font-size: 13px;
      color: #1f2d3d;
      .el-input__inner{
       background: #f8f5f5;
       border: 1px solid #f8f5f5;
       &:hover{
       outline: none;
       border: 1px solid #887E7E;
      }
       &:focus{
       outline: none;
       border: 1px solid #FFB200;
      }
    }
    }
    }
</style>
