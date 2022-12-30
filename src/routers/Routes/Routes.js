import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../components/AddTask/AddTask";
import CompleteTask from "../../components/CompleteTask/CompleteTask";
import MyTask from "../../components/MyTask/MyTask";
import Main from "../../layout/Main/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";

export const routes = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            { path: '/', element: <Home></Home> },
            { path: '/addTask', element: <AddTask></AddTask> },
            { path: '/myTask', element: <MyTask></MyTask> },
            { path: '/completedtask', element: <CompleteTask></CompleteTask> },
            { path: '/login', element: <Login></Login> },
            { path: '/signUp', element: <SignUp></SignUp> },
        ]
    }
])