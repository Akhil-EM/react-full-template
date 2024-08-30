import authService from "../services/auth.service";
import { useState } from "react";
export default function Home(){
    const [loading,setLoading] = useState(false);
    const logout = async()=>{
      try {
        setLoading(true);
        const response = await authService.logout();
        console.log(response);
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false);
      }
    } 
    return(<div className="">
        <div className="flex p-3 bg-blue-800 text-white items-center">
          <h1 className="text-xl">Home Page</h1>
          <button className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={logout}
                  disabled={loading}>
            {loading?"Loading...":"Logout"}
            </button>
        </div>
        <p className="p-2">Hi user</p>
    </div>);
}