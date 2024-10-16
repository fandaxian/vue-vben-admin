<script lang="ts" setup>
import { Button, Card, message, notification, Space, InputSearch, Select, Form, FormItem, SelectOption, Table } from 'ant-design-vue';
import { MdiMagnify } from '@vben/icons';
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
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
  if (index === 4) {
    queryDataSource()
  }
}
const searchValue = ref<string>('')
const onSearch = (value: any) => {
  console.log(value)
}
const listChildren: any = [
  {
    title: '热门推荐',
    child: [
      {
        url: 'a',
        tit: '文案妙笔'
      },
      // {
      //   name: '1'
      // },
      // {
      //   name: '1'
      // },
      // {
      //   name: '1'
      // },
      // {
      //   name: '1'
      // }
    ]
  }
]
const showDetails = ref<boolean>(false)
const viewDetails = () => {
  showDetails.value = true
  console.log('查看详情')
}
const back = () => {
  showDetails.value = false
}

const yes = () => {
  
}

// -------------------------数据来源-------------------------
const formState = ref<any>({
  source: '',
  // sex: ''
})

const formRef = ref();
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      queryDataSource()
      console.log('values', formState.value);
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
  queryDataSource()
};
const dataSource = ref<any>([])
const columns = [
  {
    title: '渠道来源',
    dataIndex: 'row1',
    key: 'row1',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '昵称',
    dataIndex: 'row2',
    key: 'row2',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: 'ID',
    dataIndex: 'row3',
    key: 'row3',
    align: 'center',
    width: 120,
    ellipsis: true
  },
  {
    title: '性别',
    dataIndex: 'row4',
    key: 'row4',
    align: 'center',
    width: 80,
    ellipsis: true
  },
  {
    title: '画像',
    dataIndex: 'detail',
    key: 'detail',
    align: 'center',
    width: 180,
    ellipsis: true
  },
  {
    title: '社交平台留言',
    dataIndex: 'row5',
    key: 'row5',
    align: 'center',
    width: 200,
    // ellipsis: true
  },
  {
    title: '私信话术建议',
    dataIndex: 'row6',
    key: 'row6',
    align: 'center',
    width: 200,
    // ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 150,
  }
]

const loading = ref<boolean>(false)

const queryDataSource = async () => {
  try {
    // loading.value = true
    dataSource.value = [
      {
        row1: '小红书',
        row2: '君毓',
        row3: '553535793',
        row4: '女',
        row5: '门诊可以报同位素治疗疤痕吗',
        row6: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        row7: '代理人'
      },
      {
        row1: '小红书',
        row2: '君毓',
        row3: '553535793',
        row4: '女',
        row5: '门诊可以报同位素治疗疤痕吗',
        row6: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        row7: '代理人'
      },
      {
        row1: '小红书',
        row2: '君毓',
        row3: '553535793',
        row4: '女',
        row5: '门诊可以报同位素治疗疤痕吗',
        row6: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        row7: '代理人'
      },
      {
        row1: '小红书',
        row2: '君毓',
        row3: '553535793',
        row4: '女',
        row5: '门诊可以报同位素治疗疤痕吗',
        row6: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        row7: '代理人'
      }
    ]
  } catch (err) {

  }
}
const sendPhone = () => {
  message.success('已发送至手机，请查看')
}
const pageInfo = ref<any>({
  current: 1,
  pageSize: 10,
  total: 0
})
const pagination = computed<any>(() => ({
  ...pageInfo.value,
  hideOnSinglePage: false,
  showQuickJumper: true,
  showSizeChanger: true,
  showTotal: (total, range) => `共${total}条记录 第 ${Math.ceil(range[0] / pageInfo.value.pageSize)} / ${Math.ceil(range[1] / pageInfo.value.pageSize)}页`
}))

const tableChange = (p) => {
  const { current, pageSize } = p
  pageInfo.value.current = current;
  pageInfo.value.pageSize = pageSize;
  queryDataSource()
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
        <!-- <div class="menu-item" :class="menuIndex === 1 ? 'menu-item-active' : ''" @click="handleMenuItem(1)">
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
        </div> -->
        <!-- <div class="menu-item" :class="menuIndex === 4 ? 'menu-item-active' : ''" @click="handleMenuItem(4)">
          <img v-if="menuIndex === 4" src="../../assets/svg/areachart-active.svg" alt="SVG Icon" width="16"
            height="16" />
          <img v-else src="../../assets/svg/areachart.svg" alt="SVG Icon" width="16" height="16" />
          <div class="text" :class="menuIndex === 4 ? 'text-active' : ''">数据来源</div>
        </div> -->
      </div>
    </div>
    <!-- 热门推荐 -->
    <template v-if="menuIndex === 0">
      <div class="right" v-if="!showDetails">
        <div class="icons">
          <img class="icon-1-1" src="../../assets/hulu_2.png" alt="">
          <img class="icon-2-1" src="../../assets/hulu_1.png" alt="">
        </div>
        <div class="ttt">汇 聚 保 险 + 医 健 业 务 场 景 ，探 索 未 来 无 限 可 能</div>
        <div class="right-content">
          <div class="right-content-item" v-for="item in listChildren">
            <!-- <div class="title">
              {{ item.title }}
            </div> -->
            <div class="list">
              <div class="list-item" @click="viewDetails">
                <img style="width: 100%;height: 200px;" src="../../assets/a.png" alt="">
                <div class="aa">
                  <div class="a-1">文案妙笔</div>
                  <div class="a-2">快速生成吸引人的文案内容，无论是广告语还是推广文章，都能妙笔生花，助你轻松创作营销文案。</div>
                </div>
              </div>
              <div class="list-item" @click="viewDetails">
                <img style="width: 100%;height: 200px;" src="../../assets/b.png" alt="">
                <div class="aa">
                  <div class="a-1">洞察精灵</div>
                  <div class="a-2">能够深度挖掘客户数据，分析客户的消费偏好、行为习惯等，如同拥有一双洞察市场的慧眼，为营销…</div>
                </div>
              </div>
              <div class="list-item" @click="viewDetails">
                <img style="width: 100%;height: 200px;" src="../../assets/c.png" alt="">
                <div class="aa">
                  <div class="a-1">AI 面试</div>
                  <div class="a-2">是一款引领招聘新潮流的 AI 面试小工具，融合了先进的人工智能技术与人力资源专业知识，旨在为企业…</div>
                </div>
              </div>
              <div class="list-item" @click="viewDetails">
                <img style="width: 100%;height: 200px;" src="../../assets/d.png" alt="">
                <div class="aa">
                  <div class="a-1">渠道导航仪</div>
                  <div class="a-2">清晰呈现各营销渠道的数据表现，帮助你准确找到最优推广渠道，如同导航仪为你指引方向，优化渠…</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="details" v-else>
        <div class="line1">
          <img class="app-icon" src="../../assets/icon.png" alt="">
          <div class="line1-right-wrapper">
            <div class="line1-right-text">AI 面试</div>
            <div class="line1-right-text2">是一种利用人工智能技术来辅助面试过程的创新工具</div>
          </div>
        </div>
        <div class="c-wrapper">
          <div class="line2">
            <!-- <div class="line2-text">XXXXXXX</div> -->
            <div class="line2-text2">是一款引领招聘新潮流的 AI 面试小工具，融合了先进的人工智能技术与人力资源专业知识，旨在为企业和求职者打造高效、精准、便捷的面试体验。</div>
          </div>
          <div class="show-wrapper">
            <div class="show1">
              <div class="line3-text">社交媒体监测与管理</div>
              <img class="c" src="../../assets//aa.png" alt="">
            </div>
            <div class="show1">
              <div class="line3-text">潜在客户获取与画像</div>
              <img class="c" src="../../assets//bb.png" alt="">
            </div>
          </div>
          <div class="line4">
            大幅缩短面试时间，AI 可同时对多位候选人进行面试，快速筛选出符合企业基本要求的人选，让招聘人员将精力集中在更有价值的深度面试环节。
          </div>
          <div class="new">
            <div class="hhh">
              <div class="ww">10+</div>
              <div class="dd">对接社交平台与渠道</div>
            </div>
            <div class="hhh">
              <div class="ww">80%</div>
              <div class="dd">提升获取潜客效率</div>
            </div>
            <div class="hhh">
              <div class="ww">10+</div>
              <div class="dd">适配APP/小程序等</div>
            </div>
          </div>
          <div class="show-wrapper">
            <div class="show1">
              <div class="line3-text">个相化话术推荐</div>
              <img class="c" src="../../assets//cc.png" alt="">
            </div>
            <div class="show1">
              <div class="line3-text">销售数据预测</div>
              <img class="c" src="../../assets//dd.png" alt="">
            </div>
          </div>
          <div class="line4">
            打破地域限制，让企业与异地求职者轻松进行面试交流。无论候选人身处何地，都能通过 “智选面试助手” 参与面试，为企业拓展人才来源渠道
          </div>
          <!-- <div class="number-wrapper">
            <div class="number-item">
              <div class="number-item-text1">500+</div>
              <div class="number-item-text2">xxxxxxxxx</div>
            </div>
            <div class="number-item">
              <div class="number-item-text1">500+</div>
              <div class="number-item-text2">xxxxxxxxx</div>
            </div>
            <div class="number-item">
              <div class="number-item-text1">500+</div>
              <div class="number-item-text2">xxxxxxxxx</div>
            </div>
            <div class="number-item">
              <div class="number-item-text1">500+</div>
              <div class="number-item-text2">xxxxxxxxx</div>
            </div>
          </div>
          <div class="line3-text">XXXXXXX</div>
          <div class="show-wrapper">
            <div class="show1"></div>
            <div class="show1"></div>
          </div>
          <div class="line4-n">
            提高您的邮件会议撰写效率提高您邮件会议撰写效率提高您的邮提,提高您的邮件会议撰写效率提高您邮件会议撰写效率提高您的邮提,提高您的邮件会议撰写效率提高您邮件会议撰写效率提高您的邮提
          </div> -->
        </div>
        <div>
          <Button class="bottom-btn" @click="yes" type="primary" style="margin-right: 20px;">立即使用</Button>
          <Button class="bottom-btn" @click="back">返回</Button>
        </div>
      </div>
    </template>
    <!-- 数据来源 -->
    <template v-if="menuIndex === 4">
      <div class="table-right">
        <Card>
          <div class="tit">用户信息</div>
          <Form style="margin: 20px 0;" ref="formRef" layout="inline" :model="formState">
            <FormItem label="渠道来源" name="source">
              <Select v-model:value="formState.source" placeholder="请选择" style="width: 120px;">
                <SelectOption value="小红书">小红书</SelectOption>
              </Select>
            </FormItem>
            <!-- <FormItem label="性别" name="sex">
              <Select v-model:value="formState.sex" placeholder="请选择" style="width: 120px;">
                <SelectOption value="男">男</SelectOption>
                <SelectOption value="女">女</SelectOption>
              </Select>
            </FormItem> -->
            <FormItem>
              <Button type="primary" @click="onSubmit">查询</Button>
              <Button style="margin-left: 10px" @click="resetForm">重置</Button>
            </FormItem>
          </Form>
          <Table :loading="loading" :dataSource="dataSource" :columns="columns" :scroll="{ x: 1000, y: 400 }"
            @change='tableChange' :pagination="pagination" <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
              <Button size="small" type="primary" @click="sendPhone">发送到手机</Button>
            </template>
            <template v-if="column.dataIndex === 'detail'">
              <Button size="small" @click="sendPhone">查看详情</Button>
            </template>
          </Table>
        </Card>
      </div>
    </template>
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
  // margin-bottom: 23px;
  display: flex;
  align-items: flex-end;
  align-items: center;
}

.icon-1 {
  width: 2.2vw;
  height: 32px;
}

.icon-1-1 {
  width: 3.2vw;
  height: 45px;
}

.icon-2-1 {
  width: 15.72vw;
  height: 48px;
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

  .s-w {
    display: flex;
    align-items: center;
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
          // flex: 1 1 calc(25% - 10px);
          width: 32%;
          /* 每项占 25% 减去间距 */
          height: 300px;
          /* 项目高度 */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          background: rgba(255, 255, 255, 0.80);
          border-radius: 12px;
          cursor: pointer;

          .aa {
            padding: 10px;
            display: flex;
            flex-direction: column;

            .a-1 {
              font-size: 18px;
              color: #15161A;
              font-weight: bold;
            }

            .a-2 {
              font-size: 14px;
              color: #909399;
            }
          }
        }
      }
    }
  }
}

.details {

  width: 84.4vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6.5vh 2vw;

  .line1 {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .app-icon {
      margin-right: 1.6vw;
      width: 100px;
      height: 100px;
      // background-image: linear-gradient(209deg, #40A8F4 0%, #416BF6 100%);
      border-radius: 20px;
    }

    .line1-right-wrapper {
      display: flex;
      flex-direction: column;

      .line1-right-text {
        font-size: 30px;
        color: #15161A;
        font-weight: bold;
        margin-bottom: 4px;
      }

      .line1-right-text2 {
        font-size: 18px;
        color: #909399;
        letter-spacing: 0;
        font-weight: 400;
        width: 40vw;
        /* 或者使用max-width */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .c-wrapper {
    height: 450px;
    overflow: hidden;
    overflow-y: auto;
    margin-top: 6vh;

    .line2 {
      display: flex;
      flex-direction: column;

      .line2-text {
        font-size: 20px;
        color: #15161A;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .line2-text2 {
        font-size: 18px;
        color: #909399;
        letter-spacing: 0;
        font-weight: 400;
      }
    }

    .line3-text {
      // margin-top: 3.2vh;
      font-size: 20px;
      color: #15161A;
      font-weight: bold;
      margin-bottom: 2.2vh;
    }

    .show-wrapper {
      margin-top: 3.2vh;
      // margin-bottom: 2.2vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3.2vh;

      .show1 {
        display: flex;
        flex-direction: column;
        // height: 28.3vh;
        width: 49%;
        // background: #DEECFF;
        border-radius: 8px;
      }

      .c {
        height: 26.3vh;
        // width: 49%;
        // background: #DEECFF;
        // border-radius: 8px;
      }
    }

    .line4 {
      font-size: 18px;
      color: #909399;
      letter-spacing: 0;
      margin-bottom: 2.2vh;
    }

    .line4-n {
      font-size: 18px;
      color: #909399;
      letter-spacing: 0;
    }

    .number-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8vh 0 6vh 0;

      .number-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 4vw;

        .number-item-text1 {
          font-size: 50px;
          color: #15161A;
          font-weight: bold;
        }

        .number-item-text2 {
          font-size: 18px;
          color: #909399;
          letter-spacing: 0;
        }
      }
    }
  }

  .bottom-btn {
    margin-top: 20px;
  }
}

.table-right {
  width: 84.4vw;
  padding: 40px 20px;

  .tit {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: bold;
  }
}

.ttt {
  margin-top: 8px;
  font-size: 20px;
  color: #15161A;
}

.new {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 50px 0;

  .hhh {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 280px;
    height: 150px;
    background: #EBF4FF;
    border-radius: 20px;

    .ww {
      font-size: 50px;
      color: #172456;
      font-weight: 700;
    }

    .dd {
      margin-top: 8px;
      font-size: 18px;
      color: #909399;
    }
  }
}
</style>
