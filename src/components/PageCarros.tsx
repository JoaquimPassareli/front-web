export { AppCarros };

import axios from "axios";
import { useState } from "react";
import type { Carro } from "../types/TypesCarros";
import { emptyCarro } from "../types/TypesCarros";


function AppCarros () {
  const [c, setCarros] = useState<Carro[]>([]);
  const [form, setForm] = useState<Carro>(emptyCarro);
  const [isUpdate, setIsUpdate] = useState(false);

  const salvar = async () => {
    if (!form.marca || !form.modelo || !form.cor || form.ano <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await axios.post("/carros", form);
      setForm(emptyCarro);
      await buscarTodos();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar veiculo");
    }
  };



  const buscarTodos = async () => {
    const { data } = await axios.get("/carros");
    console.log("DADOS DO BACKEND:", data);
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

      <div className="form-group">
        {isUpdate && (
          <>
            <label>Pessoa Doc:</label>
            <input name="pessoaDoc" type="number" value={form.pessoaDoc ?? ""} onChange={updateForm} />
          </>
        )}
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

      {c.map((c) => (
        <div key={c.id} className="card-pessoa">

          <p>Marca: {c.marca}</p>
          <p>Modelo: {c.modelo}</p>
          <p>Ano: {c.ano}</p>
          <p>Cor: {c.cor}</p>

          <button onClick={() => deletaCarro(c.id)}>Apagar</button>
          <button onClick={() => { setIsUpdate(true); setForm(c); }}
          >
            Editar

          </button>


        </div>
      ))}
    </>
  );
}
