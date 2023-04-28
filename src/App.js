import React, { useState, useEffect } from "react";
import "./App.css";
import FirstPage from "./components/FirstPage";

function App() {

  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newSocket = new WebSocket("wss://wssx.gntapi.com:443");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened");
        socket.send("prices");
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const newData = Object.entries(message.prices).map(
          ([currency, { bid, ask }]) => ({
            currency,
            bid,
            ask,
          })
        );
        setData([newData]);
        //console.log("WebSocket message received:", data);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }
  }, [socket, data]);

  return (
    <div>
      <h1 className="title">My Data</h1>
      <FirstPage data={data.flatMap(innerArray => innerArray.map(item => item))}  />
    </div>
  );
}

export default App;
