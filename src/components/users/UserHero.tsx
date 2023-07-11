import Image from "next/image";
import Avatar from "../Avatar";
import type { User } from "@prisma/client";

interface IUserHeroProps {
  user: User;
}

const UserHero: React.FC<IUserHeroProps> = ({ user }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="Cover image"
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar user={user} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
