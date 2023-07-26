import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

type ErrorAlertProps = {
  message: string;
};

export default function ErrorAlert({message}: ErrorAlertProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="error"
        sx={{width: "100%"}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
