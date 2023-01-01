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
      <table border="1" cellpadding="10" cellspacing="0" v-if="this.list.length">
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in list" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.age }}</td>
          <td>{{ list.gender }}</td>
          <td>
            <button>删除</button>
            <button>编辑</button>
          </td>
        </tr>
      </table>
      <tbody v-else>
        <tr>
          <td colspan="5">
            <span class="none">暂无数据</span>
          </td>
        </tr>
      </tbody>
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
      list: [
        //   {
        //   id: '',
        //   name: '',
        //   age: '',
        //   gender: ''
        // }
      ]
    }
  },
  methods: {
    submit() {
      this.list.push({
        id: this.list.length + 1,
        name: this.form.name,
        age: this.form.age,
        gender: this.form.gender
      })
      console.log(this.list);

    }
  }
}
</script>

<style scoped>

</style>