import { IEvent } from "@database/eventSchema";
import styles from "./pastEventCard.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PastEventCard({ event }: { event: IEvent }) {
  const { picture, alt, description, date, name } = event;
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
        width="500"
        height="500"
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
