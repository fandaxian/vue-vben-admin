<template>
    <div ref="myElement" class="content-wrapper">
        <div class="left">
            <!-- <div class="icons">
                <img class="icon-1" src="../../assets/hulu_2.png" alt="">
                <img class="icon-2" src="../../assets/hulu_1.png" alt="">
            </div> -->
            <div class="l-title">管理系统</div>
            <div class="menu-wrapper">
                <div class="menu-item" :class="menuIndex === 1 ? 'menu-item-active' : ''" @click="handleMenuItem(1)">
                    <img v-if="menuIndex === 1" src="../../assets/svg/areachart-active.svg" alt="SVG Icon" width="16"
                        height="16" />
                    <img v-else src="../../assets/svg/areachart.svg" alt="SVG Icon" width="16" height="16" />
                    <div class="text" :class="menuIndex === 1 ? 'text-active' : ''">潜在代理人</div>
                </div>
                <div class="menu-item" :class="menuIndex === 2 ? 'menu-item-active' : ''" @click="handleMenuItem(2)">
                    <img v-if="menuIndex === 2" src="../../assets/svg/areachart-active.svg" alt="SVG Icon" width="16"
                        height="16" />
                    <img v-else src="../../assets/svg/areachart.svg" alt="SVG Icon" width="16" height="16" />
                    <div class="text" :class="menuIndex === 2 ? 'text-active' : ''">潜在客户</div>
                </div>
            </div>
        </div>
        <!-- 潜在代理人 -->
        <template v-if="menuIndex === 1">
            <div class="table-right">
                <Card>
                    <div class="tit">潜在代理人信息</div>
                    <Form style="margin: 20px 0;" ref="formRef" layout="inline" :model="formState">
                        <FormItem label="渠道来源" name="source">
                            <Select v-model:value="formState.source" placeholder="请选择" style="width: 120px;">
                                <SelectOption value="小红书">小红书</SelectOption>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="onSubmit">查询</Button>
                            <Button style="margin-left: 10px" @click="resetForm">重置</Button>
                        </FormItem>
                    </Form>
                    <Table :loading="loading" :dataSource="dataSource" :columns="columns" :scroll="{ x: 1000, y: 400 }"
                        @change='tableChange' :pagination="pagination" <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'action'">
                            <Button size="small" type="primary" @click="sendPhone(record)">发送到手机</Button>
                        </template>
                        <template v-if="column.dataIndex === 'detail'">
                            <Button size="small" @click="showDetail">查看详情</Button>
                        </template>
                    </Table>
                </Card>
            </div>
        </template>
        <!-- 潜在客户 -->
        <template v-if="menuIndex === 2">
            <div class="table-right">
                <Card>
                    <div class="tit">潜在客户信息</div>
                    <Form style="margin: 20px 0;" ref="formRef" layout="inline" :model="formState">
                        <FormItem label="渠道来源" name="source">
                            <Select v-model:value="formState.source" placeholder="请选择" style="width: 120px;">
                                <SelectOption value="小红书">小红书</SelectOption>
                            </Select>
                        </FormItem>
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
    <!-- 画像弹窗 -->
    <Modal v-model:open="openPortraitModal" title="画像" @ok="openPortraitModal = false">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    <!-- 短信模版弹框 -->
    <Modal v-model:open="openMessageModal" title="短信">
        <template #footer>
            <Button key="back" @click="openMessageModal = false">取消</Button>
            <Button key="submit" type="primary" :loading="loading" @click="openMessageModal = false">发送</Button>
        </template>
        <Textarea v-model:value="messageInfo" :auto-size="{ minRows: 2, maxRows: 5 }" />
    </Modal>
</template>
<script lang="ts" setup>
import { Button, Card, message, notification, Space, InputSearch, Select, Form, FormItem, SelectOption, Table, Modal, Textarea } from 'ant-design-vue';
import { MdiMagnify } from '@vben/icons';
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { debounce } from 'lodash';
const myElement = ref(null);
const elementWidth = ref<number>(0)
const elementHeight = ref<number>(0)
onMounted(() => {
    resizeBox()
    window.addEventListener('resize', resizeBox); // 监听窗口大小变化
    queryDataSource()
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
const menuIndex = ref<number>(1)
const handleMenuItem = (index: number) => {
    menuIndex.value = index
    if (index === 2) {
        console.log('潜在客户数据')
    }
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
const sendPhone = (record) => {
    openMessageModal.value = true
    console.log(record)
    messageInfo.value = `渠道来源:${record.row1}\n昵称:${record.row2}`
    // message.success('已发送至手机，请查看')
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

const openPortraitModal = ref<boolean>(false)
const openMessageModal = ref<boolean>(false)
const messageInfo = ref<string>('')

const showDetail = () => {
    openPortraitModal.value = true
}
</script>
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

.l-title {
    margin-top: 28px;
    margin-bottom: 23px;
    font-size: 28px;
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
                    width: 24%;
                    /* 每项占 25% 减去间距 */
                    height: 130px;
                    /* 项目高度 */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.80);
                    border-radius: 12px;
                    cursor: pointer;
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
            background-image: linear-gradient(209deg, #40A8F4 0%, #416BF6 100%);
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
            margin-top: 3.2vh;
            font-size: 20px;
            color: #15161A;
            font-weight: bold;
            margin-bottom: 2.2vh;
        }

        .show-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3.2vh;

            .show1 {
                height: 24.3vh;
                width: 49%;
                background: #DEECFF;
                border-radius: 8px;
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
</style>
