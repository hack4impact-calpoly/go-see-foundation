"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./resources.module.css";
import ResourceRow from "@components/ResourceRow";
import { IResource } from "@database/resourceSchema";
import Image from "next/image";

export default function ResourcePage() {
  const [resources2D, setResources2D] = useState<Array<Array<IResource>>>([]);

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
        <ResourceRow key={index} resources={row} />
      ))}
      <h2 className={styles.sectionHeader}>Supporters</h2>
      <Image
        className={styles.supportersPicture}
        src={"/supporters.png"}
        alt="The Go See Foundation's Supporters!"
        width="2513" // original image dimensions
        height="1285"
      />{" "}
    </div>
  );
}
