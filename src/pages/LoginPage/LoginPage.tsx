import {Button, TextField} from "@mui/material";
import {Field, Form} from "react-final-form";
import "./LoginPage.scss";
import {Navigate} from "react-router-dom";
import React from "react";
import {UserContext} from "../../globals/user/UserContext";
import {type UserContextType} from "../../globals/user/interfaces";
import withNavigation from "../../globals/HOCs/WithNavigationHOC";

type LoginFormValue = {
  username: string;
  password: string;
};

const requiredValidator = (value: string): string | undefined =>
  value ? undefined : "Required";

class LoginPage extends React.Component<{navigate: any}, {}> {
  static contextType = UserContext;

  handleLogin = (values: LoginFormValue): void => {
    const {login, users} = this.context as UserContextType;

    login(users[users?.length - 1]?.id);
    this.props.navigate("/conversations");
  };

  render(): JSX.Element {
    const {isLoggedIn} = this.context as UserContextType;

    if (isLoggedIn) {
      return <Navigate to="/conversations" />;
    }

    return (
      <div className="login">
        <h1>Login</h1>
        <div className="hint">Hint: enter any string you want!</div>
        <Form
          onSubmit={this.handleLogin}
          render={({hasValidationErrors, handleSubmit}) => {
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
}

export default withNavigation(LoginPage);
