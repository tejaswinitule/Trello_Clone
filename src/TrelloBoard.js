function TrelloBoard({ user, logout }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Trello Clone</h1>

      <h5 style={styles.welcome}>Welcome {user.name}</h5>

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>

      <div style={styles.board}>
        <div style={{ ...styles.column, background: "#ffcccc" }}>
          <h2>TODO 🔴</h2>
          <p>Task 1</p>
          <p>Task 2</p>
        </div>

        <div style={{ ...styles.column, background: "#cce5ff" }}>
          <h2>DOING 🔵</h2>
          <p>Task 3</p>
        </div>

        <div style={{ ...styles.column, background: "#d4edda" }}>
          <h2>DONE 🟢</h2>
          <p>Task 4</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#fff3e0",
    minHeight: "100vh",
    padding: "20px",
  },
  title: {
    color: "#ff5722",
  },
  welcome: {
    color: "#333",
  },
  logout: {
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    marginBottom: "20px",
  },
  board: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  column: {
    width: "200px",
    padding: "10px",
    borderRadius: "10px",
  },
};

export default TrelloBoard;