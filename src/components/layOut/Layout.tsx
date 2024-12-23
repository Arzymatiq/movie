import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const Layout = () => (
    <div>
        <NavBar />
        <main>
            <Outlet />
        </main>
    </div>
);

export default Layout;
