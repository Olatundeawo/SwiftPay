import { useState } from "react";
import Routing from "./component/routing";
import Register from "./component/user";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routing />
      {/* <Register /> */}
    </>
  );
}

export default App;
