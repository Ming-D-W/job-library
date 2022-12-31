<template>
    <div class="score-case">
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>科目</th>
                        <th>成绩</th>
                        <th>考试时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-if="list.length">
                    <tr v-for="(item, index) in list" :key="item.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.subject }}</td>
                        <td :class="{ red: item.score < 60 }">{{ item.score }}</td>
                        <td>{{ item.date }}</td>
                        <td><a href="#" @click.prevent="del(item.id)">删除</a></td>
                    </tr>
                    <!-- <tr>
                        <td>2</td>
                        <td>数学</td>
                        <td>100</td>
                        <td>Tue Jun 07 2022 10:00:00 GMT+0800 (中国标准时间)</td>
                        <td><a href="#">删除</a></td>
                    </tr> -->
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5">
                            <span class="none">暂无数据</span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5">
                            <span>总分：321</span>
                            <span style="margin-left:50px">平均分：80.25</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="form">
            <div class="form-item">
                <div class="label">科目：</div>
                <div class="input">
                    <input type="text" placeholder="请输入科目" v-model="subject" />
                </div>
            </div>
            <div class="form-item">
                <div class="label">分数：</div>
                <div class="input">
                    <input type="text" placeholder="请输入分数" v-model="score" />
                </div>
            </div>
            <div class="form-item">
                <div class="label"></div>
                <div class="input">
                    <button class="submit" @click="submit">添加</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ScoreCase',
    data() {
        return {
            list: [
                { id: 15, subject: '语文', score: 89, date: new Date('2022/06/07 10:00:00') },
                { id: 27, subject: '数学', score: 100, date: new Date('2022/06/07 15:00:00') },
                { id: 32, subject: '英语', score: 56, date: new Date('2022/06/08 10:00:00') },
                { id: 41, subject: '物理', score: 76, date: new Date('2022/06/08 10:00:00') }
            ],
            subject: '',
            score: ''
        }
    },
    methods: {
        submit() {
            // console.log(this.subject);
            // console.log(this.score);
            if (!this.subject || !this.score < 0 || this.score > 100) {
                alert('数据不合法')
                this.subject = ''
                this.score = ''
                return
            }
            this.list.push({
                id: this.list.length + 10,
                subject: this.subject,
                score: this.score,
                date: new Date
            })
            this.subject = ''
            this.score = ''
        },
        del(id) {
            console.log(id);
            this.list = this.list.filter(item => item.id !== id)
        }
    },
}
</script>
  
<style lang="less">
.score-case {
    width: 1000px;
    margin: 50px auto;
    display: flex;

    .table {
        flex: 4;

        table {
            width: 100%;
            border-spacing: 0;
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;

            th {
                background: #f5f5f5;
            }

            tr:hover td {
                background: #f5f5f5;
            }

            td,
            th {
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
                text-align: center;
                padding: 10px;

                &.red {
                    color: red;
                }
            }
        }

        .none {
            height: 100px;
            line-height: 100px;
            color: #999;
        }
    }

    .form {
        flex: 1;
        padding: 20px;

        .form-item {
            display: flex;
            margin-bottom: 20px;
            align-items: center;
        }

        .form-item .label {
            width: 60px;
            text-align: right;
            font-size: 14px;
        }

        .form-item .input {
            flex: 1;
        }

        .form-item input,
        .form-item select {
            appearance: none;
            outline: none;
            border: 1px solid #ccc;
            width: 200px;
            height: 40px;
            box-sizing: border-box;
            padding: 10px;
            color: #666;
        }

        .form-item input::placeholder {
            color: #666;
        }

        .form-item .cancel,
        .form-item .submit {
            appearance: none;
            outline: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 4px 10px;
            margin-right: 10px;
            font-size: 12px;
            background: #ccc;
        }

        .form-item .submit {
            border-color: #069;
            background: #069;
            color: #fff;
        }
    }
}
</style>
  