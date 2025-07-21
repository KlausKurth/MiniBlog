import styles from './Footer.module.css'

const Footer = () => {
  return (
    //Instânciar a classe CSS modular
    <footer className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Mini Blog &copy; 2025</p>
    </footer>
  )
}

export default Footer