import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import { useGetMeUserQuery, useLoginUserMutation } from "../hooks/auth";
import { useCallback, useEffect } from "react";
import { getServerErrorMessage } from "../utils/error";

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
  const getMeUser = useGetMeUserQuery({ enabled: false });

  const successLoginHandler = useCallback(() => {
    console.log("login success");
    getMeUser.refetch();
  }, [getMeUser]);

  const loginUser = useLoginUserMutation({ onSuccess: successLoginHandler });

  useEffect(() => {
    if (getMeUser.isSuccess) {
      console.log(getMeUser.data);
    }
  }, [getMeUser.isSuccess, getMeUser.data]);

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
    <main className="flex flex-col items-center px-4 py-8 gap-8">
      <h1 className="text-4xl font-bold">Sign-In</h1>
      {loginUser.isLoading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <Formik
          initialValues={initialLoginFormValues}
          onSubmit={loginFormHandler}
        >
          {({ values, isSubmitting }) => (
            <Form className="text-xl w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
              {(values.error || loginUser.isError) && (
                <div className="flex justify-center text-lg">
                  <span className="text-red-500 text-center">
                    {values.error || getServerErrorMessage(loginUser.error)}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="username">Username :</label>
                <Field
                  id="username"
                  type="text"
                  className="border-b border-black outline-none py-2"
                  placeholder="Enter your username"
                  required
                  name="username"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password :</label>
                <Field
                  id="password"
                  type="password"
                  className="border-b border-black outline-none py-2"
                  placeholder="Enter your password"
                  required
                  name="password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary p-2"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div className="text-center">
        <p>Don't have an account yet ?</p>
        <p>
          Register{" "}
          <Link to={"/register"} className="underline">
            here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
