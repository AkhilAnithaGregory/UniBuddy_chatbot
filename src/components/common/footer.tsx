import { useSidebar } from "@/lib/context/sidebar-context"
export const Footer =()=> {
    const {isSidebarOpen} = useSidebar();
    return(
        <footer className={`${isSidebarOpen ? "pl-4 sm:pl-56" : "pl-4 sm:pl-28"} text-xs sm:text-base transition-all duration-300 text-center pb-2`}>
            By Messaging in UniBuddy, you agree to our Terms and have read our Privacy Policy.
        </footer>
    )
}