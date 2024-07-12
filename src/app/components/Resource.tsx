import { IResource } from "@database/resourceSchema";
import styles from "./resource.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RefObjectMap } from "app/resources/page";
import { useRef, useEffect } from "react";

export default function Resource({
  resource,
  refIndex,
  setRefs,
  refHandler,
}: {
  resource: IResource;
  refIndex: number;
  setRefs: React.Dispatch<
    React.SetStateAction<RefObjectMap<HTMLAnchorElement>>
  >;
  refHandler: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}) {
  const { picture, alt, title, url } = resource;
  const imageRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const addRef = (key1: number, key2: number) => {
      setRefs((prevReferences) => ({
        ...prevReferences,
        [key1]: imageRef,
        [key2]: titleRef,
      }));
    };
    addRef(refIndex, refIndex + 1);
  }, []);

  console.log("resource created");
  return (
    <div className={styles.container}>
      <Link
        className={styles.pictureLink}
        href={url}
        id={`resource${refIndex}`}
        ref={imageRef}
        onKeyDown={refHandler}
      >
        <Image
          className={styles.picture}
          src={picture}
          alt={alt}
          width="1000"
          height="1000"
        />
        {""}
      </Link>
      <Link
        href={url}
        className={styles.titleLink}
        id={`resource${refIndex + 1}`}
        ref={titleRef}
      >
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </div>
  );
}
