import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import Signup from "./signup";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [showMenu, setShowMenu] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api";

  const handleLogin = (userData) => setUser(userData);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPage("login");
  };

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const validate = () => {
    if (!title.trim()) return "Title required ❌";
    if (title.length < 3) return "Min 3 chars ❌";
    return null;
  };

  const addTask = async () => {
    const err = validate();
    if (err) return setError(err);

    await axios.post(`${API}/add-task`, {
      title,
      description,
      image,
      status: "TODO",
    });

    setTitle("");
    setDescription("");
    setImage("");
    setError("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await axios.delete(`${API}/delete-task/${id}`);
    fetchTasks();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    await axios.put(`${API}/update-status/${result.draggableId}`, {
      status: result.destination.droppableId,
    });

    fetchTasks();
  };

  const columns = ["TODO", "DOING", "DONE"];

  // LOGIN SCREEN
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        {page === "login" ? (
          <Login setUser={handleLogin} />
        ) : (
          <Signup setPage={setPage} />
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setPage("login")} style={btn}>Login</button>
          <button onClick={() => setPage("signup")} style={btn}>Signup</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      
      {/* 🔥 OVERLAY */}
      <div style={styles.overlay}></div>

      <div style={styles.content}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>🚀 Trello Clone 🚀</h1>

          <div style={styles.profile}>
            <div onClick={() => setShowMenu(!showMenu)} style={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>

            {showMenu && (
              <div style={styles.dropdown}>
                <p>{user.name}</p>
                <button onClick={logout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 style={styles.welcome}>Welcome {user.name} 👋</h2>

        {/* FORM */}
        <div style={styles.form}>
          <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} style={styles.input}/>
          <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} style={styles.input}/>
          <input placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)} style={styles.input}/>
          <button onClick={addTask} style={styles.addBtn}>Add Task</button>
          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* BOARD */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={styles.board}>
            {columns.map(col => (
              <Droppable droppableId={col} key={col}>
                {(provided)=>(
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      ...styles.column,
                      background: col==="TODO" ? "#FF6B6B" : col==="DOING" ? "#FFD93D" : "#6BCB77"
                    }}
                  >
                    <h2 style={{textAlign:"center"}}>{col}</h2>

                    {tasks.filter(t=>t.status===col).map((t,index)=>(
                      <Draggable key={t._id} draggableId={t._id} index={index}>
                        {(provided)=>(
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{...styles.card, ...provided.draggableProps.style}}

                            onMouseEnter={(e)=>{
                              e.currentTarget.style.transform="translateY(-5px)";
                              e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.4)";
                            }}
                            onMouseLeave={(e)=>{
                              e.currentTarget.style.transform="translateY(0)";
                              e.currentTarget.style.boxShadow="0 4px 10px rgba(0,0,0,0.2)";
                            }}
                          >
                            {t.image && <img src={t.image} style={styles.img}/>}

                            <h3>{t.title}</h3>
                            <p>{t.description}</p>

                            <button onClick={()=>deleteTask(t._id)} style={styles.deleteBtn}>
                              🗑 Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container:{
    minHeight:"100vh",
    backgroundImage:"url('https://images.unsplash.com/photo-1537432376769-00a3f84a3d7c')",
    backgroundSize:"cover",
    backgroundPosition:"center",
    position:"relative",
  },

  overlay:{
    position:"absolute",
    width:"100%",
    height:"100%",
    background:"rgba(0,0,0,0.6)",
    top:0,
    left:0,
  },

  content:{
    position:"relative",
    zIndex:1,
    padding:"20px",
    color:"white",
  },

  header:{
    position:"relative",
    display:"flex",
    justifyContent:"center",
  },

  title:{
    fontSize:"45px",
    background:"linear-gradient(90deg,#ff00cc,#3333ff)",
    WebkitBackgroundClip:"text",
    WebkitTextFillColor:"transparent",
  },

  welcome:{textAlign:"center",color:"#ffcc00"},

  profile:{position:"absolute",right:"20px"},

  avatar:{
    width:"40px",
    height:"40px",
    background:"#114976",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    cursor:"pointer",
  },

  dropdown:{
    position:"absolute",
    top:"50px",
    right:0,
    background:"white",
    color:"black",
    padding:"10px",
    borderRadius:"8px",
  },

  logoutBtn:{background:"red",color:"white",border:"none"},

  form:{textAlign:"center",margin:"20px 0"},

  input:{padding:"10px",margin:"5px",borderRadius:"6px",border:"none"},

  addBtn:{padding:"10px",background:"#ffcc00",border:"none"},

  error:{color:"red"},

  board:{display:"flex",gap:"20px",justifyContent:"center"},

  column:{width:"260px",padding:"10px",borderRadius:"10px"},

  card:{
    background:"white",
    color:"black",
    padding:"10px",
    margin:"10px 0",
    borderRadius:"10px",
    boxShadow:"0 4px 10px rgba(0,0,0,0.2)",
  },

  img:{width:"100%",borderRadius:"8px"},

  deleteBtn:{background:"red",color:"white",border:"none",padding:"5px"},
};

const btn={margin:"5px",padding:"10px",background:"#2196f3",color:"white",border:"none"};

export default App;