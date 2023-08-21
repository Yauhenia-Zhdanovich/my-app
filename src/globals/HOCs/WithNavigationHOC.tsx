import {useNavigate} from "react-router-dom";

export default function withNavigation(Component: React.ComponentType<any>) {
  // eslint-disable-next-line react/display-name
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}
