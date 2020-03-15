import ShowBlog from '../components/ShowBlog';
import AddBlog from '../components/AddBlog';
import SingleBlog from '../components/SingleBlog';

export default [
    {path:'/',component:ShowBlog},
    {path:'/add',component:AddBlog},
    {path:'/blog/:id',component:SingleBlog}
]
  