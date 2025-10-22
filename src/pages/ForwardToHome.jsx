import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForwardToHome = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("../home"), []);

  return <h2>Forward to Home</h2>;
};

export default ForwardToHome;
