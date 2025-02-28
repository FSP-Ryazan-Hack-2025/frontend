"use client";

import { withAuth } from "@/shared/hoc";


function Home() {
    return (
        <h2>Home</h2>
    );
}

export default withAuth(Home);
