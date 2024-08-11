"use client";
import React, { useState, useEffect } from "react";
import styles from "./resources.module.css";
import ResourceRow from "@components/ResourceRow";
import { IResource } from "@database/resourceSchema";
import Image from "next/image";

export type RefObjectMap<T> = {
  [key: string]: React.RefObject<T>;
};

export default function ResourcePage() {
  const [resources2D, setResources2D] = useState<Array<Array<IResource>>>([]);
  const [count, setCount] = useState<number>(0);
  const [references, setReferences] = useState<RefObjectMap<HTMLAnchorElement>>(
    {}
  );

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      let i = 0;
      while (i < count) {
        if (e.currentTarget.id === `resource${i}`) {
          console.log(e.currentTarget.id);
          if (i === count - 1) {
            console.log("at the end");
            // at the end, loop back to start
            references[0]?.current?.focus();
          } else {
            console.log("NOT at the end");
            references[i + 1]?.current?.focus();
          }
          i = count; // end loop
        } else {
          i++;
        }
      }
    }
  };

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const data = await fetchAllResources();

        let tempResources2D: Array<Array<IResource>> = [];
        let row: Array<IResource> = [];
        for (let i = 0; i < data.length; i++) {
          if (row.length === 3) {
            tempResources2D.push(row);
            row = [];
          }
          row.push(data[i]);
        }
        if (row.length !== 0) {
          tempResources2D.push(row);
        }
        setResources2D(tempResources2D);
        setCount(data.length * 2);
      } catch (err: unknown) {
        console.error(`Resources could not be fetched. Error: ${err}`);
      }
    };

    fetchResourceData();
  }, []);

  const fetchAllResources = async () => {
    try {
      const res = await fetch("/api/resources", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch resources");
      }

      const res_j = await res.json();
      return res_j;
    } catch (err: unknown) {
      console.error(`Error fetching resources: ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionHeader}>Resources</h2>
      {resources2D?.map((row: Array<IResource>, index: number) => (
        <ResourceRow
          key={index}
          resources={row}
          startIndex={index * 3 * 2}
          setRefs={setReferences}
          refHandler={handleInputKeyPress}
        />
      ))}
      <h2 className={styles.sectionHeader} tabIndex={0}>
        Supporters
      </h2>
      <Image
        className={styles.supportersPicture}
        src={"/supporters.png"}
        alt="The Go See Foundation's Supporters!"
        width="2513" // original image dimensions
        height="1285"
        tabIndex={0}
      />{" "}
    </div>
  );
}
