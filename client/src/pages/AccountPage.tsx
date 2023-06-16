import GoogleSignInBtn from "../components/GoogleSignInBtn";
import { useGetMeUserQuery } from "../hooks/auth";

const AccountPage = () => {
  const getMeUser = useGetMeUserQuery({ enabled: false });

  return (
    <main
      className="bg-light dark:bg-semi_bold flex-1 
    flex flex-col gap-12 items-center py-8 px-4 text-xl"
    >
      <h1 className="text-4xl font-bold">My Account</h1>
      <ul className="flex flex-col w-[80%] md:w-1/4 gap-8 items-center">
        <li className="flex justify-between w-full">
          <span>Username : </span>
          <span>{getMeUser.data?.user.username}</span>
        </li>
        <li>
          <GoogleSignInBtn
            className="dark:bg-bold text-sm"
            linkMode={true}
            exists={{
              email: getMeUser.data?.user.google
            }}
          />
        </li>
      </ul>
    </main>
  );
};

export default AccountPage;
