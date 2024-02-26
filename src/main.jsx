import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protected} from "./Components"
import {Home,Signup,Addpost,Editpost,Post,Allpost,Login as LoginPage} from "./pages"



const router= createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,

      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LoginPage/>
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
            <Protected authentication={false}>
                <Signup />
            </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
            <Protected authentication>
                <Allpost />
            </Protected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <Protected authentication>
               <Addpost />
            </Protected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <Protected authentication>
                <Editpost />
            </Protected>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
