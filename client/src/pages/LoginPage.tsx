import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../hooks/auth";
import { getServerErrorMessage } from "../utils/error";
import Loader from "../components/Loader";
import DarkModeToggle from "../components/DarkModeToggle";
import AppLogo from "../components/AppLogo";
import GoogleSignInBtn from "../components/GoogleSignInBtn";

interface LoginForm {
  username: string;
  password: string;
  error: string | null;
}

const LoginPage: React.FC = () => {
  const initialLoginFormValues: LoginForm = {
    username: "",
    password: "",
    error: null
  };

  const loginUser = useLoginUserMutation();

  const loginFormHandler = (
    values: LoginForm,
    actions: FormikHelpers<LoginForm>
  ) => {
    if (values.username.trim().length < 1) {
      actions.setFieldValue("error", "Valid username is required");
      actions.setFieldValue("username", "");
      actions.setFieldValue("password", "");
      return;
    }

    loginUser.mutate({
      payload: {
        username: values.username.trim(),
        password: values.password
      }
    });

    actions.resetForm();
  };

  return (
    <main
      className="flex flex-col items-center px-4 py-8 gap-8 
    bg-light dark:bg-bold min-h-screen"
    >
      <DarkModeToggle className="absolute top-4 right-4" />
      <div className="flex flex-col items-center">
        <AppLogo className="w-28 h-28" />
        <h1 className="text-4xl font-bold">Sign-In</h1>
      </div>
      {loginUser.isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialLoginFormValues}
          onSubmit={loginFormHandler}
        >
          {({ values }) => (
            <Form className="text-xl w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
              {(values.error || loginUser.isError) && (
                <div className="flex justify-center text-lg">
                  <span className="text-red-500 text-center">
                    {values.error || getServerErrorMessage(loginUser.error)}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="username" className="font-bold">
                  Username :
                </label>
                <Field
                  id="username"
                  type="text"
                  className="input-underline 
                  outline-none py-2 bg-transparent"
                  placeholder="Enter your username"
                  required
                  name="username"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-bold">
                  Password :
                </label>
                <Field
                  id="password"
                  type="password"
                  className="input-underline 
                  outline-none py-2 bg-transparent"
                  placeholder="Enter your password"
                  required
                  name="password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn rounded-xl px-4 py-2 font-bold shadow"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div className="text-center">
        <p>
          Don't have an account yet ? Register{" "}
          <Link to={"/register"} className="underline">
            here
          </Link>
        </p>
      </div>
      <div>
        <GoogleSignInBtn />
      </div>
    </main>
  );
};

export default LoginPage;
