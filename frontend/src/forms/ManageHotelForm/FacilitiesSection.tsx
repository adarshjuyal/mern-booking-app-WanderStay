import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotels-options-config"
import { HotelFormData } from "./ManageHotelForm"


const FacilitiesSection = () => {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilites</h1>
      <div className="grid grid-cols-5 gap-3">
        {
            hotelFacilities.map((facililty)=>(
                    <label className="text-sm flex gap-1 text-gray-700">
                        <input type="checkbox" value={facililty} {...register("facilities",{
                        validate:(facililties)=>{
                            if(facililties && facililties.length>0)return true;
                            else return "At least one facility is required ";
                        },
                    })} />
                        <span>{facililty}</span>
                    </label>
            ))
        }

      </div>
      {errors.facilities &&(
            <span className="text-red-500 text sm font-bold">{errors.facilities.message}</span>
        ) }
    </div>
  )
}

export default FacilitiesSection;
