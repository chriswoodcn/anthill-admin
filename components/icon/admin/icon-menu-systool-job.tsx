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
      <path d="M20.931 13.111a9 9 0 1 0 -9.453 7.874" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
      <path d="M12 7v5l2 2" />
    </svg>
  );
};

export default IconMenu;
