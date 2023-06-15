import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../hooks/auth";
import { getServerErrorMessage } from "../utils/error";
import GoogleIcon from "../icons/GoogleIcon";
import Loader from "../components/Loader";

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
    bg-bold min-h-screen text-light"
    >
      <div className="flex flex-col items-center">
        <div className="w-28 h-28">
          <img
            src="/applogo.svg"
            alt="applogo"
            className="w-full h-full object-cover"
          />
        </div>
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
                  className="border-b border-light outline-none py-2 bg-transparent"
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
                  className="border-b border-light outline-none py-2 bg-transparent"
                  placeholder="Enter your password"
                  required
                  name="password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-semi_bold rounded-xl px-4 py-2 font-bold shadow"
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
        <button className="px-4 py-2 bg-semi_bold rounded-xl flex gap-4 shadow">
          <GoogleIcon className="w-6 h-6" />
          <a href={`/api/auth/google`} className="font-bold">
            Sign In with Google
          </a>
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
