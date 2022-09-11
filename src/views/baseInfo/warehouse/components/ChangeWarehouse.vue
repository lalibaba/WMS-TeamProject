<template>
  <div class="app-container">
    <el-card class="my-card">
      <el-form ref="warehouseForm" :model="wareHouseData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库编码">
              <el-input v-model="wareHouseData.code" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库名称">
              <el-input v-model="wareHouseData.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库类型">
              <el-select v-model="wareHouseData.type" placeholder="请选择">
                <el-option v-for="item in warehouseType" :key="item.type" :label="item.name" :value="item.type" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { warehouseType } from '@/api/constant/warehouse'
export default {
  data() {
    return {
      wareHouseData: {},
      warehouseType: warehouseType
    }
  }
}
</script>

<style>

</style>
