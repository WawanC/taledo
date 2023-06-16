import GoogleIcon from "../icons/GoogleIcon";

interface Props {
  className?: string;
  linkMode?: boolean;
  exists?: {
    email?: string;
  };
}

const GoogleSignInBtn: React.FC<Props> = (props) => {
  return (
    <button
      className={`btn px-4 py-2 rounded-xl flex items-center gap-4 shadow ${props.className}`}
    >
      <GoogleIcon className="w-6 h-6" />
      <a
        href={props.linkMode ? "/api/auth/link/google" : `/api/auth/google`}
        className="font-bold"
      >
        {props.exists?.email
          ? props.exists.email
          : props.linkMode
          ? "Connect Google"
          : "Sign In with Google"}
      </a>
    </button>
  );
};

export default GoogleSignInBtn;
