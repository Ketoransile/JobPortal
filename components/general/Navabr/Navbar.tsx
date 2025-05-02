// "use client";
// import { Button } from "@/components/ui/button";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// // import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect } from "react";
// // import { auth, currentUser } from "@clerk/nextjs/server";
// // import { useAuth } from "@clerk/nextjs";
// // import { BsFillSendFill } from "react-icons/bs";
// // import { User } from "lucide-react";
// import UserButtonComponent from "./UserButtonComponent";
// import { useAuth } from "@clerk/nextjs";
// // import { IoSunnyOutline } from "react-icons/io5";
// // import { FaRegMoon } from "react-icons/fa";
// // import ThemeToggler from "../ThemeToggler";
// const Navbar = () => {
//   const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth();
//   // const user = await currentUser();
//   let userRole = null;
//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (userId) {
//         const token = await getToken();
//         const baseUrl =
//           process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
//         console.log("base url is ", baseUrl);
//         const response = await fetch(`${baseUrl}/api/v1/users/current-user`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           cache: "no-store",
//         });
//         console.log("Response from navbar is ", response);
//         const data = await response.json();
//         console.log("parsed data is ", data.user);
//         console.log("user is ", data.user);
//         userRole = data?.user?.role;
//       }
//     };
//     fetchJobs();
//   }, []);
//   return (
//     <div className="z-10 top-0 sticky flex items-center justify-between py-4  px-4 lg:px-20 backdrop-blur-3xl bg-white/30 drop-shadow-xl shadow-gray-500   ">
//       <Link href="/" className="flex items-center gap-2">
//         {/* <Image src="/logo.png" width={32} height={32} alt="logo-image" /> */}
//         <h1 className="text-lg md:text-xl lg:text-2xl font-bold  text-black">
//           <span className="text-blue-600">Next</span>
//           Jobs
//         </h1>
//       </Link>
//       <div className="flex items-center gap-4">
//         {/* <ThemeToggler /> */}
//         <SignedOut>
//           <Link href="/recruiter/sign-up">
//             <Button className="w-fit max-md:max-w-[120px] break-words whitespace-normal text-center p-2 rounded-md bg-transparent border hover:border-none border-gray-300 text-gray-500 hover:bg-gray-300 cursor-pointer py-4">
//               Recruiters Signup
//             </Button>
//           </Link>
//           <Link href="/sign-up">
//             <Button className="bg-blue-600 hover:bg-blue-400 rounded-full px-6 cursor-pointer">
//               Signup
//             </Button>
//           </Link>
//         </SignedOut>{" "}
//         <SignedIn>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-4">
//               <h1 className="hidden lg:flex text-base text-center ">
//                 Hi, {user?.firstName}{" "}
//               </h1>
//               <UserButtonComponent userRole={userRole} />
//             </div>
//             {/* {user.firstName && (
//               <h1 className="text-gray-600">| Hi {user.firstName} !</h1>
//             )} */}
//           </div>
//         </SignedIn>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserButtonComponent from "./UserButtonComponent";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { userId, getToken } = useAuth();
  const { user } = useUser(); // <-- Clerk hook to get user data
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (userId) {
        try {
          const token = await getToken();
          const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
          const response = await fetch(`${baseUrl}/api/v1/users/current-user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          });

          const data = await response.json();
          setUserRole(data?.user?.role || null);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [userId, getToken]);

  return (
    <div className="z-10 top-0 sticky flex items-center justify-between py-4 px-4 lg:px-20 backdrop-blur-3xl bg-white/30 drop-shadow-xl shadow-gray-500">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
          <span className="text-blue-600">Next</span>
          Jobs
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/recruiter/sign-up">
            <Button className="p-2 rounded-md bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-300">
              Recruiters Signup
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-blue-600 hover:bg-blue-400 rounded-full px-6">
              Signup
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <h1 className="hidden lg:flex text-base text-center">
              Hi, {user?.firstName}
            </h1>
            <UserButtonComponent userRole={userRole} />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
