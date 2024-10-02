import CustomerData from "../components/CustomerData";
import HeaderBanner from "../components/HeaderBanner";

function LandingPage() {
    return (
        <>
            <HeaderBanner/>
            <div className="container mx-auto p-4"> {/* Optional wrapper for layout styling */}
                <CustomerData />  {/* Your customer data list */}
            </div>
        </>

    )
}

export default LandingPage;