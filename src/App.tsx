import axios from "axios";
import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Index.tsx";
import "./components/PageCarros";
import { AppCarros } from "./components/PageCarros";
import "./components/PageEnderecos.tsx";
import { AppEnderecos } from "./components/PageEnderecos.tsx";
import "./components/PagePessoas";
import { AppPessoas } from "./components/PagePessoas";

axios.defaults.baseURL = "http://localhost:8080";

function MainApp () {
  const [page, setPage] = useState<"pessoas" | "carros" | "enderecos">("pessoas");

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button onClick={() => setPage("pessoas")}>Pessoas</Button>
        <Button onClick={() => setPage("carros")}>Carros</Button>
        <Button onClick={() => setPage("enderecos")}>Endereços</Button>
      </div>

      {page === "pessoas" ? <AppPessoas /> : page === "carros" ? <AppCarros /> : <AppEnderecos />}
    </>
  );
}

export default MainApp;
