import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import store from './store/app.js';
import { Provider } from 'react-redux';
import './index.css'
import ChatDetail from './pages/chatDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        index:true,
        element: <Navigate to={'/chat/info'}/>
      },
      {
        path: '/chat/info',
        element: <ChatDetail/>,
      },
      {
        path: '/chat/:id',
        element: <ChatDetail/>,
      }
    ],
  },
  {
    path: "/chat-detail",
    element: <div>Hello world!</div>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
