import React from "react";
import ReactDOM from "react-dom/client";
import App from "./board/App";
import "./index.css";
import RoomCreation from "./room-creation";
import Toast from "./shared/toast/toast";
import SocketContextProvider, {
  SocketContext,
} from "./socket-context/socket.context";
import { SocketContext as ISocketContext } from "./types";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SocketContextProvider>
      <Initializer />
    </SocketContextProvider>
    <Toast />
  </React.StrictMode>
);

function Initializer() {
  const socketContext: ISocketContext = React.useContext(SocketContext);
  return (socketContext.room === null && <RoomCreation />) || <App />;
}
