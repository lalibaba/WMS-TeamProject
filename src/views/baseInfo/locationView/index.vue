<template>
  <div class="app-container">
    <div class="card">
      <div class="left">
        <div class="area-choose">库区选择</div>
        <div>
          <el-select v-model="wareHouse" placeholder="请选择" @change="searchAllWareArea">
            <el-option
              v-for="item in wareHouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="area-name">
          <el-input
            v-model="areaName"
            placeholder="请输入库区的名称"
            suffix-icon="el-icon-search"
            @input="searchAllWareArea"
          />
          <div v-if="areaList.length!==0" class="area-name-display">
            <div v-for="item in areaList" :key="item.id" :class="{area:true,areaChoosed:areaChoosedId===item.id}" @click="chooseArea(item.id)">{{ item.name }}</div>
          </div>
          <div v-else class="new-area">
            <div class="none-area">暂无库区</div>
            <button class="main-button" @click="$router.push({path:'/baseInfo/area/details/null'})">新增库区</button>
          </div>
        </div>
      </div>
      <div class="center" />
      <div class="right">
        <div class="area-around">
          <div class="title">库区总览</div>
          <div class="part">
            <div>
              库存总计:<i>{{ areaOverview.total }}</i></div>
            <div>
              <span />
              停用库位:<i>{{ areaOverview.stop }}</i>
            </div>
            <div>
              <span style="background-color:#00be76" />
              占用库位:<i>{{ areaOverview.use }}</i>
            </div>
            <div>
              <span style="background-color:#b2dccc" />
              空闲库位:<i>{{ areaOverview.free }}</i>
            </div>
          </div>
        </div>
        <div v-if="areaOverview.total">
          <el-popover
            v-for="item in locationDetails"
            :key="item.id"
            width="200"
            trigger="hover"
            class="my-tit"
          >
            <div style="width:180px;height:190px;padding:10px;font-size:12px;color:#000">
              <div class="same-div"><span>库位编号：</span>{{ item.code }}</div>
              <div class="same-div"><span>库位名称：</span>{{ item.name }}</div>
              <div class="same-div"><span>库位位置：</span>{{ item.locationRow }}排{{ item.locationColumn }}列{{ item.locationLayer }}层</div>
              <div class="same-div"><span>库位状态：</span>{{ item.useStatus ? (item.useStatus===1 ? '未满' : '占满'):'空闲' }}</div>
              <div class="same-div"><span>货物名称：</span>{{ item.goodsName }}</div>
              <div class="same-div"><span>货品数量：</span>{{ item.goodsTotal }}</div>
            </div>
            <div slot="reference" :class="{locationDetail:true,locationUse:item.useStatus===1,locationFree:item.useStatus===0}" />
          </el-popover>
          <!-- <div v-for="item in locationDetails" :key="item.id" :class="{locationDetail:true,locationUse:item.useStatus===1,locationFree:item.useStatus===0}"  /> -->
        </div>
        <div v-else class="empty">
          <div class="nodata-img" style="width : 160px; height : 160px; margin-left : 50%; transform : translateX(-50%)"><img src="@/assets/no data/empty.png" alt="" style="width : 100%;"></div>
          <div style="margin-top : 10px; margin-bottom : 30px;">暂无库位</div>
          <button style="width : 108px;" class="main-button" @click="$router.push({path:'/baseInfo/location/details/null'})">新增库位</button>
        </div>
      </div>
      <div />
    </div></div></template>

<script>
import { searchWareHouse, searchAllWareArea, searchAreaOverview, getLocationDetails } from '@/api/baseInfo'
export default {
  data() {
    return {
      wareHouse: '',
      wareHouseList: [],
      areaName: '',
      areaList: [],
      areaChoosedId: '',
      areaOverview: {},
      locationDetails: []
    }
  },
  mounted() {
    this.searchWareHouse()
  },
  methods: {
    // 获取仓库信息
    async searchWareHouse() {
      this.wareHouseList = await searchWareHouse({ status: '1' })
      this.wareHouse = this.wareHouseList[0].id
      this.searchAllWareArea()
    },
    // 获取库区信息
    async searchAllWareArea() {
      this.areaList = await searchAllWareArea({ warehouseId: this.wareHouse, status: '1', like_name: this.areaName })
      if (Object.keys(this.areaList).length) {
        this.areaChoosedId = this.areaList[0].id
        this.searchAreaOverview()
      } else {
        this.areaChoosedId = ''
        this.areaOverview = {}
      }
    },
    // 选择库区
    chooseArea(id) {
      this.areaChoosedId = id
      this.searchAreaOverview()
    },
    // 根据所选库区获取库区总览
    async searchAreaOverview() {
      this.areaOverview = await searchAreaOverview(this.areaChoosedId)
      this.getLocationDetails()
    },
    async getLocationDetails() {
      this.locationDetails = await getLocationDetails({ areaId: this.areaChoosedId })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .card{
   background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    height: calc(100vh - 114px);
    overflow: hidden;
    box-sizing: border-box;
     .main-button{
            width: 126px;
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
            margin-bottom: 25px;
            &:hover{
                background-color: #007A4C;
            }
          }
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
    .left{
      width: 263px;
      height: 100%;
      padding: 27px 19px 27px 20px;
      float: left;
      box-sizing: border-box;
      .area-choose{
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC,PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #332929;
        line-height: 22px;
        margin-bottom: 22px;
        margin-left: 10px;
      }
      .area-name{
        margin-top: 21px;
        background: #fdfcf9;
        border: 1px solid #f7f2f1;
        border-radius: 6px;
        padding: 30px 29px 0 26px;
        .area-name-display{
          margin-top: 10px;
          height: calc(100vh - 360px);
          padding-right: 20px;
          overflow: scroll;
          .area{
            width: 140px;
            height: 40px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 6px 0 rgb(255 178 0 / 40%);
            margin: 0 auto;
            margin-top: 20px;
            font-size: 13px;
            font-family: PingFangSC,PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #ffb200;
            line-height: 40px;
            cursor: pointer;
          }
          .areaChoosed{
            background: #ffb200;
            color: #332929;
          }
        }
        .new-area{
          margin-top: 45px;
          text-align: center;
          .none-area{
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC,PingFangSC-Semibold;
            font-weight: 600;
            text-align: center;
            color: #b5abab;
            line-height: 20px;
            margin: 0 auto;
            margin-bottom: 19px;
          }
        }
      }
    }
    .center{
      float: left;
      width: 10px;
      height: 100%;
      background: linear-gradient(270deg,hsla(0,0%,100%,0),rgba(99,97,96,.1));
      box-sizing: border-box;
    }
    .right{
      padding: 27px 19px 27px 20px;
      float: left;
      height: 100%;
      width: calc(100% - 273px);
       .empty{
        border-top: 1px solid #f5efee;
        padding: 100px 0;
        color: #b5abab;
        font-size: 14px;
        text-align:center
      }
      .locationDetail{
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 7px;
          background-color: rgb(195, 195, 195);
          margin-right: 12px;
          margin-bottom: 10px;
          &:hover{
            border: 2px solid rgb(0, 190, 118);
          }
        }
      .locationUse{
        background-color: rgb(0, 190, 118);
         &:hover{
            border: 2px solid #008a56;
          }
      }
      .locationFree{
        background-color: rgb(178, 220, 204);
      }
      .area-around{
        margin-bottom: 21px;
        height: 22px;
        .title{
          float: left;
          width: 64px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC,PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          color: #332929;
          line-height: 22px;
          margin-right: 103px;
        }
        .part{
          float: left;
          font-size: 14px;
          font-family: PingFangSC,PingFangSC-Regular;
          font-weight: 400;
          color: #424250;
          div{
            float: left;
            margin-right: 43px;
            box-sizing: border-box;
            line-height: 22px;
            span{
              display: inline-block;
              background-color: rgb(195, 195, 195);
              width: 12px;
              height: 12px;
              margin-right: 2px;
              border-radius: 3px;
            }
            i{
              font-size: 14px;
              color: #000;
              font-style: normal;
              margin-left: 15px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

::v-deep .same-div{
  height: 30px !important;
  span{
    font-weight: 500;
    color: #c3c3c3;
  }
}

</style>
