import {useState,useEffect} from "react";
import Messages from './Components/Messages';
import Input from "./Components/Input";
import Login from "./Components/Login";

function App(){
  
  const [user, setUser] = useState("");
  const [drone, setDrone] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState("");
  const [messageArray, setMessageArray] = useState([]);



    function onUserLogin(username) {
        if (username) {
          const drone = new window.Scaledrone("83Xa2g8ydRxqVwNn", {
            data: { username},
          });
          drone.on("open", () => {
            setDrone(drone);
            setUser({ id: drone.clientId, username });
          });
        }
    }

    const onChangeUser = event => {
        const vrijednost = event.target.value;
        setUsername(vrijednost);
    }
    const onByChangeUser = event => {
        event.preventDefault();
        
        if (!username || !username.replace(/\s/g, "").length) {
          setUsername(null);
          alert("Za Upis korisnika morate ispravno popuniti podatke");
        } else {
          setError(null);
          onUserLogin(username);
        }
        
    }
    const onSendData = async (message) => {
      if (message.length > 0) {
        try {
          await drone.publish({
            room: "observable-room",
            message
          });
        } catch (error) {
          console.error("Error occurred while publishing:", error);
        }
      }
    };
    
    
    useEffect(() => {
      if (user) {
        setupRoom(drone);
      }
    }, [user, drone]);

    function setupRoom(scaledrone) {
      scaledrone.on("error", (error) => console.error(error));
      const room = scaledrone.subscribe("observable-room");
      room.on("error", (error) => console.error(error));
      room.on("message", (message) => {
      setMessageArray((current) => {
        return [
            ...current,
            {
              message: message.data,
              user: {
                id: message.member.id,
                username: message.member.clientData.username
              },
            },
          ];
        });
      });

    
    }
    const forma = user.length < 1 ? <Login onByChangeUser={onByChangeUser} onChangeUser=   {onChangeUser} /> : <Input onSendMessage =  {onSendData} />;
    const prikazporuka  = messageArray.length < 1  ? "" :   <Messages messages={messageArray} memberMe={username} />
      
    return (
          <div className="App" >
              <div className="App-header" >
                <h1>Chat App ZB</h1>
              </div>
              {prikazporuka}
              {forma}
          </div>
    ); 

  }
export default App;