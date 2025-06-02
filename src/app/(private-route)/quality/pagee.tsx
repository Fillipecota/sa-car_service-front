"use client";

import styles from './styles.module.css';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Chip, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
// import {  Quality } from '@/components/types/quality';
import { qualityService } from '@/components/services/qualityService';

const STATUS_OPTIONS = ["Aprovado", "Reprovado", "Pendente"];

const columns = (onStatusClick: (id: string, currentStatus: string) => void): GridColDef[] => [
    { field: "id", headerName: "ID", width: 70 },
    { field: "produto", headerName: "Produto", width: 130 },
    { field: "lote", headerName: "Lote", width: 100 },
    { field: "responsavel", headerName: "Responsável", width: 150 },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params: GridRenderCellParams) => {
            const value = params.value as string;
            let color: "default" | "success" | "error" | "warning" = "default";
            if (value === "Aprovado") color = "success";
            else if (value === "Reprovado") color = "error";
            else if (value === "Pendente") color = "warning";

            return (
                <Chip
                    label={value}
                    color={color}
                    variant="outlined"
                    onClick={() => onStatusClick(params.row.id, value)}
                    style={{ cursor: "pointer" }}
                />
            );
        }
    },
];

export default function Quality() {
    const [produto, setProduto] = useState("");
    const [status, setStatus] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [pendentes, setPendentes] = useState(false);
    const [rows, setRows] = useState<Quality[]>([]);

    const [editingStatus, setEditingStatus] = useState<{ id: string; current: string } | null>(null);

    const filteredRows = rows.filter(row => {
        if (produto && !row.produto.toLowerCase().includes(produto.toLowerCase())) return false;
        if (responsavel && !row.responsavel.toLowerCase().includes(responsavel.toLowerCase())) return false;
        if (pendentes && row.status !== "Pendente") return false;
        if (status && row.status !== status) return false;
        return true;
    });

    function handleStatusClick(id: string, currentStatus: string) {
        setEditingStatus({ id, current: currentStatus });
    }

    async function saveStatus(newStatus: string) {
        if (!editingStatus) return;
        try {
            await qualityService.updateStatus(editingStatus.id, newStatus as any);
            setRows(prev => prev.map(row => row.id === editingStatus.id ? { ...row, status: newStatus as any } : row));
            setEditingStatus(null);
        } catch (error) {
            console.error('Erro ao atualizar status', error);
            alert('Erro ao atualizar status');
        }
    }

    function cancelEdit() {
        setEditingStatus(null);
    }

    useEffect(() => {
        qualityService.list().then(setRows);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Qualidade</h1>
            <div className={styles.filters}>
                {/* Filtros */}
                <TextField label="Produto" size="small" value={produto} onChange={(e) => setProduto(e.target.value)} />
                <FormControlLabel
                    control={<Checkbox checked={pendentes} onChange={(e) => setPendentes(e.target.checked)} />}
                    label="Somente Pendentes"
                />
                <FormControl size="small" style={{ minWidth: 160 }}>
                    <InputLabel>Status da inspeção</InputLabel>
                    <Select value={status} label="Status da inspeção" onChange={(e) => setStatus(e.target.value)}>
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        {STATUS_OPTIONS.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Responsável" size="small" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
            </div>

            {editingStatus && (
                <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 1, display: "inline-flex", alignItems: "center", gap: "1rem" }}>
                    <span>Alterar status {editingStatus.id}:</span>
                    <FormControl size="small" style={{ minWidth: 160 }}>
                        <Select
                            value={editingStatus.current}
                            onChange={(e) => setEditingStatus(s => s ? { ...s, current: e.target.value } : null)}
                        >
                            {STATUS_OPTIONS.map((opt) => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={() => saveStatus(editingStatus.current)}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={cancelEdit}>
                        Cancelar
                    </Button>
                </Box>
            )}

            <div style={{ height: 400, width: "100%", marginTop: 16 }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns(handleStatusClick)}
                />
            </div>
        </div>
    );
}