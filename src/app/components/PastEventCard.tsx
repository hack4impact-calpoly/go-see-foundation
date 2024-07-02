import { IBlog } from "@database/blogSchema";
import styles from "./pastEventCard.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PastEventCard({ blog }: { blog: IBlog }) {
  const { picture, alt, description, date, name, blogID, author } = blog;
  const { push } = useRouter();

  const handleLearnMore = () => {
    push("/blog");
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.picture}
        src={picture}
        alt={alt}
        width="400"
        height="290"
      />
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <button className={styles.learnMore} onClick={handleLearnMore}>
          Learn More
        </button>
      </div>
    </div>
  );
}
