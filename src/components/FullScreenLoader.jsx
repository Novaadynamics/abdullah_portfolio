"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../public/background/logo.png";
import Image from "next/image";

const FullScreenLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-[9999]">
  <div className="relative w-24 h-24">
    {/* Outer halo glow */}
    <div className="absolute inset-0 rounded-full border-4 border-ember-halo opacity-50 animate-ping"></div>

    {/* Spinning loader */}
    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-ember-neon animate-spin"></div>

    {/* Inner core circle */}
    <div className="absolute inset-4 p-2 rounded-full bg-[#fcf599] shadow-[0_0_25px_12px_rgba(234,181,62,0.9)] flex items-center justify-center">
      <Image
        src={Logo}
        alt="logo"
        className="w-full h-full object-contain "
        style={{ filter: "drop-shadow(0px 4px 1px #eab53e)" }}
      />
    </div>
  </div>
</div>



    );
  }

  // Show page content after loader disappears
  return <>{children}</>;
};

export default FullScreenLoader;
