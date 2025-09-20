import { useState } from "react";
import Routing from "./component/routing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Routing />
        {/* <Register /> */}
      </div>
    </>
  );
}

export default App;
