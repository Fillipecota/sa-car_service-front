"use client";

import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import styles from './styles.module.css'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ButtonGlobal } from "@/components/Button";
import React, { useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "CategoriaDocarro", headerName: "Categoria", width: 120 },
  { field: "tipo", headerName: "Tipo", width: 100 },
  { field: "descricao", headerName: "Descrição", width: 150 },
  { field: "quantidade", headerName: "Qtd", width: 90 }
];

interface LinhaEstoque {
  id: number;
  CategoriaDocarro: string;
  tipo: string;
  descricao: string;
  quantidade: number;
}

export default function Stock() {
  const [linhasEstoque, setLinhasEstoque] = useState<LinhaEstoque[]>([]);

  const [categoria, setCategoria] = useState("");
  const [motor, setMotor] = useState("");
  const [motorQtd, setMotorQtd] = useState(0);

  const [pneu, setPneu] = useState("");
  const [pneuQtd, setPneuQtd] = useState(0);

  const [carcaca, setCarcaca] = useState("");
  const [carcacaQtd, setCarcacaQtd] = useState(0);

  const [chassi, setChassi] = useState("");
  const [chassiQtd, setChassiQtd] = useState(0);

  const nextId = () =>
    linhasEstoque.length === 0 ? 1 : Math.max(...linhasEstoque.map(l => l.id)) + 1;

  const resetFields = () => {
    setCategoria("");
    setMotor("");
    setMotorQtd(0);
    setPneu("");
    setPneuQtd(0);
    setCarcaca("");
    setCarcacaQtd(0);
    setChassi("");
    setChassiQtd(0);
  };

  type ItemKind = "motor" | "pneu" | "carcaca" | "chassi";

  const criarOuIncrementarItem = (
    tipo: ItemKind,
    descricao: string,
    quantidade: number,
    categoriaDocarro: string = "-"
  ) => {
    setLinhasEstoque(prev => {
      // Procura um item igual (mesmo tipo, descrição e categoria)
      const indiceExistente = prev.findIndex(
        l => l.tipo === tipo && l.descricao === descricao && l.CategoriaDocarro === categoriaDocarro
      );

      // Se existir, apenas incrementa a quantidade
      if (indiceExistente !== -1) {
        const copia = [...prev];
        copia[indiceExistente] = {
          ...copia[indiceExistente],
          quantidade: copia[indiceExistente].quantidade + quantidade
        };
        return copia;
      }

      // Caso contrário, cria uma nova linha
      return [
        ...prev,
        {
          id: nextId(),
          CategoriaDocarro: categoriaDocarro,
          tipo,
          descricao,
          quantidade
        }
      ];
    });
  };

  const cadastrarItem = (tipo: ItemKind) => {
    if (tipo === "motor") {
      if (!categoria || !motor || motorQtd <= 0) return alert("Preencha categoria, motor e quantidade");
      criarOuIncrementarItem("motor", motor, motorQtd, categoria);
    }
    if (tipo === "pneu") {
      if (!pneu || pneuQtd <= 0) return alert("Preencha pneu e quantidade");
      criarOuIncrementarItem("pneu", pneu, pneuQtd);
    }
    if (tipo === "carcaca") {
      if (!carcaca || carcacaQtd <= 0) return alert("Preencha carcaça e quantidade");
      criarOuIncrementarItem("carcaca", carcaca, carcacaQtd);
    }
    if (tipo === "chassi") {
      if (!chassi || chassiQtd <= 0) return alert("Preencha chassi e quantidade");
      criarOuIncrementarItem("chassi", chassi, chassiQtd);
    }

    resetFields();
  };

  return (
    <div className={styles.headerStock}>
      <h1>Estoque</h1>

      {/* Categoria (apenas para motor) */}
      <div className={styles.mainStock}>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel>Categoria do carro</InputLabel>
          <Select value={categoria} onChange={(e: SelectChangeEvent) => setCategoria(e.target.value)} label="Categoria do carro">
            <MenuItem value="Mecânico">Mecânico</MenuItem>
            <MenuItem value="Elétrico">Elétrico</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Motor */}
      <fieldset className={styles.secao}>
        <legend>Motor</legend>
        <img src="https://cdn.autopapo.com.br/box/uploads/2018/11/22152231/motor-carro-novo-shutterstock-732x488.jpg" alt="motor" className={styles.imageProduct} />
        <FormControl sx={{ width: "120px" }}>
          <InputLabel>Motor</InputLabel>
          <Select value={motor} onChange={(e: SelectChangeEvent) => setMotor(e.target.value)} label="Motor">
            <MenuItem value="1.0">1.0</MenuItem>
            <MenuItem value="1.8">1.8</MenuItem>
            <MenuItem value="2.0">2.0</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Quantidade" type="number" value={motorQtd} onChange={e => setMotorQtd(Number(e.target.value))} sx={{ width: 120, ml: 2 }} />
        <ButtonGlobal text="CADASTRAR" handle={() => cadastrarItem("motor")} />
      </fieldset>

      {/* Pneu */}
      <fieldset className={styles.secao}>
        <legend>Pneu</legend>
        <img src="https://a-static.mlcdn.com.br/800x560/pneu-pirelli-aro-20-pzero-245-45r20-103y-xl-original-chevrolet-camaro/pneustore/10070001/b7dc4aae41f54f7df27a298ab92475ec.jpeg" alt="pneu" className={styles.imageProduct} />
        <FormControl sx={{ width: "120px" }}>
          <InputLabel>Pneu</InputLabel>
          <Select value={pneu} onChange={(e: SelectChangeEvent) => setPneu(e.target.value)} label="Pneu">
            <MenuItem value="Pirelli">Pirelli</MenuItem>
            <MenuItem value="Goodyear">Goodyear</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Quantidade" type="number" value={pneuQtd} onChange={e => setPneuQtd(Number(e.target.value))} sx={{ width: 120, ml: 2 }} />
        <ButtonGlobal text="CADASTRAR" handle={() => cadastrarItem("pneu")} />
      </fieldset>

      {/* Carcaça */}
      <fieldset className={styles.secao}>
        <legend>Carcaça</legend>
        <img src="https://www.karvi.com.br/blog/wp-content/uploads/2021/02/Tipos-de-carrocerias-850x459.jpg" alt="carcaca" className={styles.imageProduct} />
        <FormControl sx={{ width: "120px" }}>
          <InputLabel>Carcaça</InputLabel>
          <Select value={carcaca} onChange={(e: SelectChangeEvent) => setCarcaca(e.target.value)} label="Carcaça">
            <MenuItem value="Honda Civic">Honda Civic</MenuItem>
            <MenuItem value="Toyota Corolla">Toyota Corolla</MenuItem>
            <MenuItem value="Volkswagen Golf">Volkswagen Golf</MenuItem>
            <MenuItem value="Chevrolet Onix">Chevrolet Onix</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Quantidade" type="number" value={carcacaQtd} onChange={e => setCarcacaQtd(Number(e.target.value))} sx={{ width: 120, ml: 2 }} />
        <ButtonGlobal text="CADASTRAR" handle={() => cadastrarItem("carcaca")} />
      </fieldset>

      {/* Chassi */}
      <fieldset className={styles.secao}>
        <legend>Chassi</legend>
        <img src="https://www.consultaauto.com.br/wp-content/uploads/2016/06/chassi-chevy-ssr.jpg" alt="chassi" className={styles.imageProduct} />
        <TextField label="Chassi" value={chassi} onChange={e => setChassi(e.target.value)} sx={{ width: 120 }} />
        <TextField label="Quantidade" type="number" value={chassiQtd} onChange={e => setChassiQtd(Number(e.target.value))} sx={{ width: 120, ml: 2 }} />
        <ButtonGlobal text="CADASTRAR" handle={() => cadastrarItem("chassi")} />
      </fieldset>

      <h1>Lista Estoque</h1>
      {linhasEstoque.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>📭 Nenhum item no estoque.</div>
      ) : (
        <div className="lista-estoque">
          <DataGrid rows={linhasEstoque} columns={columns} autoHeight getRowId={(row) => row.id} />
        </div>
      )}
    </div>
  );
}
