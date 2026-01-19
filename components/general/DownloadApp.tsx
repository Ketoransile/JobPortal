import Image from "next/image";
import Link from "next/link";
import React from "react";

const DownloadApp = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-12 text-white shadow-2xl">
      <div className="absolute top-0 right-0 -m-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -m-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src="/pointer.svg"
            width={300}
            height={300}
            alt="pointer-character"
            className="relative w-48 lg:w-64 drop-shadow-2xl max-md:hidden"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 flex-1">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Get the App for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Smoother Experience</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
            Download our mobile app to search on the go, get instant notifications, and never miss an opportunity used by 1M+ job seekers.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/" className="transition-all hover:scale-105 active:scale-95 opacity-90 hover:opacity-100">
              <Image
                src="/googlePlay.svg"
                alt="google-play-icon"
                width={180}
                height={54}
                className="h-14 w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
