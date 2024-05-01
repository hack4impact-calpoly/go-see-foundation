"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./resources.module.css";
import Resource from "@components/Resource";
import { IResource } from "@database/resourceSchema";

export default function ResourcePage() {
  const [resources, setResources] = useState<Array<IResource>>([]);

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const data = await fetchAllResources();
        setResources(data);
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
      {resources.map((single_resource: IResource, index: number) => (
        <Resource key={index} resource={single_resource} />
      ))}
    </div>
  );
}
