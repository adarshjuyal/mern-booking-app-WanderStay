import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestSection=()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();
    return(
        <div>
            <h1 className="text-2xl font-bold mb-3">Guests</h1>
            <div className="grid p-6 grid-col-2 gap-5 bg-gray-300">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                   <input type="number" className="border-rounded w-full py-2 px-3 font-normal" min={1}
                   {...register("adultCount",{
                    required:"This field is required",
                   })} />
                   {errors.adultCount?.message && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.adultCount?.message}
                    </span>
                   )}
                </label>
                       <label className="text-gray-700 text-sm font-semibold">
                  Children
               <input type="number" className="border-rounded w-full py-2 px-3 font-normal" min={1}
                   {...register("childCount",{
                    required:"This field is required",
                   })} />
                   
                </label>
                {errors.childCount?.message && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.childCount?.message}
                    </span>
                   )}
            </div>
        </div>
    )

}
export default GuestSection;