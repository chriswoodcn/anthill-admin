import { FC } from "react";

interface IconMenuProps {
  className?: string;
}

const IconMenu: FC<IconMenuProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z" />
      <path d="M12 5v16" />
      <path d="M7 7h1" />
      <path d="M7 11h1" />
      <path d="M16 7h1" />
      <path d="M16 11h1" />
      <path d="M16 15h1" />
    </svg>
  );
};

export default IconMenu;
