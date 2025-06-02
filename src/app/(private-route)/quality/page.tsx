"use client";

import styles from './styles.module.css';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Chip, Button, Box } from "@mui/material";
import React, { useState } from "react";

const STATUS_OPTIONS = ["Aprovado", "Reprovado", "Pendente"];

const columns = (onStatusClick: (id: number, currentStatus: string) => void): GridColDef[] => [
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

const initialRows = [
  { id: 1, produto: "Product A", lote: "1001", responsavel: "João", status: "Aprovado" },
  { id: 2, produto: "Product A", lote: "1002", responsavel: "Maria", status: "Reprovado" },
  { id: 3, produto: "Product B", lote: "1003", responsavel: "Carlos", status: "Pendente" },
  { id: 4, produto: "Product B", lote: "1004", responsavel: "Anna", status: "Pendente" },
];

export default function Quality() {
  const [produto, setProduto] = useState("");
  const [status, setStatus] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [pendentes, setPendentes] = useState(false);
  const [rows, setRows] = useState(initialRows);

  // Para edição do status ao clicar
  const [editingStatus, setEditingStatus] = useState<{ id: number; current: string } | null>(null);

  // Filtro
  const filteredRows = rows.filter(row => {
    if (produto && !row.produto.toLowerCase().includes(produto.toLowerCase())) return false;
    if (responsavel && !row.responsavel.toLowerCase().includes(responsavel.toLowerCase())) return false;
    if (pendentes && row.status !== "Pendente") return false;
    if (status && row.status !== status) return false;
    return true;
  });

  // Quando clicar no chip de status
  function handleStatusClick(id: number, currentStatus: string) {
    setEditingStatus({ id, current: currentStatus });
  }

  // Salvar alteração de status
  function saveStatus(newStatus: string) {
    if (!editingStatus) return;
    setRows((prev) =>
      prev.map((row) =>
        row.id === editingStatus.id ? { ...row, status: newStatus } : row
      )
    );
    setEditingStatus(null);
  }

  // Cancelar edição
  function cancelEdit() {
    setEditingStatus(null);
  }
// retorno da pagina
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Qualidade</h1>
      <div className={styles.filters} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
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