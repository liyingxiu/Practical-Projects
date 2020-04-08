//请求接口：https://jsonplaceholder.typicode.com/todos

axios.defaults.headers.common['X-Auth-Token'] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// GET 请求
function getTodos() {
    axios({
        method: "get",
        url: 'https://jsonplaceholder.typicode.com/todos',
        params: {
            _limit: 5,
            timeout: 5000//请求超过5s就显示错误
        }
    })
        .then(res => {
            console.log(res);
            showOutput(res);
        })
        .catch(err => console.log(err));
}

// POST 请求，另外一种axios写法
function addTodo() {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        "title": "这是新加入的",
        "completed": false
    })
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// PUT/PATCH 请求
function updateTodo() {
    axios.put('https://jsonplaceholder.typicode.com/todos/1', {
        "title": "这是新加入的,id=1",
        "completed": false
    })
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// DELETE 请求
function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/2')
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// 批量请求数据
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
        // .then(res=>console.log(res[0].data))
        .then(axios.spread((todos, posts) => {
            showOutput(todos);
            showOutput(posts);
        }))
        .catch(err => console.log(err));
}

// 自定义请求头
function customHeaders() {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "onetoken"
        }
    };
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        "title": "这是新加入了请求头",
        "completed": false
    }, config)
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// TRANSFORMING 请求 & 响应：对响应的数据进行转换
//应用场景不是很多
function transformResponse() {
    const option = {
        method: "post",
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: "hello world"
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(option)
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// ERROR 处理
function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss')
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status == 404) {
                    alert('客户端请求出现问题');
                } else if (err.response.status >= 500) {
                    alert('服务端接口出现问题');
                }
            } else if (err.request) {
                //发起了请求，但是没有响应
                console.error('err.request')
            } else {
                //没有请求，也没有响应
                console.err(err.message)
            }
        });
}

// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source();

    axios.get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log("request canceled", thrown.message);
            }
        });

    if (true) {
        source.cancel("request canceled");
    }

}

// 请求拦截
axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`
        );
        return config;
    },err =>{
        return Promise.reject(err);
    }
)
// AXIOS 实例化
const axiosInstance = axios.create({
    baseURL:"http://jsonplaceholder.typicode.com"
});
axiosInstance.get('/comments?_limit=5').then(res=>showOutput(res))

// 数据展示
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// 事件监听
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);