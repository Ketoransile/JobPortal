import { UserApplicationsTable } from "@/components/general/users/UserApplicationsTable";
import { Button } from "@/components/ui/button";

export default function MyApplicationsPage() {
  return (
    <div className="flex flex-col gap-10 pt-10">
      <div className=" flex flex-col gap-4">
        <h1 className="text-lg font-bold">Your Resume</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-50 hover:bg-blue-500 hover:text-white cursor-pointer rounded-md border border-blue-100 text-blue-600 font-bold">
            Resume{" "}
          </Button>
          <Button className="bg-transparent hover:bg-black hover:text-white cursor-pointer rounded-md border border-gray-200 text-gray-600">
            Edit{" "}
          </Button>
        </div>
      </div>
      <div className=" flex flex-col gap-4">
        <h1 className="text-lg font-bold">Jobs Applied</h1>
        <UserApplicationsTable />
      </div>
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
