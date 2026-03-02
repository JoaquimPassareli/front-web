export type Carro = {
	id?: number;
	marca: string;
	modelo: string;
	ano: number;
	cor: string;
	pessoaDoc: number;
	pessoaId: number;
};

export const emptyCarro: Carro = {
	id: 0,
	marca: "",
	modelo: "",
	ano: 0,
	cor: "",
	pessoaDoc: 0,
	pessoaId: 0,
};
