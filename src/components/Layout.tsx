import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111827] dark:text-gray-100">
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
