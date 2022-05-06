import React from "react";

import MoveableComponent from "./components/MoveableComponent";
import MoveableFuncComponent from "./components/MoveableFuncComponent";

function App() {
  // const [boxes, setBoxes] = useState([
  //   {
  //     _id: "5F123",
  //     name: "Box 1",
  //     target: null,
  //     width: 200,
  //     height: 80,
  //     top: 110,
  //     left: 0,
  //     rotate: 0,
  //   },
  //   {
  //     _id: "5F456",
  //     name: "Box 2",
  //     target: null,
  //     width: 200,
  //     height: 80,
  //     top: 360,
  //     left: 100,
  //     rotate: 0,
  //   },
  //   {
  //     _id: "5F789",
  //     name: "Box 3",
  //     target: null,
  //     width: 200,
  //     height: 80,
  //     top: 300,
  //     left: 75,
  //     rotate: 0,
  //   },
  // ]);

  // const addNewItem = (item) => {
  //   setBoxes([...boxes, item])
  // }

  return (
    <>
      <MoveableComponent />
      {/* <MoveableFuncComponent /> */}
    </>
  );
}

export default App;
