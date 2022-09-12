<template>
  <div class="addStorage">
    <div class="stepsbox">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写入库单基础信息" />
        <el-step title="填写货品清单" />
      </el-steps>
    </div>
    <div v-if="isshow" class="fromStorage">
      <el-form
        ref="formdetails"
        :model="formdetails"
        class="demo-form-inline"
        label-position="top"
        :rules="rules"
      >
        <el-row type="flex">
          <el-col class="form-row-col" :span="6">
            <el-form-item label="入库单号" prop="code">
              <el-input v-model="formdetails.code" placeholder="请输入" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="运单编号" prop="billCode">
              <el-input v-model="formdetails.billCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="计划到达时间" prop="planArrivalTime">
              <el-date-picker
                v-model="formdetails.planArrivalTime"
                class="Date-Picker"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="货主" prop="ownerId">
              <el-select
                v-model="formdetails.ownerId"
                filterable
                remote
                clearable
                placeholder="请输入货主名称/编码"
                :remote-method="remoteMethod"
                :loading="loading1"
              >
                <el-option
                  v-for="item in ownerlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col class="form-row-col" :span="6">
            <el-form-item label="仓库" prop="warehouseId">
              <el-select
                v-model="formdetails.warehouseId"
                placeholder="请选择仓库"
                @visible-change="visiblechange"
              >
                <el-option
                  v-for="item in warehouselist"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="发货人姓名" prop="shipperName">
              <el-input v-model="formdetails.shipperName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="送货人姓名" prop="deliveryName">
              <el-input v-model="formdetails.deliveryName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col" :span="6">
            <el-form-item label="送货人电话" prop="deliveryPhone">
              <el-input v-model="formdetails.deliveryPhone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col class="form-row-col" :span="6">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formdetails.remark" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-else class="isshowbtnbox">
      <div class="tableInfo">
        <el-button class="search" @click="godetails">增加货品</el-button>
        <el-button class="reset">删除货品</el-button>
      </div>
      <div class="emptyTip">
        <div class="img" />
        <div>无</div>
      </div>
    </div>
    <div class="btnbox">
      <el-button class="backbtn" @click="backbtn">返回</el-button>
      <el-button class="gobtn" @click="btnok">{{ isshow? '下一步': '提交' }}</el-button>
    </div>
    <!-- 新增入库货品 -->
    <addProduct
      :dialog-visible.sync="dialogVisible"
      :goodslist="goodslist"
      @search="searchfn"
    />
  </div>
</template>

<script>
import addProduct from './addProduct.vue'
import { parseTime } from '@/utils'
import {
  getowner,
  getwarehouselist,
  addreceipt,
  codeFactorynext,
  getgoodspageDetail,
  receiptListpageDetail
} from '@/api/storageIn'
export default {
  components: {
    addProduct
  },
  data() {
    return {
      active: 0,
      value1: '',
      isshow: true,
      dialogVisible: false,
      ownerlist: [],
      warehouselist: [],
      loading1: false,
      formdetails: { // 新增的数据
        code: '', // 入库单号
        billCode: '', // 运单编号
        planArrivalTime: '', // 计划到达时间
        ownerId: '', // 货主
        warehouseId: '', // 仓库
        shipperName: '', // 发货人姓名
        deliveryName: '', // 送货人姓名
        deliveryPhone: '', // 送货人电话
        remark: '', // 备注
        status: 1,
        id: ''
      },
      id: '',
      goodsdetails: { // 查询明细货品
        goods: '',
        current: 1,
        size: 10,
        ownerId: ''
      },
      goodslist: [],
      rules: {
        billCode: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        planArrivalTime: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        ownerId: [
          { required: true, message: '请输入ownerId', trigger: 'change' }
        ],
        warehouseId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        shipperName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        deliveryName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        deliveryPhone: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.codeFactorynexts()
  },
  methods: {
    async btnok() {
      if (this.isshow) {
        // await this.$refs.formdetails.validate()
        this.formdetails.planArrivalTime = parseTime(this.formdetails.planArrivalTime)
        this.goodsdetails.ownerId = this.formdetails.ownerId
        const { id } = await addreceipt({ ...this.formdetails }) // 新增请求
        // this.id = id // 主纪录id
        this.receiptListpageDetail(id)
        this.getgoodspageDetail()
        this.active++
        this.isshow = false
      } else {
        return
      }
    },
    backbtn() {
      if (this.isshow) {
        this.$router.go(-1)
      } else {
        this.isshow = !this.isshow
        this.active--
      }
    },
    godetails() {
      this.dialogVisible = true
    },
    // 搜索货主
    async remoteMethod(a) {
      const res = await getowner({ params: a })
      this.ownerlist = res
    },
    // 查询仓库
    async visiblechange() {
      if (!this.formdetails.ownerId) {
        this.$message.error('请选择货主')
        return
      }
      const data = await getwarehouselist({ ownerId: this.formdetails.ownerId })
      this.warehouselist = data
    },
    // 新增入库单
    async addreceipt() {
      await addreceipt({ ...this.formdetails, status: 1 })
    },
    // 获取下一个编号
    async codeFactorynexts() {
      const res = await codeFactorynext('RK')
      this.formdetails.code = res
    },
    // 获取货品类型
    async getgoodspageDetail() {
      const res = await getgoodspageDetail({ ...this.goodsdetails })
      this.goodslist = res.records
    },
    searchfn(value) {
      this.goodsdetails.goods = value
      this.getgoodspageDetail()
    },
    async receiptListpageDetail(id) {
      const res = await receiptListpageDetail({ masterId: id })
      // console.log(res)
    }
  }
}
</script>

<style scoped>
.addStorage{
  margin: 20px 30px 0;
  padding: 30px;
  background-color: #fff;

}
.addStorage .stepsbox{
  align-items: center;
  margin: 0 auto;
  width: 500px;
  margin-top: 56px;
}
.fromStorage .form-row-col{
  padding: 0 15px;

}
.fromStorage .form-row-col .Date-Picker{
  width: 100%;
}
.addStorage .isshowbtnbox .tableInfo{
  padding: 20px 30px;

}
.addStorage .isshowbtnbox .search{
    background: rgb(0, 190, 118);
    box-shadow: 0px 2px 9px rgba(255, 178, 0, 0.47);;
    border-radius: 20px;
    width: 126px;
    height: 40px;
    color: rgb(255, 255, 255);
    font-family: PingFang SC;
    font-size: 14px;
    letter-spacing: 0px;
    text-align: center;
}
.addStorage .isshowbtnbox .reset{
      width: 121px;
      height: 40px;
      background: rgb(248, 245, 245);
      box-shadow: 0px 2px 6px rgba(144, 142, 142, 0.17);;
      border-radius: 20px;
      color: rgb(51, 41, 41);
      font-family: PingFang SC;
      font-size: 14px;
      text-align: center;
}
.addStorage .btnbox{
  padding: 25px 0 0;
  margin: 0 -30px -5px;
  border-top: 1px solid #f5efee;
  text-align: center;
}
.addStorage .btnbox .backbtn{
  background: #f8f5f5;
  color: #332929;
  width: 170px;
  border-radius: 20px;
  margin: 0 15px;
}
.addStorage .btnbox .gobtn{
  background: #ffb200;
  color: #332929;
  width: 170px;
  border-radius: 20px;
  margin: 0 15px;
}
.isshowbtnbox .emptyTip {
    border-top: 1px solid #f5efee;
    padding: 100px 0;
    text-align: center;
    color: #b5abab;
    font-size: 14px;
}
.isshowbtnbox .emptyTip .img{
  width: 160px;
  height: 160px;
  display: inline-block;
  background: url('../../../../assets/404_images/empty4300e933.png') no-repeat;
  background-size: contain;
}
</style>
