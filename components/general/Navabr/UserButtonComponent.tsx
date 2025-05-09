"use client";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import { VscGitStashApply } from "react-icons/vsc";
import { FcManager } from "react-icons/fc";

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
        {userRole === "admin" && (
          <UserButton.Link
            label="Admin Dashboard"
            labelIcon={<FcManager size="16" />}
            href="#"
          />
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserButtonComponent;
