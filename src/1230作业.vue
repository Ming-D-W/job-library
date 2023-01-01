<template>
  <div id="app">
    <div>
      <span>姓名:</span>
      <input type="text" v-model="form.name" />
    </div>
    <div>
      <span>年龄:</span>
      <input type="number" v-model="form.age" />
    </div>
    <div>
      <span>性别:</span>
      <select v-model="form.gender">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div>
      <button @click="submit">添加/修改</button>
    </div>
    <div>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
        <tbody v-if="this.list.length">
          <tr v-for="(item) in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <button @click="removeItemById(item.id)">删除</button>
              <button @click="editItemById(item.id)">编辑</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">
              <span class="none">暂无数据</span>
            </td>
            <td>
              <button>删除</button>
              <button>编辑</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        age: '',
        gender: ''
      },
      list: []
    }
  },
  methods: {
    submit() {
      // 判断输入是否合法
      if (this.form.age < 0 || this.form.gender == '') {
        alert('数据不合法')
        this.form.name = ''
        this.form.age = ''
        this.form.gender = ''
        return
      }
      // 添加
      if (this.form.id === '') {
        let lastItemId = this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1
        this.list.push({
          id: lastItemId,
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender
        })
      } else {
        // 修改
        let modifiedItem = {
          id: this.form.id,
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender
        }
        // 找到id对应的项的索引
        let index = this.list.findIndex(item => item.id === this.form.id)
        // 替换列表中的该项
        this.list.splice(index, 1, modifiedItem)

      }
      this.form.id = ''
      this.form.name = ''
      this.form.age = ''
      this.form.gender = ''

    },
    removeItemById(id) {
      // 找到id对应的项的索引
      const index = this.list.findIndex(item => item.id === id);
      // 删除列表中的该项
      this.list.splice(index, 1);
    },
    editItemById(id) {
      const aCertainItem = this.list.find(item => item.id === id);
      console.log(aCertainItem);
      // this.form = aCertainItem
      this.form.id = aCertainItem.id
      this.form.name = aCertainItem.name
      this.form.age = aCertainItem.age
      this.form.gender = aCertainItem.gender
      console.log(this.form);
    }
  }
}
</script>

<style scoped>

</style>