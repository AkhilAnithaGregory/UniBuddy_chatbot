import { useSidebar } from "@/lib/context/sidebar-context"
export const Footer =()=> {
    const {isSidebarOpen} = useSidebar();
    return(
        <footer className={`${isSidebarOpen ? "pl-56" : "pl-28"} transition-all duration-300 text-center pb-2`}>
            By Messaging in UniBuddy, you agree to our Terms and have read our Privacy Policy.
        </footer>
    )
}