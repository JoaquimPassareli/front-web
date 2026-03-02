import type { Carro } from "../types/TypesCarros";

export type Pessoa = {
	id?: number;
	nome: string;
	idade: number;
	altura: number;
	doc: number;
	carros: Carro[];
};

export const emptyPessoa: Pessoa = {
	id: 0,
	nome: "",
	idade: 0,
	altura: 0,
	doc: 0,
	carros: [],
};
