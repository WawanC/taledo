import GoogleIcon from "../icons/GoogleIcon";

const GoogleSignInBtn: React.FC = () => {
  return (
    <button className="btn px-4 py-2 rounded-xl flex gap-4 shadow">
      <GoogleIcon className="w-6 h-6" />
      <a href={`/api/auth/google`} className="font-bold">
        Sign In with Google
      </a>
    </button>
  );
};

export default GoogleSignInBtn;
