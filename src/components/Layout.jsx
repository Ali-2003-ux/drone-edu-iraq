import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Plane, Calculator, BookOpen, Wrench, Menu, X, Cpu, ShoppingCart, BrainCircuit, Activity, Folder, Award } from 'lucide-react';
import { cn } from '../utils/cn';

const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
            active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
        )}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </Link>
);

const Layout = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const location = useLocation();

    const navItems = [
        { to: "/", icon: Plane, label: "Fundamentals" },
        { to: "/engineering", icon: Activity, label: "Simulations" },
        { to: "/hardware", icon: Cpu, label: "Hardware" },
        { to: "/ai", icon: BrainCircuit, label: "AI Mechanic" },
        { to: "/market", icon: ShoppingCart, label: "Marketplace" },
        { to: "/vault", icon: Folder, label: "Project Vault" },
        { to: "/cert", icon: Award, label: "Certification" },
        { to: "/tools", icon: Calculator, label: "Calculators" },
        { to: "/build", icon: Wrench, label: "Build Guide" },
        { to: "/code", icon: BookOpen, label: "Code Lab" },
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
                    !isOpen && "-translate-x-full lg:hidden"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <Plane className="text-indigo-500 mr-3" size={28} />
                    <span className="text-xl font-bold tracking-tight">Drone<span className="text-indigo-500">Edu</span></span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            {...item}
                            active={location.pathname === item.to}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Status</h4>
                        <div className="flex items-center space-x-2 text-sm text-green-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Development</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-dot-pattern">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <Plane className="text-indigo-500 mr-3" size={24} />
                        <span className="text-lg font-bold">DroneEdu</span>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
