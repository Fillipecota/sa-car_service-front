"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Estoque de Itens por Tipo',
    },
  },
};

const data = {
  labels: ['Motor', 'Pneu', 'Carcaça', 'Chassi'],
  datasets: [
    {
      label: 'Quantidade',
      data: [50, 75, 40, 30], // Coloque seus dados reais aqui ou via props
      backgroundColor: 'rgba(0, 123, 255, 0.6)',
    },
  ],
};

export default function EstoqueBarras02() {
  return <Bar options={options} data={data} />;
}