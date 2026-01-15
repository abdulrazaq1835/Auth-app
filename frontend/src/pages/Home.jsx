import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {  //
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/auth/home",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName(response.data.name);

    } catch (error) {
      navigate("/login");
    }
  };

  // 🔹 Yahan add karo
  useEffect(() => {
    const handleTokenFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    };

    handleTokenFromUrl();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome, {name} 👋</h1>
    </div>
  );
};

export default Home;
