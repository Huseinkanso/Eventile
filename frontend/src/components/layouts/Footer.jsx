import {
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="items-center grid-flow-col">
        <FaCopyright />
        <p>Copyright 2023 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="">
          <FaFacebook />
        </a>
        <a href="">
          <FaTwitter />
        </a>
        <a href="">
          <FaInstagram />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
