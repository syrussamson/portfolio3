import React, { useState } from "react";
import Taskbar from "./Taskbar";
import Desktop from "./Desktop";
import { Resizable } from "react-resizable";
import Login from "./Login";

function App() {
  const [loginScreen, setLoginScreen] = useState(false);

  return (
    <>
      {loginScreen && <Login />}
      {!loginScreen && (
        <div className="gui-root">
          <Desktop />
          <Taskbar />
        </div>
      )}
    </>
  );
}

export default App;
