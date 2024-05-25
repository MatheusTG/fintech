import React from "react";
import "./Style.css";
import Resumo from "./Pages/Resumo";
import Sidenav from "./Components/Sidenav";
import Header from "./Components/Header";

const App = () => {
  return (
    <div>
      <Sidenav />
      <main>
        <Header />
        <Resumo />
      </main>
    </div>
  );
};

export default App;
