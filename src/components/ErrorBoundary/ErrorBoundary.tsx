import {Component, type ReactNode} from "react";
import "./ErrorBoundary.scss";
import {Alert} from "@mui/material";

type ErrorBoundaryProps = {
  children: ReactNode;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error): {
    errorMessage: string;
  } {
    return {errorMessage: error.toString() || "Something went wrong:("};
  }

  render(): ReactNode {
    if (this.state.errorMessage) {
      return (
        <div className="error-boundary">
          <Alert variant="filled" severity="error">
            {this.state.errorMessage}
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}
