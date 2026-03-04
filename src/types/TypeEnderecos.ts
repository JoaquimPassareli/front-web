export type Endereco = {
	id?: number;
	rua: string;
	cep: string;
	bairro: string;
	numero: number;
	cidade: string;
	estado: string;
	pessoaDoc: number;
	pessoaId: number;
};

export const emptyEndereco: Endereco = {
	id: 0,
	rua: "",
	cep: "",
	bairro: "",
	numero: 0,
	cidade: "",
	estado: "",
	pessoaDoc: 0,
	pessoaId: 0,
};
