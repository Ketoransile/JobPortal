// "use client";
// import React from "react";
// import { MdDashboard } from "react-icons/md";
// import { UserButton } from "@clerk/nextjs";
// import { VscGitStashApply } from "react-icons/vsc";

// const UserButtonComponent = ({ userRole }) => {
//   console.log("user role passed to userbutton is ", userRole);
//   return (
//     <UserButton>
//       <UserButton.MenuItems>
//         {userRole === "user" && (
//           <UserButton.Link
//             label="My Applications"
//             labelIcon={<VscGitStashApply size={16} />}
//             href="/my-applications"
//           />
//         )}
//         {userRole === "recruiter" && (
//           <UserButton.Link
//             label="Dashboard"
//             labelIcon={<MdDashboard size="16" />}
//             href="/recruiter/dashboard/add-jobs"
//           />
//         )}{" "}
//       </UserButton.MenuItems>
//     </UserButton>
//   );
// };

// export default UserButtonComponent;
"use client";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import { VscGitStashApply } from "react-icons/vsc";

const UserButtonComponent = ({ userRole }) => {
  console.log("user role passed to userbutton is ", userRole);

  return (
    <UserButton>
      <UserButton.MenuItems>
        {userRole === "user" && (
          <UserButton.Link
            label="My Applications"
            labelIcon={<VscGitStashApply size={16} />}
            href="/my-applications"
          />
        )}
        {userRole === "recruiter" && (
          <UserButton.Link
            label="Dashboard"
            labelIcon={<MdDashboard size="16" />}
            href="/recruiter/dashboard/add-jobs"
          />
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserButtonComponent;
