"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const options: ChartOptions<'polarArea'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Distribuição de Inspeções por Status',
    },
  },
};

const data = {
  labels: ['Aprovado', 'Reprovado', 'Pendente'],
  datasets: [
    {
      label: 'Inspeções',
      data: [15, 5, 8],
      backgroundColor: [
        'rgba(0, 123, 255, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function QualidadePolarArea() {
  return <PolarArea data={data} options={options} />;
}