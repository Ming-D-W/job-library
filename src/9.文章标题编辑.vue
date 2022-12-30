<template>
    <div class="article-case">
        <div class="form-preview">
            <h2 v-text="articleTitle"></h2>
            <small v-text="articleChannel"></small>
            <a class="btn-edit" href="#" @click="showHide">编辑</a>
        </div>
        <div v-show="flag">
            <div class="form-edit">
                <div class="form-item">
                    <div class="label">标题：</div>
                    <div class="input">
                        <input type="text" placeholder="请输入标题" v-model="article.title" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="label">频道：</div>
                    <div class="input">
                        <select v-model="article.channel">
                            <option value="请选择频道" hidden>请选择频道</option>
                            <option value="前端">前端</option>
                            <option value="运维">运维</option>
                            <option value="测试">测试</option>
                        </select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="label"></div>
                    <div class="input">
                        <button class="cancel" @click="cancel">取消</button>
                        <button class="submit" @click="submit">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ArticleCase',
    data() {
        return {
            edit: false,
            flag: true,
            articleTitle: '文章标题',
            articleChannel: '文章频道',
            article: {
                title: '文章标题',
                channel: '请选择频道',
            },
            form: {
                title: '',
                channel: '',
            },
        };
    },
    methods: {
        showHide() {
            this.flag = !this.flag;
        },
        submit() {
            this.articleTitle = this.article.title
            this.articleChannel = this.article.channel
            this.flag = !this.flag;
        },
        cancel() {
            this.article.title = this.articleTitle
            this.article.channel = this.articleChannel
            this.flag = !this.flag;
        }
    },
};
</script>
  
<style scoped lang="less">
.form-preview {
    position: relative;
    display: flex;
    align-items: center;
}

.form-preview h2 {
    font-size: 18px;
    font-weight: normal;
}

.form-preview small {
    font-size: 12px;
    display: inline-block;
    padding: 2px 6px;
    background: #27ba9b;
    color: #fff;
    border-radius: 2px;
    transform: scale(0.8);
}

.form-preview .btn-edit {
    font-size: 12px;
    display: none;
    text-decoration: none;
    color: #069;
    margin-left: 20px;
}

.form-preview:hover .btn-edit {
    display: block;
}

.form-edit {
    padding-top: 20px;
}

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
</style>