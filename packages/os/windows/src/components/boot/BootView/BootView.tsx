"use client";
import React from "react";
import WindowsBootSpinner from "../WindowsBootSpinner";

interface BootViewProps {
  logo: React.ReactNode;
}

export default function BootView({ logo }: BootViewProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {logo}
      <WindowsBootSpinner />
    </div>
  );
}
