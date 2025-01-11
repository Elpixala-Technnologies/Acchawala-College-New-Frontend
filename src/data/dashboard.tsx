import { FaRocketchat } from "react-icons/fa";
import { MdAutoGraph, MdGolfCourse } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";

export const dashboard = {
  tabs: [
    {
      id: "1",
      label: "Profile",
      icon: <RxDashboard />,
    },
    {
      id: "2",
      label: "Applied Colleges",
      icon: <PiStudentBold />,
    },
    {
      id: "3",
      label: "Your Reviews",
      icon: <MdGolfCourse />,
    },
    {
      id: "4",
      label: "Pending Applications",
      icon: <MdAutoGraph />,
    },
    {
      id: "5",
      label: "Account Settings",
      icon: <FaRocketchat />,
    },
  ],
};
