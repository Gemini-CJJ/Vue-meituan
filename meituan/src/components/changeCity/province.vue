<template>
  <div>
    <span class="name">按省份选择</span>
    <m-select :list="provinceList"
              :title="province"
              :value="province"
              :showWrapperActive="provinceActive"
              @change_active="changeprovinceActive"
              @change="changeProvince"
              className="province"></m-select>
    <m-select :list="cityList"
              :title="city"
              :value="city"
              :showWrapperActive="cityActive"
              @change_active="changecityActive"
              @change="changeCity"
              :disabled="cityDisabled"
              className="city"></m-select>
    <span>直接搜索</span>
    <el-select
      v-model="searchWrod"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in searchList"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import MSelect from './mselect'
  import api from '@/api/index'

  export default {
    name: 'province',
    data () {
      return {
        provinceList: [],
        province: '省份',
        cityList: [],
        city: '城市',
        cityActive: false,
        provinceActive: false,
        searchList: [],
        searchWrod: '',
        loading: false,
        cityDisabled: true,
      }
    },
    created () {
      api.getProvinceList().then(res => {
        this.provinceList = res.data.data.map(item => {
          item.name = item.provinceName
          return item
        })
      })
    },
    methods: {
      changeprovinceActive (flag) {
        this.provinceActive = flag
        if (flag) {
          this.cityActive = false
        }
      },
      changecityActive (flag) {
        this.cityActive = flag
        if (flag) {
          this.provinceActive = false
        }
      },
      changeProvince (item) {
        this.province = item.name
        this.cityDisabled = false
        this.cityList = item.cityInfoList
      },
      changeCity (item) {
        this.city = item.name
        this.$store.dispatch('setPositon', item)
        this.$router.push({ name: 'index' })
      },
      remoteMethod (e) {
        //请求后端接口
      }
    },
    components: {
      MSelect,
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss"
</style>
