import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../App'
import { toast } from 'react-hot-toast'
import Assets from '../assets/assets'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendUrl + "/api/admin/login", { email, password });
            
            if(response.data.success) {
                // Set the token 
                setToken(response.data.token);
                
                // Show success and navigate to home
                toast.success('Login successful');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
            <div className="card w-full max-w-md border shadow-xl bg-white">
                <div className="card-body">
                    <img src={Assets.logoBlokecore2} alt="" className='h-12 my-4 mx-auto grayscale-100'/>
                    <p className="text-center text-3xl font-semibold mb-2">
                        Admin Panel
                    </p>

                    <form onSubmit={onSubmitHandler} className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm/6 font-semibold text-black">Email address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder='example@email.com'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className={`input input-bordered w-full`}
                            />
                        </div>

                        <div className="form-control w-full">
                            <div className="flex justify-between items-center">
                                <label className="label">
                                <span className="label-text text-sm/6 font-semibold text-black">Password</span>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                type="password"
                                name="password"
                                placeholder='**********'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className={`input input-bordered w-full pr-10`}
                                />
                            </div>
                        </div>

                        <button
                        type="submit"
                        className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
                        Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login