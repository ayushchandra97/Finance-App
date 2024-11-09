import Image from "next/image"
import styles from "@/styles/footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerInfo}>
          <small>&copy; 2024 Finance App.</small>
          <small>All Rights Reserved.</small>
        </div>
        <div className={styles.socials}>
          <a href="https://instagram.com" target="_blank">
            <Image
              src="/insta-icon.svg"
              alt="Instagram"
              width={30}
              height={30}
            />
          </a>

          <a href="https://youtube.com" target="_blank">
            <Image src="/yt-icon.svg" alt="Youtube" width={30} height={30} />
          </a>

          <a href="https://x.com" target="_blank">
            <Image src="/x-icon.svg" alt="X" width={30} height={30} />
          </a>
        </div>
      </div>
    </footer>
  )
}
