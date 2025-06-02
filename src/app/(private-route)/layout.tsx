import styles from './styles.module.css'
import MainMenu from "@/components/mainMenu";

export default function PrivateLayout({ children }: { children: React.ReactNode}){
    return (
        <div className={styles.layout}>
        <MainMenu/>
        <main className={styles.main}>
            {children}
        </main>
    </div>
    )
}''