import { IResource } from "@database/resourceSchema";
import styles from "./resource.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Resource({ resource }: { resource: IResource }) {
  const { picture, alt, title, url } = resource;
  const { push } = useRouter();
  return (
    <div className={styles.container}>
      <Link className={styles.pictureLink} href={url}>
        <Image
          className={styles.picture}
          src={picture}
          alt={alt}
          width="500"
          height="500"
        />{" "}
      </Link>
      <div className={styles.text}>
        <Link className={styles.titleLink} href={url}>
          <p className={styles.title}>{title}</p>{" "}
        </Link>
      </div>
    </div>
  );
}
