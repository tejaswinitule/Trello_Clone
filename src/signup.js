import { useState } from "react";
import axios from "axios";

function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name || !email || !password) return "All fields required ❌";
    if (!email.includes("@")) return "Invalid email ❌";
    if (password.length < 6) return "Min 6 characters ❌";
    return null;
  };

  const registerUser = async () => {
    const err = validate();
    if (err) return setError(err);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup Successful 🎉");
      setPage("login");
    } catch {
      setError("Signup failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account 🚀</h2>

          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

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

          <button onClick={registerUser} style={styles.btn}>
            Sign Up
          </button>

          <p style={styles.link} onClick={() => setPage("login")}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    height: "100vh",

    // 🔥 Background image
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  // 🔥 Dark overlay
  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.5)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔥 GLASS CARD
  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "15px",
    width: "320px",

    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",

    textAlign: "center",
    color: "white",
  },

  title: {
    marginBottom: "20px",
    color: "white",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.4)",
    outline: "none",

    background: "rgba(255,255,255,0.2)",
    color: "white",
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",

    background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    color: "#ff4d4d",
    fontSize: "14px",
  },

  link: {
    marginTop: "15px",
    cursor: "pointer",
    color: "#ddd",
  },
};

export default Signup;