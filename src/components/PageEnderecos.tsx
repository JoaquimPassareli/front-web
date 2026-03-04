
import axios from "axios";
import { useState } from "react";
import type { Endereco } from "../types/TypeEnderecos";
import { emptyEndereco } from "../types/TypeEnderecos";
import Button from "./Button/Index";
import "./Input/Index";
import Input from "./Input/Index";

function AppEnderecos () {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [buscar, setBuscar] = useState(false);
  const [form, setForm] = useState<Endereco>(emptyEndereco);
  const [isUpdate, setIsUpdate] = useState(false);

  const salvar = async () => {
    if (!form.rua || !form.cep || !form.bairro || form.numero <= 0 || !form.cidade || !form.estado || form.pessoaDoc <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    try {
      await axios.post("/enderecos", form);
      setForm(emptyEndereco);
      await buscarTodos();
    } catch (error) {
      console.log("ERRO COMPLETO:", error);
      console.error(error);
      alert("Erro ao cadastrar endereço");
    }
  };


  const buscarTodos = async () => {
    const { data } = await axios.get("/enderecos");
    console.log("DADOS DO BACKEND:", data);
    setEnderecos(data);
    console.log("PRIMEIRO:", JSON.stringify(data[0]));
  };

  const deletaEndereco = async (id?: number) => {
    if (!id) return;
    await axios.delete("/enderecos/" + id);
    await buscarTodos();
  };

  const updateEndereco = async () => {
    if (!form.id) return;
    await axios.put("/enderecos/" + form.id, form);
    await buscarTodos();
  };

  return (
    <div>
      <h1>Endereço</h1>
      <Input name="cep" label="CEP" value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} />
      <Input name="estado" label="Estado" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} />
      <Input name="cidade" label="Cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
      <Input name="bairro" label="Bairro" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} />
      <Input name="rua" label="Rua" value={form.rua} onChange={(e) => setForm({ ...form, rua: e.target.value })} />
      <Input name="numero" label="Número" type="number" value={form.numero} onChange={(e) => setForm({ ...form, numero: Number(e.target.value) })} />
      <Input name="pessoaDoc" label="Documento da Pessoa" type="number" value={form.pessoaDoc} onChange={(e) => setForm({ ...form, pessoaDoc: Number(e.target.value) })} />
      <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "10px 0" }}>
        <Button onClick={isUpdate ? updateEndereco : salvar}>{isUpdate ? "Atualizar" : "Salvar"}</Button>
        <Button onClick={async () => { await buscarTodos(); setBuscar(true); }}>Buscar</Button>
      </div>
      {
        buscar && (
          <div>
            {enderecos.map((e, index) => (
              <div key={e.id ?? index} className="card-endereco">

                <p>CEP: {e.cep}</p>
                <p>Estado: {e.estado}</p>
                <p>Cidade: {e.cidade}</p>
                <p>Bairro: {e.bairro}</p>
                <p>Rua: {e.rua}</p>
                <p>Número: {e.numero}</p>
                <p>Documento da Pessoa: {e.pessoaDoc}</p>
                <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                  <Button onClick={() => { setForm(e); setIsUpdate(true); }}>Editar</Button>
                  <Button onClick={() => deletaEndereco(e.id)}>Excluir</Button>
                </div>
              </div>
            ))}
          </div>
        )
      } </div >
  );
}


export { AppEnderecos };

