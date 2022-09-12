<template>
  <el-dialog
    title="新增入库货品"
    :visible.sync="dialogVisible"
    width="1000px"
    :before-close="handleClose"
  >
    <div class="container-search">
      <el-form class="demo-form-inline" label-position="top">
        <el-row type="flex">
          <el-col class="form-row-col" :span="12">
            <el-form-item label="货品" style="padding: 0px">
              <el-input v-model="goods" placeholder="请输入名称/编码/条码" class="inputbox" />
            </el-form-item>
          </el-col>
          <el-col class="form-row-col rightbtnbox" :span="12">
            <div class="btn-box">
              <el-button class="search" @click="search">搜索</el-button>
              <el-button class="reset" @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <table1 :tablelist="goodslist">
      <template v-slot:table>
        <el-table-column
          type="selection"
          width="50"
        />
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
      </template>
    </table1>
    <mypage1 />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="Confirmtoadd">确认添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import table1 from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { receiptListbatch } from '@/api/storageIn'
export default {
  components: {
    table1,
    mypage1
    // detailsss
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    goodslist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      goods: '',
      goodsIds: [],
      masterId: ''
    }
  },
  created() {

  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    search() {
      this.$emit('search', this.goods)
    },
    reset() {
      this.goods = ''
      this.$emit('search', this.goods)
    },
    async Confirmtoadd() {
      await receiptListbatch()
    }
  }
}
</script>

<style scoped>

.container-search .rightbtnbox{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      margin-bottom: 22px;
}
.btn-box{
    text-align: end;
    justify-content: end;
}
.search{
    width: 90px;
    height: 40px;
    color: black;
    background: rgb(255, 178, 0);
    box-shadow: 0px 2px 9px rgba(255, 178, 0, 0.47);;
    border-radius: 20px;
}
.reset{
        width: 90px;
        height: 40px;
        color: black;
        background: rgb(248, 245, 245);
        border-radius: 20px;
}

/deep/ .el-form-item .el-form-item__label {
  font-size: 12px;
  font-family: PingFangSC,PingFangSC-Medium;
  font-weight: 500;
  color: #887e7e;
  padding: 0;
}
</style>
