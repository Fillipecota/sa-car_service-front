import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Toyota', 'Ford', 'Honda', 'Volkswagen', 'Chevrolet', 'Hyundai'],
  datasets: [
    {
      label: 'Vendas (milhares)',
      data: [420, 310, 280, 350, 300, 260],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ],
    },
  ],
};

export default function MontadorasPizza() {
  return <Pie data={data} />;
}