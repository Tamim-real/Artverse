import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading"; 

const RouteLoader = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Loading />;

  return children;
};

export default RouteLoader;
