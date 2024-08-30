import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/auth.service";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateAccessToken } from "../redux/slice/auth.slice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// ------------------------------------
export default function Login() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            setFormLoading(true);
            const { data } = await authService.login(formData.email, formData.password);
            const { accessToken,refreshToken } = data;
            //refresh token in cookie
            Cookies.set("refreshToken",refreshToken, { expires: 7 });//7 days
            Cookies.set("accessToken",accessToken,{expires:(15 / 1440)});//15 min
            navigate("/");
            //accessToken in redux
            // dispatch(updateAccessToken(accessToken));
        } catch (error) {
            const { response } = error;
            if (response) {
                if (response?.data?.isError && ["validation error", "Validation errors"].includes(response?.data?.message)) {
                    for (const [key, value] of Object.entries(response?.data?.data)) {
                        setError(key, { message: value?.errors[0] })
                    }
                }

            }

        } finally {
            setFormLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-100 dark:border-slate-100">
                <h1 className="text-xl">Login Now</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-2">
                        <p>Email</p>
                        <input type="text"
                            className={`w-full p-2 border border-gray-200 rounded-lg ${errors.email ? 'bg-red-100' : ''}`}
                            {...register("email",
                                {
                                    required: "Email is required",
                                    pattern:{
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    }
                                })}
                        />
                        {errors.email?.message &&
                            <p className="text-xs text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="p-2">
                        <p>Password</p>
                        <input
                            type="password"
                            className={`w-full p-2 border border-gray-200 rounded-lg ${errors.password?.message ? 'bg-red-100' : ''}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 3, message: "Password must be at least 3 characters" },
                            })}
                        />
                        {errors.password?.message &&
                            <p className="text-xs text-red-600">{errors.password?.message}</p>}
                    </div>
                    <div className="p-2">
                        <button type="submit"
                            className="w-full p-2 bg-blue-800 text-white rounded-lg"
                            disabled={formLoading}>
                            {formLoading ? "Please wait..." : "Login"}
                        </button>
                    </div>
                </form>
                <div className="p-2 mt-3">
                    <p>{`Don't have an account?`}<Link to="/register" className="text-blue-600 underline hover:text-blue-800">Register</Link></p>
                </div>
            </div>
        </div>);
}