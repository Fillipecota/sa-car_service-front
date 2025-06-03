'use client';

// Importações de componentes, estilos e bibliotecas
import { ButtonGlobal } from '@/components/Button';
import styles from './styles.module.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from '@/components/services/api';

// Definição das colunas da tabela DataGrid
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'categoria', headerName: 'Categoria', width: 120 },
    { field: 'modelo', headerName: 'Modelo', width: 150 },
    { field: 'ano', headerName: 'Ano', width: 90 },
    { field: 'cor', headerName: 'Cor', width: 100 },
    { field: 'motor', headerName: 'Motor', width: 80 },
    { field: 'pneu', headerName: 'Pneu', width: 120 },
    { field: 'responsavel', headerName: 'Responsável', width: 150 },
];

export default function Production() {
    // Estados para armazenar os dados do formulário
    const [categoria, setCategoria] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [motor, setMotor] = useState<number | ''>('');
    const [pneu, setPneu] = useState('');
    const [quantidade, setQuantidade] = useState<number | ''>('');
    const [responsavel, setResponsavel] = useState('');

    // Estado que armazena os produtos que estão no estoque
    const [linhasEstoque, setLinhasEstoque] = useState<Product[]>([]);

    // Função que limpa todos os campos do formulário
    const limparCampos = () => {
        setCategoria('');
        setModelo('');
        setCor('');
        setMotor('');
        setPneu('');
        setQuantidade('');
        setResponsavel('');
    };

    // Função que busca os produtos da API e atualiza o estado linhasEstoque
    const fetchProdutos = async () => {
        try {
            const { data } = await API.get<Product[]>('/product', {
                headers: {
                    // Token de autenticação
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Atualiza os dados no estado
            setLinhasEstoque(data);
        } catch (error: any) {
            // Erro tratado
            alert(error?.response?.data?.erro || 'Erro ao buscar produtos');
        }
    };

    // Função chamada quando o usuário clica em "Enviar para Produção"
    const handleSubmit = async () => {
        // Verifica se todos os campos foram preenchidos
        if (!categoria || !modelo || !cor || !motor || !pneu || !quantidade || !responsavel) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        // Monta o objeto que será enviado para a API
        const body: CreateProductRequest = {
            categoria,
            modelo,
            cor,
            motor: Number(motor),
            pneu,
            quantidade: Number(quantidade),
            responsavel,
        };

        try {
            await API.post('/product', body, {
                headers: {
                    // Envia o token
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Atualiza a lista após cadastrar
            await fetchProdutos();
            // Limpa os campos do formulário
            limparCampos();
        } catch (error: any) {
            // Tratamento de erro
            alert(error?.response?.data?.erro || 'Erro ao enviar para produção');
        }
    };

    // useEffect executa fetchProdutos() assim que o componente é montado
    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <div className={styles.containerProduction}>
            <h1>Produção</h1>

            {/* Formulário para cadastro de veículos */}
            <div className={styles.contentProduction}>
                <h2>Novo Veículo</h2>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <div className={styles.formSeparetor}>
                        {/* Campo Categoria */}
                        <FormControl sx={{ width: '30%', mb: 2 }}>
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={categoria}
                                onChange={(e: SelectChangeEvent) => setCategoria(e.target.value)}
                                label="Categoria"
                            >
                                <MenuItem value="Elétrico">Elétrico</MenuItem>
                                <MenuItem value="Mecânico">Mecânico</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo Modelo */}
                        <FormControl sx={{ width: '30%', mb: 2 }}>
                            <InputLabel>Modelo</InputLabel>
                            <Select
                                value={modelo}
                                onChange={(e: SelectChangeEvent) => setModelo(e.target.value)}
                                label="Modelo"
                            >
                                <MenuItem value="Honda Civic">Honda Civic</MenuItem>
                                <MenuItem value="Toyota Corolla">Toyota Corolla</MenuItem>
                                <MenuItem value="Volkswagen Golf">Volkswagen Golf</MenuItem>
                                <MenuItem value="Chevrolet Onix">Chevrolet Onix</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo Cor */}
                        <FormControl sx={{ width: '30%', mb: 2 }}>
                            <InputLabel>Cor</InputLabel>
                            <Select
                                value={cor}
                                onChange={(e: SelectChangeEvent) => setCor(e.target.value)}
                                label="Cor"
                            >
                                <MenuItem value="Preto">Preto</MenuItem>
                                <MenuItem value="Branco">Branco</MenuItem>
                                <MenuItem value="Prata">Prata</MenuItem>
                                <MenuItem value="Grafite">Grafite</MenuItem>
                                <MenuItem value="Vermelho">Vermelho</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo Motor */}
                        <FormControl sx={{ width: '30%', mb: 2 }}>
                            <InputLabel>Motor</InputLabel>
                            <Select
                                value={motor}
                                onChange={(e) => setMotor(Number(e.target.value))}
                                label="Motor"
                            >
                                <MenuItem value={1.0}>1.0</MenuItem>
                                <MenuItem value={1.8}>1.8</MenuItem>
                                <MenuItem value={2.0}>2.0</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo Pneu */}
                        <FormControl sx={{ width: '30%', mb: 2 }}>
                            <InputLabel>Pneu</InputLabel>
                            <Select
                                value={pneu}
                                onChange={(e: SelectChangeEvent) => setPneu(e.target.value)}
                                label="Pneu"
                            >
                                <MenuItem value="Pirelli">Pirelli</MenuItem>
                                <MenuItem value="Goodyear">Goodyear</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Campo Quantidade */}
                        <TextField
                            label="Quantidade"
                            type="number"
                            value={quantidade}
                            onChange={e => setQuantidade(Number(e.target.value))}
                            sx={{ width: '30%', mb: 2 }}
                        />

                        {/* Campo Responsável */}
                        <TextField
                            label="Responsável"
                            value={responsavel}
                            onChange={e => setResponsavel(e.target.value)}
                            sx={{ width: '30%', mb: 2 }}
                        />
                    </div>

                    {/* Botão para enviar */}
                    <div className={styles.buttonGroup}>
                        <ButtonGlobal text="Enviar para Produção" handle={handleSubmit} />
                    </div>
                </form>
            </div>

            {/* Seção que exibe os últimos veículos produzidos */}
            <h1>Últimos 5 produzidos</h1>
            <div className={styles.datagrid}>
                <DataGrid
                    // Dados que estão no estoque
                    rows={linhasEstoque}
                    // Definição das colunas
                    columns={columns}
                    // Altura automática
                    autoHeight
                    // Esconde o rodapé da tabela
                    hideFooter
                    // Desabilita seleção de linha
                    disableRowSelectionOnClick
                    // Informa qual campo é o ID
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
}