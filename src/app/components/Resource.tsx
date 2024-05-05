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
        />{" "}
      </Link>
      <div className={styles.text}>
        <p className={styles.title}>
          <Link className={styles.titleLink} href={url}>
            {title}
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}
