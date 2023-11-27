import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Tasks from "./pages/Tasks.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NewTask from "./pages/tasks/NewTask.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout/>}>
                        <Route index path="" element={<Home/>}/>
                        <Route path="tasks" element={<Tasks/>}/>
                        <Route path="tasks/create" element={<NewTask/>}/>
                        <Route path="tasks/:id/edit" element={<NewTask/>}/>
                    </Route>
                    <Route path="/auth" element={<AuthLayout/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    )
}

export default App
