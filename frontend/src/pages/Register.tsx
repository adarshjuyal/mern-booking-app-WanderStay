import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
//type for the form
export type RegisterFormData={
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
}

const Register = () => {
  const querClient=useQueryClient();
  const navigate=useNavigate();
  const {showToast}=useAppContext();
const {register,watch, handleSubmit,formState:{errors}}=useForm<RegisterFormData>();//connecting type to form
const mutation=useMutation(apiClient.register,{
  onSuccess:async ()=>{
    
    showToast({message:"Registration Success! ",type:"SUCCESS"});
    await querClient.invalidateQueries("validateToken");
    navigate("/");
    
  },
  onError:(error:Error)=>{
     showToast({message:error.message,type:"ERROR"});
  }
});
 const onSubmit=handleSubmit((data)=>{
  mutation.mutate(data)
 });
  return (
   <form className="flex flex-col gap-5" onSubmit={onSubmit}>
    <h2 className="text-3xl font-bold" >Create an Account</h2>
    <div className="flex flex-col md:flex-row gap-5">
      <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
        <input {...register("firstName",{required:"This field is required"})} className="border rounded w-full py-1 px-2 font-normal" />
        {errors.firstName && (<span className="text-red-500">{errors.firstName.message}</span>)}
      </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
        Last Name
        <input type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("lastName",{required:"This field is required"})}/>
         {errors.lastName && (<span className="text-red-500">{errors.lastName.message}</span>)}
      </label>
      
    </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"This field is required"})}/>
         {errors.email && (<span className="text-red-500">{errors.email.message}</span>)}
      </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{required:"This field is required",minLength:{
          value:6,
          message:"Password must be atleast  6 or more characters"
        }})}/>
         {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
      </label>
       <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword",{
          //takes out the value from the input box
          validate:(val)=>{
            if(!val){
              //if field is empty!
              return "This field is required "
            }
            // if passwords do not match
             else if(watch("password")!==val){
                return "Your passwords do not match";
            }
          }
      })}
      />
       {errors.confirmPassword && (<span className="text-red-500">{errors.confirmPassword.message}</span>)}
      </label>
      <span>
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
   </form>
  )
}

export default Register
