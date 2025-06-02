type Quality = {
    id: string;
    produto: string;
    lote: string;
    responsavel: string;
    status: 'Aprovado' | 'Reprovado' | 'Pendente';
}