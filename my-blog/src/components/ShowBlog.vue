<template>
  <div v-theme:column="'wide'" id="show-blog">
    <h1>Show Blogs</h1>
    <input type="text" placeholder="Search" v-model="search" />
    <div class="single-blog" v-for="(blog,index) in filteredBlogs" :key="index">
      <router-link :to="'/blog/'+blog.id">
        <h2 v-rainbow>{{blog.title|to-uppercase}}</h2>
      </router-link>
      <article>{{blog.body|sinppet}}</article>
    </div>
  </div>
</template>
<script>
export default {
  name: "show-blog",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    this.$http.get("https://jsonplaceholder.typicode.com/posts").then(data => {
      this.blogs = data.body.slice(0, 10);
      console.log(this.blogs);
    });
  },
  computed: {
    filteredBlogs() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },
  filters: {
    "to-uppercase": function(value) {
      return value.toUpperCase();
    }
  },
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color =
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8);
      }
    }
  }
};
</script>

<style scoped>
#show-blog {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blog a{
  color: #444;
  text-decoration: none;
}
input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>