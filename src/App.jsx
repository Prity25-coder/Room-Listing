import { useEffect, useState } from "react";
import "./App.css";
import db from "../sampleData.json";
import RoomList from "./components/RoomList";

function App() {
  const [list, setList] = useState();

  // useEffect(() => {
  //   async function fetchRoomList() {
  //     try {
  //       const response = await fetch(
  //         `https://drive.google.com/file/d/1NfEC7dWk74Ui7UNW578PlJDebW93MzT9/view`
  //       );
  //       const data = await response.json();
  //       setList(data.list);
  //       // console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchRoomList();
  // }, []);

  useEffect(() => {
    const fetchData = () => {
      console.log(setList(db));
    };

    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {list.map((item, i) => (
        <li key={i}>{item.rooms.name}</li>
      ))}
      <RoomList/>
    </>
  );
}

export default App;
