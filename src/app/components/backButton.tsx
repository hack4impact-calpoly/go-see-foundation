import Link from 'next/link';
import styles from './BackButton.module.css';

export default function BackButton() {
  return (
    <div>
      <Link href="/admin" >
        <button className={styles.backButton}>ADMIN HOME</button>
      </Link>
    </div>
  );
};
