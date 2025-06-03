type Product = {
    id: string;
    categoria: string;
    modelo: string;
    cor: string;
    motor: number;
    pneu: string;
    ano: number;
    status: string;
    responsavel: string;
    createdAt: string;
}
type CreateProductRequest = {
    categoria: string;
    modelo: string;
    cor: string;
    motor: number;
    pneu: string;
    quantidade: number;
    responsavel: string;
}

type Quality = {
    id: string;
    produto: string;
    lote: string;
    responsavel: string;
    status: string;
};

type UpdateQualityRequest = {
    id: string;
    status: string;
};