<template>
  <div class="add-goods-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        :closable="false"
        show-icon
        center
        title="添加商品信息"
        type="info"
      />
      <el-steps
        :space="200"
        align-center
        :active="active"
        finish-status="success"
      >
        <el-step title="基本信息"> </el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        :stretch="true"
        tab-position="left"
        :before-leave="handleBeforeLeave"
      >
        <el-tab-pane label="基本信息">
          <el-form ref="goodsForm" :model="goodsForm" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                type="number"
                v-model.number="goodsForm.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                type="number"
                v-model.number="goodsForm.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                type="number"
                v-model.number="goodsForm.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="goodsForm.goods_cat"
                :options="catOptions"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form>
            <el-form-item>
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  border
                  v-for="(item, index) in goodsParameterList"
                  :key="index"
                >{{ item.attr_name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form>
            <el-form-item
              v-for="(item, index) in goodsAttributesList"
              :key="index"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="goodsForm.goods_introduce"> </quill-editor>
          <el-button
            type="primary"
            style="margin-top: 15px"
            @click="handleAddGoods"
          >添加商品</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor/src'
import { getGoodsAttributes, addGoods, getShop } from '@/api/commodity'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'add-goods-page',
  components: { quillEditor },
  data () {
    return {
      active: 0,
      goodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: '',
        goods_introduce: '',
        pics: []
      },
      rules: {
        goods_name: [
          { required: true, trigger: 'blur', message: '请输入商品名称' }
        ],
        goods_price: [
          { required: true, trigger: 'blur', message: '请输入商品价格' }
        ],
        goods_weight: [
          { required: true, trigger: 'blur', message: '请输入商品重量' }
        ],
        goods_number: [
          { required: true, trigger: 'blur', message: '请输入商品数量' }
        ],
        goods_cat: [
          {
            type: 'array',
            required: true,
            message: '请选择类别',
            trigger: 'change'
          }
        ]
      },
      catOptions: [],
      checkList: [],
      goodsParameterList: [],
      goodsAttributesList: []
    }
  },
  methods: {
    async getCatOpthions () {
      const { data } = await getShop()
      this.catOptions = data
    },
    handleExceed () {
      console.log(123)
    },
    async handleBeforeLeave (newTab) {
      if (newTab !== '0') {
        await this.$refs.goodsForm.validate()
        this.active = parseInt(newTab)
      }
    },
    async getGoodsArtibutes (sel) {
      const id = this.goodsForm.goods_cat[this.goodsForm.goods_cat.length - 1]
      const res = await getGoodsAttributes(id, sel)
      if (sel === 'many') {
        this.goodsParameterList = res.data
      } else if (sel === 'only') {
        this.goodsAttributesList = res.data
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    async handleAddGoods () {
      this.goodsForm.attrs = this.goodsAttributesList
      this.goodsForm.goods_cat = this.goodsForm.goods_cat.join(',')
      await addGoods(this.goodsForm)
      this.$message.success('添加商品成功')
      this.$router.push('/goods')
    }
  },
  created () {
    this.getCatOpthions()
  },
  watch: {
    active (newValue) {
      if (newValue === 1) {
        this.getGoodsArtibutes('many')
      }
      if (newValue === 2) {
        this.getGoodsArtibutes('only')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-goods-page {
  .el-breadcrumb {
    margin-bottom: 15px;
  }
  .el-steps {
    margin: 15px 0;
    ::v-deep .el-step__title {
      font-size: 13px;
    }
  }
  ::v-deep .ql-editor {
    height: 300px !important;
  }
}
</style>
