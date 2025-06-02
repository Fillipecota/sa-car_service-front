import styles from './styles.module.css'

type ButtonProps = {
    text: string;
    handle: () => void;
    disabled?: boolean;
}

export function ButtonGlobal({ text, handle, disabled = false }: ButtonProps) {
    return (
        <button
            onClick={handle}
            disabled={disabled}
            className={styles.button}
        >
            {text}
        </button>
    )
}