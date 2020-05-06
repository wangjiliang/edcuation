<template>
  <div class="ranking">
    <div class="topic">
      <p>排行榜单</p>
      <span>Ranking list</span>
      <div class="line"></div>
    </div>
    <Region/>
    <Lesson/>
    <Partner/>
  </div>
</template>

<script>
import Region from './children/region/region'
import Lesson from './children/lesson/lessons'
import Partner from 'components/partner/partner.vue'

export default {
  components:{
    Region,
    Lesson,
    Partner
  }
}
</script>

<style lang="scss" scoped>
  .ranking{
    width: 1200px;
    margin: 0 auto;
  }
</style>
