const Header = () => {
    const navItems = (
        <>
            <li><a>Item 1</a></li>
            <li><a>Item 1</a></li>
            <li><a>Item 1</a></li>
        </>
    )
    return (
        <header className="bg-base-100 shadow-sm">
            <div className="navbar justify-between w-11/12 sm:container xl:8/12 mx-auto">
                <div className="">
                    <a className="text-xl">LOGO</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow">
                                <li>
                                    <a>user name</a>
                                </li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                        <div className="dropdown relative">
                            <div tabIndex={0} role="button" className="hover:bg-gray-100 cursor-pointer rounded-lg p-3 lg:hidden transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 absolute -right-4 w-52 p-2 shadow">
                                {navItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header