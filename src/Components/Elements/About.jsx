import { Link } from "react-router-dom";

export const About = (props) => {
  const { children, to } = props;
  return (
    <Link to={to} className="flex items-center my-2" target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
};