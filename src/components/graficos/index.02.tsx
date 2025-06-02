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
        text: 'Vendas por Montadora (2024)',
      },
    },
  };
  
  const data = {
    labels: ['Toyota', 'Ford', 'Honda', 'Volkswagen', 'Chevrolet', 'Hyundai'],
    datasets: [
      {
        label: 'Vendas (milhares)',
        data: [420, 310, 280, 350, 300, 260],
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
      },
    ],
  };
  
  export default function MontadorasBarras() {
    return <Bar options={options} data={data} />;
  }