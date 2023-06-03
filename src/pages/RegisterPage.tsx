import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRegisterUserMutation } from "../hooks/auth";
import { getServerErrorMessage } from "../utils/error";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/login");
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
    <main className="flex flex-col items-center px-4 py-8 gap-8">
      <h1 className="text-2xl md:text-4xl font-bold">Create New Account</h1>
      {registerUser.isLoading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <Formik
          initialValues={initialRegisterFormValues}
          onSubmit={registerFormHandler}
        >
          {({ values, isSubmitting }) => (
            <Form className="text-xl w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
              {(values.error || registerUser.isError) && (
                <div className="flex justify-center text-lg">
                  <span className="text-red-500 text-center">
                    {values.error || getServerErrorMessage(registerUser.error)}
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
              <div className="flex flex-col">
                <label htmlFor="password2">Repeat Password :</label>
                <Field
                  id="password2"
                  type="password"
                  className="border-b border-black outline-none py-2"
                  placeholder="Repeat your password"
                  required
                  name="password2"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary p-2"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div className="text-center">
        <p>Already have an account ?</p>
        <p>
          Login{" "}
          <Link to={"/login"} className="underline">
            here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
