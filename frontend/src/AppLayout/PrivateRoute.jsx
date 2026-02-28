// This component now simply passes through children without any auth checks
const PrivateRoute = ({ children }) => {
  return children;
};

export default PrivateRoute;
