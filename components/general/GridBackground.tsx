import React from "react";

export function GridBackground() {
    return (
        <div className="fixed inset-0 -z-20 h-full w-full bg-white dark:bg-zinc-950">
            {/* Small grid */}
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Large grid for emphasis */}
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]"></div>

            {/* Radial gradient mask to make it look fancy and fade out towards edges/bottom */}
            <div className="absolute inset-0 bg-transparent dark:bg-transparent [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Ambient glow */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>
    );
}
