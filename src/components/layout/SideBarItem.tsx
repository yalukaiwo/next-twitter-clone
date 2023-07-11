import { useCurrentUser, useLoginModal } from "@/hooks";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface ISideBarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

const SideBarItem: React.FC<ISideBarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}) => {
  const { data: user } = useCurrentUser();
  const loginModal = useLoginModal();

  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (auth && !user) return loginModal.onOpen();
    if (href) return router.push(href, undefined, { shallow: true });

    throw new Error("Something went wrong while redirecting.");
  }, [onClick, auth, user, loginModal, href, router]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-opacity-10 hover:bg-slate-300 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SideBarItem;
