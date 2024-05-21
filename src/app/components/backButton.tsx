import Link from 'next/link';
import styles from './BackButton.module.css';

const BackButton = () => {
  return (
    <div>
      <Link href="/admin" passHref>
        <button className={styles.backButton}>ADMIN HOME</button>
      </Link>
    </div>
  );
};

export default BackButton;