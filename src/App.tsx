import axios from "axios";
import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Index";
import "./components/PageCarros";
import { AppCarros } from "./components/PageCarros";
import "./components/PagePessoas";
import { AppPessoas } from "./components/PagePessoas";

axios.defaults.baseURL = "http://localhost:8080";

function MainApp () {
  const [page, setPage] = useState<"pessoas" | "carros">("pessoas");

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button onClick={() => setPage("pessoas")}>Pessoas</Button>
        <Button onClick={() => setPage("carros")}>Carros</Button>
      </div>

      {page === "pessoas" ? <AppPessoas /> : <AppCarros />}
    </>
  );
}

export default MainApp;
