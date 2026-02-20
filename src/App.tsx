import axios from "axios";
import { useState } from "react";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8080";

type Pessoa = {
  nome: string;
  idade: number;
  altura: number;
  doc: number;
};

type Carro = {
  id?: number;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
};

const emptyPessoa: Pessoa = {
  nome: "",
  idade: 0,
  altura: 0,
  doc: 0,
};

const emptyCarro: Carro = {
  marca: "",
  modelo: "",
  ano: 0,
  cor: "",
};



function AppPessoas () {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [form, setForm] = useState<Pessoa>(emptyPessoa);
  const [isUpdate, setIsUpdate] = useState(false);

  const salvar = async () => {
    try {
      await axios.post("/pessoas", form);
      setForm(emptyPessoa);
      await buscarTodos();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pessoa");
    }
  };

  const buscarTodos = async () => {
    try {
      const { data } = await axios.get("/pessoas");
      setPessoas(data);
    } catch {
      alert("Erro ao buscar pessoas");
    }
  };

  const deletaPessoa = async (doc: number) => {
    await axios.delete("/pessoas/" + doc);
    await buscarTodos();
  };

  const updatePessoa = async () => {
    await axios.put("/pessoas/" + form.doc, form);
    await buscarTodos();
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  return (
    <>
      <h1>Dados do Usuario</h1>

      <div className="card">
        <label>Nome</label>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={updateForm} />
        <label>Idade</label>
        <input name="idade" type="number" placeholder="Idade" value={form.idade} onChange={updateForm} />
        <label>Altura</label>
        <input name="altura" type="number" step="0.01" placeholder="Altura" value={form.altura} onChange={updateForm} />
        <label>Doc</label>
        <input name="doc" type="number" placeholder="Doc" value={form.doc} onChange={updateForm} />
      </div>

      <div className="main-actions">
        {isUpdate ? (
          <button onClick={() => { updatePessoa(); setIsUpdate(false); }}>
            Atualizar
          </button>
        ) : (
          <button onClick={salvar}>Cadastrar</button>
        )}

        <button onClick={buscarTodos}>Buscar</button>
      </div>

      {pessoas.map((p) => (
        <div key={p.doc} className="card-pessoa">
          <p>Nome: {p.nome}</p>
          <p>Idade: {p.idade}</p>
          <p>Altura: {p.altura} m</p>
          <p>Doc: {p.doc}</p>

          <button onClick={() => deletaPessoa(p.doc)}>Apagar</button>
          <button onClick={() => { setIsUpdate(true); setForm(p); }}>Editar</button>
        </div>
      ))}
    </>
  );
}



function AppCarros () {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [form, setForm] = useState<Carro>(emptyCarro);
  const [isUpdate, setIsUpdate] = useState(false);

  const salvar = async () => {
    await axios.post("/carros", form);
    setForm(emptyCarro);
    await buscarTodos();
  };

  const buscarTodos = async () => {
    const { data } = await axios.get("/carros");
    setCarros(data);
  };

  const deletaCarro = async (id?: number) => {
    if (!id) return;
    await axios.delete("/carros/" + id);
    await buscarTodos();
  };

  const updateCarro = async () => {
    if (!form.id) return;
    await axios.put("/carros/" + form.id, form);
    await buscarTodos();
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  return (
    <>
      <h1>Dados do Veiculo</h1>

      <div className="form-group">
        <label>Marca</label>
        <input name="marca" value={form.marca} onChange={updateForm} />
      </div>

      <div className="form-group">
        <label>Modelo</label>
        <input name="modelo" value={form.modelo} onChange={updateForm} />
      </div>

      <div className="form-group">
        <label>Ano</label>
        <input name="ano" value={form.ano} onChange={updateForm} />
      </div>

      <div className="form-group">
        <label>Cor</label>
        <input name="cor" value={form.cor} onChange={updateForm} />
      </div>


      <div className="main-actions">
        {isUpdate ? (
          <button onClick={() => { updateCarro(); setIsUpdate(false); }}>
            Atualizar
          </button>
        ) : (
          <button onClick={salvar}>Cadastrar</button>
        )}

        <button onClick={buscarTodos}>Buscar</button>
      </div>

      {carros.map((c) => (
        <div key={c.id} className="card-pessoa">

          <p>Marca: {c.marca}</p>
          <p>Modelo: {c.modelo}</p>
          <p>Ano: {c.ano}</p>
          <p>Cor: {c.cor}</p>

          <button onClick={() => deletaCarro(c.id)}>Apagar</button>
          <button onClick={() => { setIsUpdate(true); setForm(c); }}>Editar</button>
        </div>
      ))}
    </>
  );
}



function MainApp () {
  const [page, setPage] = useState<"pessoas" | "carros">("pessoas");

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setPage("pessoas")}>Pessoas</button>
        <button onClick={() => setPage("carros")}>Carros</button>
      </div>

      {page === "pessoas" ? <AppPessoas /> : <AppCarros />}
    </>
  );
}

export default MainApp;
