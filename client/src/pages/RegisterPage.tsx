import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRegisterUserMutation } from "../hooks/auth";
import { getServerErrorMessage } from "../utils/error";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../icons/GoogleIcon";
import Loader from "../components/Loader";
import DarkModeToggle from "../components/DarkModeToggle";

interface RegisterForm {
  username: string;
  password: string;
  password2: string;
  error: string | null;
}

const RegisterPage: React.FC = () => {
  const initialRegisterFormValues: RegisterForm = {
    username: "",
    password: "",
    password2: "",
    error: null
  };
  const navigate = useNavigate();
  const registerUser = useRegisterUserMutation({
    onSuccess: () => {
      navigate("/dashboard");
    }
  });

  const registerFormHandler = (
    values: RegisterForm,
    actions: FormikHelpers<RegisterForm>
  ) => {
    if (values.username.trim().length < 6) {
      actions.setFieldValue("error", "Username must be min 6 characters long");
      actions.setFieldValue("username", "");
      actions.setFieldValue("password", "");
      actions.setFieldValue("password2", "");
      return;
    }

    if (values.password.trim().length < 6) {
      {
        actions.setFieldValue(
          "error",
          "Password must be min 6 characters long"
        );
        actions.setFieldValue("password", "");
        actions.setFieldValue("password2", "");
        return;
      }
    }

    if (values.password !== values.password2) {
      actions.setFieldValue("error", "Passwords doesn't matched");
      actions.setFieldValue("password", "");
      actions.setFieldValue("password2", "");
      return;
    }

    registerUser.mutate({
      payload: { username: values.username.trim(), password: values.password }
    });

    actions.resetForm();
  };

  return (
    <main
      className="flex flex-col items-center px-4 py-8 gap-8 
      bg-light dark:bg-bold min-h-screen "
    >
      <DarkModeToggle className="absolute top-4 right-4" />
      <div className="flex flex-col items-center">
        <div className="w-28 h-28">
          <img
            src="/applogo.svg"
            alt="applogo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Create New Account
        </h1>
      </div>
      {registerUser.isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialRegisterFormValues}
          onSubmit={registerFormHandler}
        >
          {({ values }) => (
            <Form className="text-xl w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
              {(values.error || registerUser.isError) && (
                <div className="flex justify-center text-lg">
                  <span className="text-red-500 text-center">
                    {values.error || getServerErrorMessage(registerUser.error)}
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
                  className="input-underline outline-none py-2 bg-transparent"
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
                  className="input-underline outline-none py-2 bg-transparent"
                  placeholder="Enter your password"
                  required
                  name="password"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password2" className="font-bold">
                  Repeat Password :
                </label>
                <Field
                  id="password2"
                  type="password"
                  className="input-underline outline-none py-2 bg-transparent"
                  placeholder="Repeat your password"
                  required
                  name="password2"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn rounded-xl px-4 py-2 font-bold shadow"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div className="text-center">
        <p>
          Already have an account ? Login{" "}
          <Link to={"/login"} className="underline">
            here
          </Link>
        </p>
      </div>
      <div>
        <button className="btn px-4 py-2 rounded-xl flex gap-4 shadow">
          <GoogleIcon className="w-6 h-6" />
          <a href={`/api/auth/google`} className="font-bold">
            Sign In with Google
          </a>
        </button>
      </div>
    </main>
  );
};

export default RegisterPage;
