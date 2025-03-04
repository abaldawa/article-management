/**
 * @author Abhijit Baldawa
 */

import { Analyst } from "../services/types/analyst";

type UserAvatarProps = {
  analyst: Analyst;
  onClick?: () => void;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ analyst, onClick }) => {
  const initials = `${analyst.firstName[0]}${analyst.lastName[0]}`;

  return (
    <article
      className={`flex items-center space-x-2 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative w-10 h-10">
        {analyst.picture ? (
          <img
            src={`https://eu.ui-avatars.com/api/?name=${analyst.firstName[0]}+${analyst.lastName[0]}&size=250`}
            alt={`${analyst.firstName} ${analyst.lastName}`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
            {initials}
          </div>
        )}
      </div>
      <span className="font-medium">
        {analyst.firstName} {analyst.lastName}
      </span>
    </article>
  );
};

export { UserAvatar };
