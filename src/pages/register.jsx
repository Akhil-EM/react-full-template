import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// ------------------------------------
export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
      } = useForm();
    
    const onSubmit = (data) => console.log(data)
    return (<div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-100 dark:border-slate-100">
            <h1 className="text-xl">Register Now</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2">
                    <p>Name</p>
                    <input type="text" 
                           className={`w-full p-2 border border-gray-200 rounded-lg ${errors.email ? 'bg-red-100':''}`}
                            {...register("name", { required:"Name is required",
                                minLength:{value:3, message:"Name must be at least 3 characters"},
                            })}/>
                    {errors.name?.message && 
                          <p className="text-xs text-red-600">{errors.name?.message}</p>}
                </div>
                <div className="p-2">
                    <p>Email</p>
                    <input type="email" 
                           className={`w-full p-2 border border-gray-200 rounded-lg ${errors.email ? 'bg-red-100':''}`}
                           {...register("email", 
                            { required:"Email is required",
                              pattern:{
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email address",
                              }
                             })}/>
                    {errors.email?.message && 
                          <p className="text-xs text-red-600">{errors.email?.message}</p>}
                </div>
                <div className="p-2">
                    <p>Password</p>
                    <input type="password" 
                           className={`w-full p-2 border border-gray-200 rounded-lg ${errors.email ? 'bg-red-100':''}`}
                           {...register("password", { required:"Password is required",
                            minLength:{value:5, message:"Password must be at least 5 characters"},
                            })}/>
                    {errors.password?.message && 
                          <p className="text-xs text-red-600">{errors.password?.message}</p>}
                </div>
                <div className="p-2">
                    <p>Confirm Password</p>
                    <input type="password" 
                           className={`w-full p-2 border border-gray-200 rounded-lg ${errors.email ? 'bg-red-100':''}`}
                           {...register("confirmPassword", { required:"Password is required",
                              validate:(value)=>{
                                  const { password } = getValues();
                                  return value === password || "Password doesn't match"
                              },

                            })}/>
                    {errors.confirmPassword?.message && 
                          <p className="text-xs text-red-600">{errors.confirmPassword?.message}</p>}
                </div>
                <div className="p-2">
                    <button type="submit" className="w-full p-2 bg-blue-800 text-white rounded-lg">Login</button>
                </div>
            </form>
            <div className="p-2 mt-3">
                <p>{`Already have an account?`} <Link to="/login" className="text-blue-600 underline hover:text-blue-800">Login</Link></p>
            </div>
        </div>
    </div>);
}