const API_URL = import.meta.env.PROD 
  ? "https://your-backend-app.onrender.com"  // ✅ Apna backend URL yahan dalo
  : "http://localhost:5000";

export default API_URL;