/* eslint-disable no-unused-vars */

import { Toaster } from "react-hot-toast";
import Routes from "./router/Routers";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes />
      <Toaster />
    </div>
  );
};

export default App;
