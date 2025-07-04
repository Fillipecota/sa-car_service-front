'use client'
import MontadorasBarras from "@/components/graficos/index.02";
import styles from './styles.module.css'
import { FcSupport, FcAutomotive, FcDataConfiguration, FcSurvey } from "react-icons/fc";
import MontadorasPizza from "@/components/graficos/index01";
import QualidadeRadar from "@/components/graficos/index.03"
import EstoqueBarras02 from "@/components/graficos/index.04"

export default function Dashboard() {

    return (
        <div className={styles.menuContainerDashboard}>
            <h1>Auto care</h1>
            <h2>dashboard</h2>
            <div className={styles.menuDashboard}>
                <div className={styles.menuItemDashboard}>
                    <FcSupport />
                    <h2>Manutenção</h2>
                </div>
                <div className={styles.menuItemDashboard}>
                    <FcAutomotive />
                    <h2>Produção</h2>
                </div>
                <div className={styles.menuItemDashboard}>
                    <FcDataConfiguration />
                    <h2>Estoque</h2>
                </div>
                <div className={styles.menuItemDashboard}>
                    <FcSurvey />
                    <h2>Qualidade</h2>
                </div>
            </div>
            <div className={styles.menuGraficos}>

                <div style={{ maxWidth: '500px', margin: '50px auto', marginTop: '32px' }}>
                    <h1>Gráfico de produção de Carros</h1>
                    <MontadorasBarras />
                </div>
                <div style={{ maxWidth: '400px', margin: '50px auto', marginTop: '32px' }}>
                    <h1>Gráfico de Manutenção de Carros</h1>
                    <MontadorasPizza />
                </div>
            </div>
            <div className={styles.menuGraficos}>

                <div style={{ maxWidth: '500px', margin: '50px auto', marginTop: '32px' }}>
                    <h1>Gráfico de Qualidade de Carros</h1>
                    <QualidadeRadar />
                </div>
                <div style={{ maxWidth: '400px', margin: '50px auto', marginTop: '32px' }}>
                    <h1>Gráfico de estoque de Carros</h1>
                    <EstoqueBarras02 />
                </div>
            </div>

        </div>

    )
}