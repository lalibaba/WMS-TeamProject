<template>
  <div class="collapsebox">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <div class="divSteps">
          <el-steps :active="1">
            <el-step
              v-for="item in data.timeArray"
              :key="item.id"
              title="步骤 1"
              :description="item"
            />
          </el-steps>
        </div>
        <div class="baseInfo">
          <el-row>
            <el-col :span="6">
              <p>入库单号</p>
              <p>{{ data.code }}</p>
            </el-col>
            <el-col :span="6">
              <p>创建时间</p>
              <p>{{ data.createTime }}</p>
            </el-col>
            <el-col :span="6">
              <p>计划到达时间</p>
              <p>{{ data.planArrivalTime }}</p>
            </el-col>
            <el-col :span="6">
              <p>仓库名称</p>
              <p>{{ data.warehouseName }}</p>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="货主信息" name="2">
        <div class="baseInfo">
          <el-row>
            <el-col :span="6">
              <p>货主编号</p>
              <p>{{ data.ownerCode }}</p>
            </el-col>
            <el-col :span="6">
              <p>货主名称</p>
              <p>{{ data.ownerName }}</p>
            </el-col>
            <el-col :span="6">
              <p>联系人</p>
              <p>{{ data.owner.name }}</p>
            </el-col>
            <el-col :span="6">
              <p>联系电话</p>
              <p>{{ data.owner.phone }}</p>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="货品信息" name="3">
        <div>
          <div class="infoTip">总计:20个 总体积 15.0m³</div>
          <div>
            <tablecomponent :tablelist="receiptList">
              <template v-slot:table>
                <el-table-column
                  type="index"
                  label="序号"
                  width="70"
                />
                <el-table-column
                  prop="ownerName"
                  label="货主名称"
                  width="150"
                />
                <el-table-column
                  prop="goodsCode"
                  label="货品编码"
                  width="150"
                />
                <el-table-column
                  prop="goodsName"
                  label="货品名称"
                  width="150"
                />
                <el-table-column
                  prop="goodsTypeName"
                  label="货品类型"
                  width="150"
                />
                <el-table-column
                  prop="goodsPrice"
                  label="货品单价(天)"
                  width="150"
                />
                <el-table-column
                  prop="goodsGuaranteeDay"
                  label="保质天数(天)"
                  width="150"
                />
                <el-table-column
                  prop="goodsUnit"
                  label="单位"
                  width="150"
                />
                <el-table-column
                  prop="goodsVolume"
                  label="体积(m³)"
                  width="150"
                />
                <el-table-column
                  prop="planNum"
                  label="预计到货数"
                  width="150"
                />
              </template>
            </tablecomponent>
          </div>
          <div>
            <mypage1 />
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="运输信息" name="4">
        <div class="baseInfo">
          <el-row>
            <el-col :span="6">
              <p>运单编号</p>
              <p>{{ data.billCode }}</p>
            </el-col>
            <el-col :span="6">
              <p>承运商</p>
              <p>{{ data.carrierName }}</p>
            </el-col>
            <el-col :span="6">
              <p>计划到达时间</p>
              <p>{{ data.planArrivalTime }}</p>
            </el-col>
            <el-col :span="6">
              <p>发货人姓名</p>
              <p>{{ data.shipperName }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>送货人姓名</p>
              <p>{{ data.deliveryName }}</p>
            </el-col>
            <el-col :span="6">
              <p>送货人电话</p>
              <p>{{ data.deliveryPhone }}</p>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="data.receivingEntity" title="任务信息" name="5">
        <div class="infoTip">收货任务</div>
        <div class="baseInfo">
          <el-row>
            <el-col :span="6">
              <p>任务编号</p>
              <p>{{ data.receivingEntity.code }}</p>
            </el-col>
            <el-col :span="6">
              <p>任务状态</p>
              <p>{{ data.receivingEntity.status }}</p>
            </el-col>
            <el-col :span="6">
              <p>收货人</p>
              <p>{{ data.receivingEntity.receiverName }}</p>
            </el-col>
            <el-col :span="6">
              <p>开始时间</p>
              <p>{{ data.receivingEntity.createTime }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>完成时间</p>
              <p>{{ data.receivingEntity.completionTime }}</p>
            </el-col>
            <el-col :span="6">
              <p>实收数量</p>
              <p>{{ data.receivingEntity.realNum }}</p>
            </el-col>
          </el-row>
        </div>
        <div class="infoTip">上架任务</div>
        <div class="baseInfo">
          <el-row>
            <el-row>
              <el-col :span="6">
                <p>任务编号</p>
                <p>{{ data.groundingEntity.code }}</p>
              </el-col>
              <el-col :span="6">
                <p>任务状态</p>
                <p>{{ data.groundingEntity.code }}</p>
              </el-col>
              <el-col :span="6">
                <p>上架人</p>
                <p>{{ data.groundingEntity.code }}</p>
              </el-col>
              <el-col :span="6">
                <p>开始时间</p>
                <p>{{ data.groundingEntity.createTime }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>完成时间</p>
                <p>{{ data.groundingEntity.completionTime }}</p>
              </el-col>
              <el-col :span="6">
                <p>实上数量</p>
                <p>{{ data.groundingEntity.groundingNum }}</p>
              </el-col>
              <el-col :span="6">
                <p>差异合计</p>
                <p>{{ data.groundingEntity.differenceNum }}</p>
              </el-col>
              <el-col :span="6">
                <p>损益合计</p>
                <p>{{ data.idMoney }}</p>
              </el-col>
            </el-row>
          </el-row>
          <div>损益明细</div>
          <div>
            <div>
              <tablecomponent :tablelist="data.idList">
                <template v-slot:table>
                  <el-table-column
                    prop="code"
                    label="损益单号"
                    width="150"
                  />
                  <el-table-column
                    prop="warehouseName"
                    label="仓库名称"
                    width="150"
                  />
                  <el-table-column
                    prop="locationName"
                    label="库位名称"
                    width="150"
                  />
                  <el-table-column
                    prop="ownerName"
                    label="货主名称"
                    width="150"
                  />
                  <el-table-column
                    prop="goodsName"
                    label="货品名称"
                    width="150"
                  />
                  <el-table-column
                    prop="idNum"
                    label="损益数量"
                    width="150"
                  />
                  <el-table-column
                    prop="idMoney"
                    label="损益金额(元)"
                    width="150"
                  />
                  <el-table-column
                    prop="updateTime"
                    label="处理时间"
                    width="150"
                  />
                  <el-table-column
                    prop="status"
                    label="损益单状态"
                    width="150"
                  />
                </template>
              </tablecomponent>
            </div>
            <div>
              <mypage1 />
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { receiptListpageDetail } from '@/api/storageIn'
export default {
  components: {
    tablecomponent,
    mypage1
  },
  data() {
    return {
      activeNames: ['1'],
      receiptList: []
    }
  },
  computed: {
    data() {
      return this.$store.getters.receiptdetails
    }
  },
  created() {
    this.receiptListpageDetail()
    console.log(this.$route.query.masterId)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    async receiptListpageDetail() {
      const res = await receiptListpageDetail({ masterId: this.$route.query.masterId })
      this.receiptList = res.records
    }
  }
}
</script>

<style scoped>
.collapsebox{
  padding: 20px 30px 30px 30px;
}
.collapsebox .el-collapse-item {
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    margin-bottom: 25px;
    padding: 14px 27px 15px;
}
/deep/ .el-collapse-item__header{
  border-bottom: 0px;
}
.divSteps {
    width: 70%;
    margin: 22px auto 37px;
}
.baseInfo {
    background: #fdfcf9;
    border: 1px solid #f7f2f1;
    padding: 25px 30px;
}
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    margin: 20px 0;
}
</style>
