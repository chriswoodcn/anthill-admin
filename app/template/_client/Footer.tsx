const Footer = () => {
  return (
    <div className="p-6 pt-0 mt-auto text-center ltr:sm:text-left rtl:sm:text-right dark:text-white-5">
      &copy; {new Date().getFullYear()}. Anthill All rights reserved.
    </div>
  );
};

export default Footer;
