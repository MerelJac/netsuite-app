import HeaderBanner from "../components/HeaderBanner";
import ProductData from "../components/ProductData";

function LandingPage() {
    return (
        <>
            <HeaderBanner/>
            <div className="container mx-auto p-4"> {/* Optional wrapper for layout styling */}
                <ProductData />  {/* Your customer data list */}
            </div>
        </>

    )
}

export default LandingPage;