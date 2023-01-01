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
          <tr v-for="(item,index) in list" :key="item.name">
            <td>{{ index+1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <button @click="removeItemByName(item.name)">删除</button>
              <button @click="editItemByName(item.name)">编辑</button>
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
      if (this.form.age < 0 || !this.form.age || !this.form.name || !this.form.gender) {
        alert('数据不合法')
        this.form.name = ''
        this.form.age = ''
        this.form.gender = ''
        return
      }
      // name不存在时添加
      // 实例方法`some` 检测数组中的元素是否满足指定条件   如果数组中有元素满足条件返回 true，否则返回 false
      let flag = this.list.some(item => item.name === this.form.name);
      // console.log(flag);
      if (!flag) {
        this.list.push({
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender
        })
      } else {
        // name存在时修改
        let modifiedItem = {
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender
        }
        // 找到name对应的项的索引
        let index = this.list.findIndex(item => item.name === this.form.name)
        // 替换列表中的该项
        this.list.splice(index, 1, modifiedItem)

      }
      this.form.name = ''
      this.form.age = ''
      this.form.gender = ''

    },
    removeItemByName(name) {
      // 找到name对应的项的索引
      const index = this.list.findIndex(item => item.name === name);
      // 删除列表中的该项
      this.list.splice(index, 1);
    },
    editItemByName(name) {
      // 找到name对应的项的索引
      const aCertainItem = this.list.find(item => item.name === name);
      // console.log(aCertainItem);
      // this.form = aCertainItem
      this.form.name = aCertainItem.name
      this.form.age = aCertainItem.age
      this.form.gender = aCertainItem.gender
      // console.log(this.form);
    }
  }
}
</script>

<style scoped>

</style>