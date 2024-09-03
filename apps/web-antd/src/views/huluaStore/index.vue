<script lang="ts" setup>
import { Button, Card, message, notification, Space, InputSearch } from 'ant-design-vue';
import { BookOpenText, CircleHelp, MdiGithub } from '@vben/icons';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { debounce } from 'lodash';
const myElement = ref(null);
const elementWidth = ref<number>(0)
const elementHeight = ref<number>(0)
onMounted(() => {
  resizeBox()
  window.addEventListener('resize', resizeBox); // 监听窗口大小变化
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeBox);
});
const resizeBox = debounce(() => {
  if (myElement.value) {
    elementWidth.value = myElement.value.offsetWidth;
    elementHeight.value = myElement.value.offsetHeight;
    myElement.value.style.backgroundSize = `${elementWidth.value}px ${elementHeight.value}px`;
  }
}, 300)
const menuIndex = ref<number>(0)
const handleMenuItem = (index: number) => {
  menuIndex.value = index
}
const searchValue = ref<string>('')
const onSearch = (value: any) => {
  console.log(value)
}
</script>

<template>
  <div ref="myElement" class="content-wrapper">
    <div class="left">
      <div class="icons">
        <img class="icon-1" src="../../assets/hulu_2.png" alt="">
        <img class="icon-2" src="../../assets/hulu_1.png" alt="">
      </div>
      <div class="menu-wrapper">
        <div class="menu-item" :class="menuIndex === 0 ? 'menu-item-active' : ''" @click="handleMenuItem(0)">
          <img v-if="menuIndex === 0" src="../../assets/svg/home-active.svg" alt="SVG Icon" width="16" height="16" />
          <img v-else src="../../assets/svg/home.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 0 ? 'text-active' : ''">热门推荐</div>
        </div>
        <div class="menu-item" :class="menuIndex === 1 ? 'menu-item-active' : ''" @click="handleMenuItem(1)">
          <img v-if="menuIndex === 1" src="../../assets/svg/qlgv-active.svg" alt="SVG Icon" width="16" height="16" />
          <img v-else src="../../assets/svg/qlgv.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 1 ? 'text-active' : ''">轻量工具</div>
        </div>
        <div class="menu-item" :class="menuIndex === 2 ? 'menu-item-active' : ''" @click="handleMenuItem(2)">
          <img v-if="menuIndex === 2" src="../../assets/svg/project-active.svg" alt="SVG Icon" width="16" height="16" />
          <img v-else src="../../assets/svg/project.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 2 ? 'text-active' : ''">展开工具</div>
        </div>
        <div class="menu-item" :class="menuIndex === 3 ? 'menu-item-active' : ''" @click="handleMenuItem(3)">
          <img v-if="menuIndex === 3" src="../../assets/svg/flag-active.svg" alt="SVG Icon" width="16" height="16" />
          <img v-else src="../../assets/svg/flag.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 3 ? 'text-active' : ''">智能助理</div>
        </div>
        <div class="menu-item" :class="menuIndex === 4 ? 'menu-item-active' : ''" @click="handleMenuItem(4)">
          <img v-if="menuIndex === 4" src="../../assets/svg/areachart-active.svg" alt="SVG Icon" width="16"
            height="16" />
          <img v-else src="../../assets/svg/areachart.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 4 ? 'text-active' : ''">数据来源</div>
        </div>
      </div>
    </div>
    <div class="right">
      <InputSearch class="input-search" v-model:value="searchValue" placeholder="请输入关键字" enter-button="搜索" size="large"
        @search="onSearch" />

      <div class="right-content">
        <div class="right-content-item">
          <div class="title">
            热门推荐
          </div>
          <div class="list">
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
          </div>
        </div>
        <div class="right-content-item">
          <div class="title">
            热门推荐
          </div>
          <div class="list">
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
            <div class="list-item">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url('../../assets/bg.png');
  background-repeat: no-repeat;
  // background-attachment: fixed;
  justify-content: space-between;
}

.left {
  width: 13.8vw;
  display: flex;
  flex-direction: column;
  padding-left: 1.1vw;
}

.icons {
  margin-top: 35px;
  margin-bottom: 23px;
  display: flex;
  align-items: flex-end;
}

.icon-1 {
  width: 2.2vw;
  height: 32px;
}

.icon-2 {
  width: 9.72vw;
  height: 28px;
}

.menu-wrapper {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 10px 0 10px 0.83vw;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 0.5vw;
  }

  .text {
    font-size: 14px;
    color: #15161A;
  }
}

.menu-item-active {
  background: #FFFFFF;
  border-radius: 8px;

  .text-active {
    color: #2A55E5;
  }
}

.right {
  width: 84.4vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input-search {
    margin-top: 50px;
    width: 48.6vw;
  }

  .right-content {
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    height: 550px;
    width: 95%;
    overflow: hidden;
    overflow-y: auto;
    justify-content: flex-start;

    .right-content-item {
      width: 100%;

      .title {
        margin-top: 0;
        font-size: 24px;
        color: #15161A;
        font-weight: 600;
      }

      .list {
        margin-top: 16px;
        margin-bottom: 26px;
        display: flex;
        flex-wrap: wrap;
        /* 允许换行 */
        gap: 10px;
        /* 项目之间的间距 */
        width: 100%;
        /* 容器宽度 */
        // max-width: 800px;
        /* 设置最大宽度 */
        // margin: 0 auto;
        /* 居中对齐 */

        .list-item {
          flex: 1 1 calc(25% - 10px);
          /* 每项占 25% 减去间距 */
          height: 130px;
          /* 项目高度 */
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.80);
          border-radius: 12px;
        }
      }
    }
  }
}
</style>
