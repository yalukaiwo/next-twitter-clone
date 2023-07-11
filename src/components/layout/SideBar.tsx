import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { IconType } from "react-icons";
import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import SideBarTweetButton from "./SideBarTweetButton";
import { useCurrentUser } from "@/hooks";
import { useCallback, useEffect } from "react";

interface ILabel {
  label: string;
  href: string;
  icon: IconType;
  isProtected?: boolean;
}

const SideBar = () => {
  const { data: user } = useCurrentUser();

  const items: ILabel[] = [
    { label: "Home", href: "/", icon: BsHouseFill },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      isProtected: true,
    },
    { label: "Profile", href: "/users/123", icon: FaUser, isProtected: true },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.isProtected}
            />
          ))}
          {user && (
            <SideBarItem
              onClick={() => {
                signOut();
              }}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;