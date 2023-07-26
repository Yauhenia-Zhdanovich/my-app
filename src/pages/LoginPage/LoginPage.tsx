import {Button, TextField} from "@mui/material";
import {Field, Form} from "react-final-form";
import "./LoginPage.scss";
import {useUser} from "../../globals/user/UserContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Loader from "../../components/Loader";

type LoginFormValue = {
  username: string;
  password: string;
};

const requiredValidator = (value: string): string | undefined =>
  value ? undefined : "Required";

export default function LoginPage(): JSX.Element {
  const {login, users, isLoggedIn, isLoading} = useUser();
  const navigate = useNavigate();

  const onSubmit = (values: LoginFormValue): void => {
    login(users[users.length - 1].id);
  };

  useEffect(() => {
    isLoggedIn && navigate("/conversations");
  }, [isLoggedIn]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="hint">Hint: enter any string you want!</div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, hasValidationErrors}) => {
          return (
            <form className="login-form" onSubmit={handleSubmit}>
              <Field validate={requiredValidator} name="username">
                {({input, meta}) => (
                  <TextField
                    required
                    label="Username"
                    error={!meta.valid && meta.touched}
                    value={input.value}
                    onBlur={input.onBlur}
                    onChange={input.onChange}
                    helperText={meta.touched && meta.error}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </Field>

              <Field validate={requiredValidator} name="password">
                {({input, meta}) => (
                  <TextField
                    required
                    value={input.value}
                    type="password"
                    onChange={input.onChange}
                    label="Password"
                    onBlur={input.onBlur}
                    helperText={meta.touched && meta.error}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={meta.error && meta.touched}
                  />
                )}
              </Field>
              <Button
                disabled={hasValidationErrors}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
}
