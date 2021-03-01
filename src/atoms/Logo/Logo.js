import React from "react";
import LogoImage from "./samba-code-logo-white-2x.png";
import Obfuscate from "react-obfuscate";

const Logo = () => (
  <div>
    <Obfuscate email="hello@sambacode.net" aria-label="Email Samba Code">
      <img width={150} height={30} src={LogoImage} alt="Samba Code" />
    </Obfuscate>
  </div>
);

export default Logo;
