"use client";

import { ButtonGlobal } from "@/components/Button";
import styles from './styles.module.css'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "CategoriaDocarro", headerName: "Categoria", width: 120 },
    { field: "modelo", headerName: "Modelo", width: 150 },
    { field: "ano", headerName: "Ano", width: 90 },
    { field: "color", headerName: "Cor", width: 100 },
    { field: "motor", headerName: "Motor", width: 80 },
    { field: "pneu", headerName: "Pneu", width: 120 },
    { field: "responsavel", headerName: "Responsável", width: 150 },
];

export default function Production() {
    const [categoria, setCategoria] = useState("");
    const [modelo, setModelo] = useState("");
    const [cor, setCor] = useState("");
    const [motor, setMotor] = useState<number | "">("");
    const [pneu, setPneu] = useState("");
    const [quantidade, setQuantidade] = useState<number | "">("");
    const [responsavel, setResponsavel] = useState("");

    // começa vazia
    const [linhasEstoque, setLinhasEstoque] = useState<any[]>([]);

    const limparCampos = () => {
        setCategoria("");
        setModelo("");
        setCor("");
        setMotor("");
        setPneu("");
        setQuantidade("");
        setResponsavel("");
    };

    const proximoId = () => (linhasEstoque[linhasEstoque.length - 1]?.id || 0) + 1;

    const handleSubmit = () => {
        if (!categoria || !modelo || !cor || !motor || !pneu || !quantidade || Number(quantidade) <= 0) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const qtd = Number(quantidade);
        const baseId = proximoId();

        const novasLinhas = Array.from({ length: qtd }, (_, i) => ({
            id: baseId + i,
            CategoriaDocarro: categoria,
            modelo,
            ano: new Date().getFullYear(),
            color: cor,
            motor,
            pneu
        }));

        // Mantém somente os 5 últimos
        setLinhasEstoque(prev => {
            const atualizadas = [...prev, ...novasLinhas];
            return atualizadas.slice(-5);
        });

        limparCampos();
    };

    return (
        <div className={styles.containerProduction}>
            <h1>Produção</h1>

            <div className={styles.contentProduction}>
                <h2>Novo Veículo</h2>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <div className={styles.formSeparetor}>
                        <FormControl sx={{ width: "30%", mb: 2 }}>
                            <InputLabel>Categoria</InputLabel>
                            <Select value={categoria} onChange={(e: SelectChangeEvent) => setCategoria(e.target.value)} label="Categoria">
                                <MenuItem value="Elétrico">Elétrico</MenuItem>
                                <MenuItem value="Mecânico">Mecânico</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "30%", mb: 2 }}>
                            <InputLabel>Modelo</InputLabel>
                            <Select value={modelo} onChange={(e: SelectChangeEvent) => setModelo(e.target.value)} label="Modelo">
                                <MenuItem value="Honda Civic">Honda Civic</MenuItem>
                                <MenuItem value="Toyota Corolla">Toyota Corolla</MenuItem>
                                <MenuItem value="Volkswagen Golf">Volkswagen Golf</MenuItem>
                                <MenuItem value="Chevrolet Onix">Chevrolet Onix</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "30%", mb: 2 }}>
                            <InputLabel>Cor</InputLabel>
                            <Select value={cor} onChange={(e: SelectChangeEvent) => setCor(e.target.value)} label="Cor">
                                <MenuItem value="Preto">Preto</MenuItem>
                                <MenuItem value="Branco">Branco</MenuItem>
                                <MenuItem value="Prata">Prata</MenuItem>
                                <MenuItem value="Grafite">Grafite</MenuItem>
                                <MenuItem value="Vermelho">Vermelho</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "30%", mb: 2 }}>
                            <InputLabel>Motor</InputLabel>
                            <Select value={motor} onChange={(e) => setMotor(Number(e.target.value))} label="Motor"
                            >
                                <MenuItem value={1.0}>1.0</MenuItem>
                                <MenuItem value={1.8}>1.8</MenuItem>
                                <MenuItem value={2.0}>2.0</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "30%", mb: 2 }}>
                            <InputLabel>Pneu</InputLabel>
                            <Select value={pneu} onChange={(e: SelectChangeEvent) => setPneu(e.target.value)} label="Pneu">
                                <MenuItem value="Pirelli">Pirelli</MenuItem>
                                <MenuItem value="Goodyear">Goodyear</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField label="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} sx={{ width: "30%", mb: 2 }} />
                        <TextField label="Responsável" value={responsavel} onChange={e => setResponsavel(e.target.value)} sx={{ width: "30%", mb: 2 }} />
                    </div>
                    <div className={styles.buttonGroup}>
                        <ButtonGlobal text="Enviar para Produção" handle={handleSubmit} />
                    </div>
                </form>
            </div>


            <h1>Últimos 5 produzidos</h1>
            <div className={styles.datagrid}>
                <DataGrid rows={linhasEstoque} columns={columns} autoHeight hideFooter disableRowSelectionOnClick />
            </div>
        </div>
    );
}
