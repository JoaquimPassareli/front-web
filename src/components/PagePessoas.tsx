export { AppPessoas };

import axios from "axios";
import { useEffect, useState } from "react";
import type { Pessoa } from "../types/TypesPessoas";
import { emptyPessoa } from "../types/TypesPessoas";



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

  useEffect(() => {
    buscarTodos();
  }, []);

  const deletaPessoa = async (id: number) => {
    await axios.delete("/pessoas/" + id);
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

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Altura</th>
            <th>Doc</th>
            <th>Carros</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td>{p.altura} m</td>
              <td>{p.doc}</td>
              <td>
                {p.carros.length > 0 && (
                  <>
                    <p>Carros: </p>
                    {p.carros.map((c) => (
                      <p key={c.id}>{c.marca} - {c.modelo}</p>
                    ))}
                  </>
                )}
              </td>
              <td>
                <div style={{
                  display: "flex",
                  gap: 5,

                }} >

                  <button onClick={() => { setForm(p); setIsUpdate(true); }}>
                    Editar
                  </button>
                  <button onClick={() => deletaPessoa(p.id ?? 0)}>
                    Deletar
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/*       
      {pessoas.map((p) => (
        <div key={p.doc} className="card-pessoa">

          <p>Nome:
            {p.nome}
          </p>
          <p>Idade:
            {p.idade}
          </p>
          <p>Altura:
            {p.altura} m
          </p>
          <p>Doc:
            {p.doc}
          </p>
          {p.carros.length > 0 && (
            <>
              <p>Carros: </p>
              {p.carros.map((c) => (
                <p key={c.id}>{c.marca} - {c.modelo}</p>
              ))}
            </>

          )}

        
            Editar
          </button>
        </div>
      ))} */}
    </>
  );
}