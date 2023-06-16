import { useMemo } from "react";
import useAppState from "../stores/app";

interface Props {
  className: string;
}

const AppLogo: React.FC<Props> = (props) => {
  const darkMode = useAppState((state) => state.darkMode);

  const appLogoSrc = useMemo(
    () => (darkMode ? "AppLogo - DarkMode.svg" : "AppLogo - LightMode.svg"),
    [darkMode]
  );

  return (
    <div className={props.className}>
      <img
        src={`/${appLogoSrc}`}
        alt="applogo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AppLogo;
