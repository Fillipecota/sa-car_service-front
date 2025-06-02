"use client";

import React, { useState, useMemo } from "react";
import styles from "./styles.module.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ButtonGlobal } from "@/components/Button";

/* -------------------------------------------------
   Tipos e helpers
-------------------------------------------------- */
type Tipo = "Preventiva" | "Corretiva";
type Status = "Pendente" | "Concluída";

interface Manutencao {
  id: number;
  descricao: string;
  equipamento: string;
  responsavel: string;
  tipo: Tipo;
  status: Status;
  agendado: string;          // dd/mm/yyyy
}

const formatDateBr = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

/* -------------------------------------------------
   Dados iniciais
-------------------------------------------------- */
const initialRows: Manutencao[] = [
  { id: 1, descricao: "Troca de filtro", equipamento: "Compressor", responsavel: "João", tipo: "Preventiva", status: "Concluída", agendado: "15/04/2024" },
  { id: 2, descricao: "Reparo de bomba", equipamento: "Bomba", responsavel: "Maria", tipo: "Corretiva", status: "Pendente", agendado: "12/04/2024" },
  { id: 3, descricao: "Inspeção elétrica", equipamento: "Painel Elétrico", responsavel: "Carlos", tipo: "Preventiva", status: "Concluída", agendado: "10/04/2024" },
  { id: 4, descricao: "Lubrificação", equipamento: "Aont", responsavel: "Anna", tipo: "Corretiva", status: "Pendente", agendado: "05/04/2024" }
];

/* -------------------------------------------------
   Componente
-------------------------------------------------- */
export default function Maintenance() {
  /* ---------- state principal ---------- */
  const [rows, setRows] = useState<Manutencao[]>(initialRows);

  /* ---------- filtros ---------- */
  const [tipoFilter, setTipoFilter] = useState("");
  const [equipamentoFilter, setEquipamentoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* ---------- dialog de agendamento ---------- */
  const [open, setOpen] = useState(false);
  const [novo, setNovo] = useState<Omit<Manutencao, "id" | "status">>({
    descricao: "",
    equipamento: "",
    responsavel: "",
    tipo: "Preventiva",
    agendado: ""
  });

  /* ---------- helpers ---------- */
  const nextId = () => (rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1);

  const toggleStatus = (id: number) => {
    setRows(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: r.status === "Pendente" ? "Concluída" : "Pendente" }
          : r
      )
    );
  };

  const deleteRow = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta manutenção?")) {
      setRows(prev => prev.filter(r => r.id !== id));
    }
  };

  const salvarNova = () => {
    const { descricao, equipamento, responsavel, agendado, tipo } = novo;
    if (!descricao || !equipamento || !responsavel || !agendado) {
      alert("Preencha todos os campos");
      return;
    }

    setRows(prev => [
      ...prev,
      {
        id: nextId(),
        descricao,
        equipamento,
        responsavel,
        tipo,
        status: "Pendente",
        agendado: formatDateBr(agendado)
      }
    ]);

    setOpen(false);
    setNovo({
      descricao: "",
      equipamento: "",
      responsavel: "",
      tipo: "Preventiva",
      agendado: ""
    });
  };

  /* ---------- filtragem memoizada ---------- */
  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      const byTipo = tipoFilter ? r.tipo === tipoFilter : true;
      const byEquip = equipamentoFilter ? r.equipamento === equipamentoFilter : true;
      const byStatus = statusFilter ? r.status === statusFilter : true;
      return byTipo && byEquip && byStatus;
    });
  }, [rows, tipoFilter, equipamentoFilter, statusFilter]);

  /* ---------- colunas ---------- */
  const columns: GridColDef<Manutencao>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "descricao", headerName: "Descrição", width: 160 },
    { field: "equipamento", headerName: "Equipamento", width: 130 },
    { field: "responsavel", headerName: "Responsável", width: 130 },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 115,
      renderCell: params => <Chip label={params.value} variant="outlined" size="small" />
    },
    {
      field: "status",
      headerName: "Status",
      width: 115,
      renderCell: params => (
        <Chip
          label={params.value}
          color={(params.value === "Concluída" ? "success" : "warning") as any}
          variant="outlined"
          size="small"
        />
      )
    },
    { field: "agendado", headerName: "Agendado para", width: 120 },
    {
      field: "acao",
      headerName: "Ação",
      width: 170,
      sortable: false,
      renderCell: params => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => toggleStatus(params.row.id)}
          >
            {params.row.status === "Pendente" ? "Concluir" : "Reabrir"}
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => deleteRow(params.row.id)}
          >
            Excluir
          </Button>
        </div>
      )
    }
  ];

  /* ---------- render ---------- */
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manutenção</h1>

      {/* filtros */}
      <div className={styles.filters}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Tipo de manutenção</InputLabel>
          <Select value={tipoFilter} label="Tipo de manutenção" onChange={e => setTipoFilter(e.target.value)}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="Preventiva">Preventiva</MenuItem>
            <MenuItem value="Corretiva">Corretiva</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Equipamento</InputLabel>
          <Select value={equipamentoFilter} label="Equipamento" onChange={e => setEquipamentoFilter(e.target.value)}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="Compressor">Compressor</MenuItem>
            <MenuItem value="Bomba">Bomba</MenuItem>
            <MenuItem value="Painel Elétrico">Painel Elétrico</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)}>
            <MenuItem value=""><em>Todos</em></MenuItem>
            <MenuItem value="Concluída">Concluída</MenuItem>
            <MenuItem value="Pendente">Pendente</MenuItem>
          </Select>
        </FormControl>

        <ButtonGlobal text="Agendar Manutenção" handle={() => setOpen(true)} />
      </div>

      {/* tabela */}
      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } }
          }}
        />
      </div>

      {/* dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Agendar manutenção</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Descrição"
            value={novo.descricao}
            onChange={e => setNovo(n => ({ ...n, descricao: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Equipamento"
            value={novo.equipamento}
            onChange={e => setNovo(n => ({ ...n, equipamento: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Responsável"
            value={novo.responsavel}
            onChange={e => setNovo(n => ({ ...n, responsavel: e.target.value }))}
            fullWidth
          />

          <FormControl size="small">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={novo.tipo}
              label="Tipo"
              onChange={e => setNovo(n => ({ ...n, tipo: e.target.value as Tipo }))}
            >
              <MenuItem value="Preventiva">Preventiva</MenuItem>
              <MenuItem value="Corretiva">Corretiva</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Agendado para"
            InputLabelProps={{ shrink: true }}
            value={novo.agendado}
            onChange={e => setNovo(n => ({ ...n, agendado: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={salvarNova}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}