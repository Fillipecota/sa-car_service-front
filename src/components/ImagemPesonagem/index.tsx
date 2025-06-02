import styles from './styles.module.css'

type ImgPesonagem = {
    src: string;
    
}

export default function Personagem({src}:ImgPesonagem){
    return(
        <img src={src} className={styles.Personagem} />
    )
}
