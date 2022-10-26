import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import AppRouter from "./router/AppRouter";
import { io } from "socket.io-client";
import { URL } from "./Api/constant";

function App() {
  const socket = io(URL);
  socket.emit("notification", {
    id: localStorage.getItem("_userId"),
  });
  return <AppRouter />;
}

export default App;
