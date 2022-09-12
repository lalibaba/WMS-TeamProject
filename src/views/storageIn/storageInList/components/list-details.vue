<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基础信息" name="1">
        <div class="divSteps">
          <el-steps :active="1">
            <el-step title="步骤 1" description="新建" />
            <el-step title="步骤 2" description="收货中" />
            <el-step title="步骤 3" description="收货完成" />
            <el-step title="步骤 4" description="上架中" />
            <el-step title="步骤 5" description="上架完成" />
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
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>货主名称</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>联系人</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>联系电话</p>
              <p>1</p>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="货品信息" name="3">
        <div>
          <div class="infoTip">总计:20个 总体积 15.0m³</div>
          <div>
            <tablecomponent>
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
                  prop="code"
                  label="货品编码"
                  width="150"
                />
                <el-table-column
                  prop="name"
                  label="货品名称"
                  width="150"
                />
                <el-table-column
                  prop="goodsTypeName"
                  label="货品类型"
                  width="150"
                />
                <el-table-column
                  prop="price"
                  label="货品单价(天)"
                  width="150"
                />
                <el-table-column
                  prop="guaranteeDay"
                  label="保质天数(天)"
                  width="150"
                />
                <el-table-column
                  prop="unit"
                  label="单位"
                  width="150"
                />
                <el-table-column
                  prop="volume"
                  label="体积(m³)"
                  width="150"
                />
                <el-table-column
                  prop="volume"
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
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>承运商</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>计划到达时间</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>发货人姓名</p>
              <p>1</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>送货人姓名</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>送货人电话</p>
              <p>1</p>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="运输信息" name="4">
        <div class="infoTip">收货任务</div>
        <div class="baseInfo">
          <el-row>
            <el-col :span="6">
              <p>任务编号</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>收货完成已取消</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>收货人</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>开始时间</p>
              <p>1</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>完成时间</p>
              <p>1</p>
            </el-col>
            <el-col :span="6">
              <p>实收数量</p>
              <p>1</p>
            </el-col>
          </el-row>
        </div>
        <div class="infoTip">上架任务</div>
        <div class="baseInfo">
          <el-row>
            <el-row>
              <el-col :span="6">
                <p>任务编号</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>收货完成已取消</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>上架人</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>开始时间</p>
                <p>1</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p>完成时间</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>实上数量</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>差异合计</p>
                <p>1</p>
              </el-col>
              <el-col :span="6">
                <p>损益合计</p>
                <p>1</p>
              </el-col>
            </el-row>
          </el-row>
          <div>损益明细</div>
          <div>
            <div>
              <tablecomponent>
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
                    prop="code"
                    label="货品编码"
                    width="150"
                  />
                  <el-table-column
                    prop="name"
                    label="货品名称"
                    width="150"
                  />
                  <el-table-column
                    prop="goodsTypeName"
                    label="货品类型"
                    width="150"
                  />
                  <el-table-column
                    prop="price"
                    label="货品单价(天)"
                    width="150"
                  />
                  <el-table-column
                    prop="guaranteeDay"
                    label="保质天数(天)"
                    width="150"
                  />
                  <el-table-column
                    prop="unit"
                    label="单位"
                    width="150"
                  />
                  <el-table-column
                    prop="volume"
                    label="体积(m³)"
                    width="150"
                  />
                  <el-table-column
                    prop="volume"
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
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
export default {
  components: {
    tablecomponent,
    mypage1
  },
  data() {
    return {
      activeNames: ['1']
    }
  },
  computed: {
    data() {
      return this.$store.getters.receiptdetails
    }
  },
  created() {
    console.log(this.data)
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
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
