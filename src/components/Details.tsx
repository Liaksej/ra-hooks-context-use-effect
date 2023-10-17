import { UserData } from "@/app/page";

interface DetailsProps {
  userData: UserData | null;
  isLoading: boolean;
}

export const Details = ({ userData, isLoading }: DetailsProps) => {
  if (isLoading) {
    return (
      <div className="w-[300px] h-[300px]">
        <div className="w-full">Loading...</div>
      </div>
    );
  }
  if (!userData) {
    return <div className="w-[300px]"></div>;
  }
  return (
    <div className="w-[300px] divide-y divide-gray-200 text-sm leading-6 text-gray-900">
      <img src={userData.avatar} alt={String(userData.id)} />
      <div className="py-2">{userData.name}</div>
      <ul className="divide-y divide-gray-200 ">
        <li className="py-2">{userData.details.city}</li>
        <li className="py-2">{userData.details.company}</li>
        <li className="py-2">{userData.details.position}</li>
      </ul>
    </div>
  );
};
