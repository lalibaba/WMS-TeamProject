<template>
  <div class="groupclor">
    <el-collapse class="divWarehouse">
      <div class="apsedOK">
        <el-collapse-item title="基础信息">
          <div class="form-groud">
            <el-steps finish-status="success">
              <el-step title="新建" description="2022-09-11 19:18:22" />
              <el-step title="拣货中" description="2022-09-11 19:18:22" />
              <el-step title="拣货完成" description="2022-09-11 19:18:22" />
              <el-step title="交接中" description="2022-09-11 19:18:22" />
              <el-step title="交接完成" description="2022-09-11 19:18:22" />
            </el-steps>
          </div>
          <div class="baseInfo">
            <el-row :gutter="24">
              <el-col :span="6"><span>出库单号</span><div class="grid-content">HZ000003</div></el-col>
              <el-col :span="6"><span>创建时间</span><div class="grid-content">王姐</div></el-col>
              <el-col :span="6"><span>计划到达时间</span><div class="grid-content">王丽莉</div></el-col>
              <el-col :span="6"><span>出库类型</span><div class="grid-content">胡大大</div></el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top:20px">
              <el-col :span="6"><span>仓库名称</span><div class="grid-content">15821236638</div></el-col>
              <el-col :span="6"><span>库区名称</span><div class="grid-content">刘离</div></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </div>
      <div class="apsedOK">
        <el-collapse-item title="货主信息">
          <div class="baseInfo">
            <el-row :gutter="24">
              <el-col :span="6"><span>货主编号</span><div class="grid-content">HZ000003</div></el-col>
              <el-col :span="6"><span>货主名称</span><div class="grid-content">王姐</div></el-col>
              <el-col :span="6"><span>联系人</span><div class="grid-content">王丽莉</div></el-col>
              <el-col :span="6"><span>联系电话</span><div class="grid-content">15821236638</div></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </div>
      <div class="apsedOK">
        <el-collapse-item title="货品信息">
          <div class="infoTip">总计：1个 总体积 0.5m³</div>
          <div class="tableInfo" style="margin-top:20px">
            <el-table
              :data="tableData"
              border
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
                width="160"
                align="center"
              />
              <el-table-column
                prop="name"
                label="货品名称"
                width="160"
                align="center"
              />
              <el-table-column
                prop="address"
                label="货品类型"
                width="160"
                align="center"
              />
              <el-table-column
                prop="address"
                label="货主名称"
                width="160"
                align="center"
              />
              <el-table-column
                prop="sear"
                label="货品数量"
                width="160"
                align="center"
              />
              <el-table-column
                prop="qeir"
                label="体积(m³)"
                sortable
                width="160"
                align="center"
              />
              <el-table-column
                prop="qeir"
                label="单位"
                width="180"
                align="center"
                sortable
              />
              <el-table-column
                prop="qeir"
                label="可用库存"
                width="160"
                align="center"
              />
              <el-table-column
                prop="qeir"
                label="发货数量"
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
        </el-collapse-item>
      </div>
      <div class="apsedOK">
        <el-collapse-item title="运输信息">
          <div class="baseInfo">
            <el-row :gutter="24">
              <el-col :span="6"><span>运单编号</span><div class="grid-content">HZ000003</div></el-col>
              <el-col :span="6"><span>承运商</span><div class="grid-content">王姐</div></el-col>
              <el-col :span="6"><span>计划出库时间</span><div class="grid-content">王丽莉</div></el-col>
              <el-col :span="6"><span>司机名称</span><div class="grid-content">胡大大</div></el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top:20px">
              <el-col :span="6"><span>司机电话</span><div class="grid-content">15821236638</div></el-col>
              <el-col :span="6"><span>收货人名称</span><div class="grid-content">刘离</div></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </div>
      <div class="apsedOK">
        <el-collapse-item title="任务信息">
          <div class="infoTip">拣货任务</div>
          <div class="baseInfo">
            <el-row :gutter="24">
              <el-col :span="6"><span>任务编号</span><div class="grid-content">HZ000003</div></el-col>
              <el-col :span="6"><span>任务状态</span><div class="grid-content">王姐</div></el-col>
              <el-col :span="6"><span>拣货人</span><div class="grid-content">王丽莉</div></el-col>
              <el-col :span="6"><span>开始时间</span><div class="grid-content">2022-09-11 18:00:05</div></el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top:20px">
              <el-col :span="6"><span>完成时间</span><div class="grid-content">2022-09-11 18:00:05</div></el-col>
            </el-row>
          </div>
          <div class="infoTip">交接任务</div>
          <div class="baseInfo">
            <el-row :gutter="24">
              <el-col :span="6"><span>任务编号</span><div class="grid-content">HZ000003</div></el-col>
              <el-col :span="6"><span>任务状态</span><div class="grid-content">王姐</div></el-col>
              <el-col :span="6"><span>拣货人</span><div class="grid-content">王丽莉</div></el-col>
              <el-col :span="6"><span>开始时间</span><div class="grid-content">2022-09-11 18:00:05</div></el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top:20px">
              <el-col :span="6"><span>完成时间</span><div class="grid-content">2022-09-11 18:00:05</div></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
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
  },
  methods: {

  }
}
</script>
<style lang='scss'>
.groupclor{
        background-color: #fdfafa;
    .el-collapse{
      border-bottom: 0px solid #EBEEF5 !important;
      border-top: 0px solid #EBEEF5
    }
.divWarehouse{
    margin: 20px 30px 30px 30px;
    .apsedOK{
      border-radius: 12px;
    margin-bottom: 25px;
    padding: 14px 27px 15px;
    background-color: #fff;
     .form-groud{
        width: 850px;
        height: 100px;
        margin: 0 auto;
        margin-top: 20px;
      }
    .block{
    margin: 0 auto;
    text-align: center;
    padding-top: 18px;
    padding-bottom: 34px;
    .el-pager li.active{
      color: #ffb200;
    }
    }
    .el-button--text{
      color: #ffb200 !important;
    }
    .el-collapse-item__wrap{
      border-bottom: 0px solid #EBEEF5
    }
    .el-collapse-item__header{
      border-bottom: 0px solid #EBEEF5;
    }
    .baseInfo{
      background: #fdfcf9;
      border: 1px solid #f7f2f1;
      padding: 25px 30px;
      margin-top: 20px;
      .grid-content{
        color: #332929;
        font-size: 13px;
      }
      span{
        color: #887e7e;
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
    }
    }
}
}
</style>
