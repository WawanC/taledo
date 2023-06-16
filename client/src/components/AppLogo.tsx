import { useMemo } from "react";
import useAppState from "../stores/app";

interface Props {
  className: string;
}

const AppLogo: React.FC<Props> = (props) => {
  const isDarkMode = useAppState((state) => state.isDarkMode);

  const appLogoSrc = useMemo(
    () => (isDarkMode ? "AppLogo - DarkMode.svg" : "AppLogo - LightMode.svg"),
    [isDarkMode]
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
