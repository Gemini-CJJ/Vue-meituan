<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menList" :key="index" @mouseenter="menuEnter(item)" @mouseleave="menuLeave">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="curDetail" @mouseenter="detailEnter" @mouseleave="detialLeave">
      <template v-for="(item, index) in curDetail.items">   <!--template上不能写:key-->
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(v, i) in item.items" :key="v +'_'+i">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  import api from '@/api/index.js'

  export default {
    data () {
      return {
        curDetail: null,
        menList: [],
      }
    },
    created () {
      api.getMenuList().then(res => {
        this.menList = res.data.data
      })
    },
    methods: {
      menuEnter (item) {
        clearTimeout(this.timer)
        this.curDetail = item
      },
      menuLeave () {
        let self = this
        this.timer = setTimeout(function () {
          self.curDetail = null
        }, 200)
      },
      detailEnter () {
        clearTimeout(this.timer)
      },
      detialLeave () {
        this.curDetail = null
      }
    }
  }
</script>

<style scoped>

</style>












