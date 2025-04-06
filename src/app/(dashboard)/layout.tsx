"use client"

import { useEffect, useState } from "react"
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navActive, setNavActive] = useState<boolean>(false)
  const handleNav = () => {
    setNavActive(!navActive)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setNavActive(false);
      } else {
        setNavActive(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return (
    <>
      <main className="min-h-screen">
        <div className="flex justify-between">
          <div className={`${navActive ? "w-4/12 md:w-2/12" : "w-2/12 md:w-1/12"} bg-emerald-50 h-screen fixed`}>
            <Sidebar navActive={navActive} />
          </div>
          <div className={`${navActive ? "w-8/12 md:w-10/12" : "w-10/12 md:w-11/12"} ms-auto h-[200vh]`}>
            <Header handleNav={handleNav} />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
