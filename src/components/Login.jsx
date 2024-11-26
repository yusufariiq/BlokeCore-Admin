import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
        <div className="card w-full max-w-md border shadow-xl bg-white">
            <div className="card-body">
                
                <p className="text-center text-3xl font-semibold mb-2">
                    Admin Panel
                </p>

                <form className="space-y-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-sm/6 font-semibold text-black">Email address</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder='example@email.com'
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
                            className={`input input-bordered w-full pr-10`}
                            />
                            <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                            </button>
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