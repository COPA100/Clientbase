import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    return (
        <>
            <div className="bg-background min-h-screen w-full">
                <Navbar></Navbar>
            </div>
        </>
    );
}
