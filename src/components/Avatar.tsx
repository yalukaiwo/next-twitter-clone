import { useUser } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { User } from "@prisma/client";

interface IAvatarProps {
  user: User;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ user, isLarge, hasBorder }) => {
  const router = useRouter();
  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      const url = `/users/${user.id}`;

      router.push(url, undefined, { shallow: true });
    },
    [router, user.id]
  );

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        className="object-cover rounded-full"
        alt="Avatar"
        src={user?.profileImage ?? "/images/placeholder.png"}
        onClick={clickHandler}
      />
    </div>
  );
};

export default Avatar;
