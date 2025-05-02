export interface IJob {
  _id: string;
  title: string;
  description: string;
  responsibilities?: string[];
  skills?: string[];
  location: string;
  level: string;
  ctc: string;
  category:
    | "programming"
    | "dataScience"
    | "designing"
    | "networking"
    | "management"
    | "marketing"
    | "cybersecurity";
  companyId: {
    _id: string;
    name: string;
    iconUrl: string;
    description: string;
    website: string;
  }; // or if you have a Company type: Company
  postedBy: string; // or if you have a User type: User
  applyLabel?: string;
  createdAt: string;
  updatedAt: string;
}
