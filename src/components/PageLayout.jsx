import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingFallback from "./LoadingFallback";

export default function PageLayout() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Suspense fallback={<LoadingFallback message="Loading page..." />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
