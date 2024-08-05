import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ExplorePage from './pages/ExplorePage'
import LikesPage from './pages/LikesPage'
import { useAuthContext } from './context/Authenticated';

const App = () => {
	const {authUser, loading} = useAuthContext();
	if(loading) return null;
	return (
		<div className='flex'>
			<ToastContainer />
			<Sidebar />
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
					<Route path='/explore' element={authUser? <ExplorePage /> : <Navigate to={"/login"} />} />
					<Route path='/likes' element={authUser ? <LikesPage />: <Navigate to={"/login"} />} />
				</Routes>
			</div>
		</div>
	);
}

export default App