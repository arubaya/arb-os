"use client";
import WindowsBootSpinner from "../WindowsBootSpinner";

export default function ShutDownView() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <WindowsBootSpinner />
      <p className="text-xl">Shutting down</p>
    </div>
  );
}
