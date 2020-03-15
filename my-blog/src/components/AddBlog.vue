<template>
  <div id="add-blog">
    Add Blog
    <form v-if="!submited">
      <label>Blog Title</label>
      <input type="text" v-model="blog.title" required />

      <label>Blog Content</label>
      <textarea v-model="blog.content"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories" />
      </div>

      <label>Author</label>
      <select v-model="blog.author">
        <option v-for="(author,index) in authors" :key="index">{{author}}</option>
      </select>

      <button @click.prevent="post">Add This Blog</button>
    </form>

    <div class="hint" v-if="submited">
        <h3>Submitted successfully</h3>
    </div>


    <div id="overview">
      <h3>Blog Overview</h3>
      <p>Blog Title: {{blog.title}}</p>
      <p>Blog Content: {{blog.content}}</p>
      <p>Blog Categories:</p>
      <ul>
        <li v-for="(category,index) in blog.categories" :key="index">{{category}}</li>
      </ul>
      <p>Author: {{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
  //https://jsonplaceholder.typicode.com/posts
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["A", "B", "C"],
      submited:false
    };
  },
  methods: {
    post() {
      this.$http.post("https://jsonplaceholder.typicode.com/posts",{
          title:this.blog.title,
          body:this.blog.content,
          userId:1
      })
      .then(function(data){
          console.log(data);
          this.submited = true;
      })
    }
  }
};
</script>

<style scoped>
#add-blog *{
    box-sizing: border-box;
}

#add-blog{
    margin: 20px auto ;
    max-width: 600px;
    padding: 20px;
}

label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"],textarea,select{
    display: block;
    width: 100%;
    padding: 8px;
}

textarea{
    height: 200px;
}

#checkboxes label{
    display: inline-block;
    margin-top: 10px;
}

#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}

button{
    display: block;
    margin:20px 0;
    background: crimson;
    color: white;
    border: 0;
    padding: 14px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}

#overview{
    padding: 15px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}

h3{
    margin-top: 10px;
}
</style>