const Footer=()=>{
    return(
        <div className="bg-blue-800 py-6">
            <div className="container flex mx-auto justify-between items-center">
                <h2 className="text-white font-bold text-3xl tracking-tight">WanderStay.com</h2>
                <span className="text-white font-bold flex gap-4 tracking-tight">
                   <p className="cursor-pointer">Privacy Policy</p>
                   <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}
export default Footer;