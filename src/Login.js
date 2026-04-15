import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) return "All fields required ❌";
    if (!email.includes("@")) return "Invalid email ❌";
    if (password.length < 6) return "Min 6 characters ❌";
    return null;
  };

  const loginUser = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch {
      setError("Login failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={loginUser} style={styles.btn}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1508780709619-79562169bc64')",
    backgroundSize: "cover",
    backgroundPosition: "center",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "15px",
    width: "320px",

    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#ff7eb3,#ff758c)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    color: "#ff4d4d",
  },
};

export default Login;