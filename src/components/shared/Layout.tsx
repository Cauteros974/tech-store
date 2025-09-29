import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"

const Layout = () => {
    return(
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;