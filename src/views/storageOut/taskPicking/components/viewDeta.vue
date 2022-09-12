<template>
  <div class="ground">
    <div class="apsedOK">
      <div class="infoTip">计划数量：<span>1</span> 实拣：<span>1</span></div>
      <div style="margin-top:20px">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="70"
            align="center"
          />
          <el-table-column
            prop="date"
            label="货品编号"
            width="160"
            align="center"
          />
          <el-table-column
            prop="date"
            label="货品条码"
            width="80"
            align="center"
          />
          <el-table-column
            prop="name"
            label="货品名称"
            width="180"
            align="center"
          />
          <el-table-column
            prop="address"
            label="货品类型"
            width="150"
            align="center"
          />
          <el-table-column
            prop="address"
            label="库区"
            width="180"
            align="center"
          />
          <el-table-column
            prop="sear"
            label="库位"
            width="180"
            align="center"
          />
          <el-table-column
            prop="qeir"
            label="拣货数量"
            width="100"
            align="center"
          />
          <el-table-column
            prop="qeir"
            label="实拣数量"
            width="130"
            align="center"
          />
          <el-table-column
            prop="qeir"
            label="差异数"
            width="160"
            align="center"
          />
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
        />
      </div>
      <div class="buttonBox">
        <el-button round @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      }],
      currentPage4: 1
    }
  }
}
</script>

<style lang='scss'>
  .ground{
      background-color: #fdfafa;
      .apsedOK{
      border-radius: 12px;
      background-color: #fff;
      height: 500px;
      margin: 20px 30px 30px 30px;
      .block{
    margin: 0 auto;
    text-align: center;
    padding-top: 18px;
    padding-bottom: 34px;
    .el-pager li.active{
      color: #ffb200;
    }
    }
    .infoTip{
      display: inline-block;
      height: 32px;
      line-height: 30px;
      background: #fff9eb;
      border: 1px solid #ffb200;
      padding: 0 25px;
      margin: 20px 0 0 0;
      font-size: 14px;
      margin-left: 30px;
      span{
      color: #ffb200;
      font-size: 13px;
      }
    }
      .buttonBox{
          padding: 25px 0 0;
          border-top: 1px solid #f5efee;
          text-align: center;
          .el-button{
            width: 170px;
            height: 40px;
          }
        }

      }
  }
</style>
