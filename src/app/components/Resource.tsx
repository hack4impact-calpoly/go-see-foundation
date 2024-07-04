import { IResource } from "@database/resourceSchema";
import styles from "./resource.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Resource({ resource }: { resource: IResource }) {
  const { picture, alt, title, url } = resource;
  console.log("resource created");
  return (
    <div className={styles.container}>
      <Link className={styles.pictureLink} href={url}>
        <Image
          className={styles.picture}
          src={picture}
          alt={alt}
          width="1000"
          height="1000"
        />{""}

      </Link>
      <Link href={url} className={styles.titleLink}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </div>
  );
}
