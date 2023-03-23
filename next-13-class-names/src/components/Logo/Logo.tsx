import Image from "next/image";
import style from "./Logo.module.scss";

const Logo = () => {
  return (
    <Image
      className={style.robocop}
      src="/robo-square.png"
      alt="Robocop the cyborg policeman"
      width="450"
      height="450"
    />
  );
};

export default Logo;
