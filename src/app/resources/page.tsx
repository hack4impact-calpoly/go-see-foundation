"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./resources.module.css";
import Resource from "@components/Resource";
import { IResource } from "@database/resourceSchema";

export default function ResourcePage() {
  const [resources, setResources] = useState<Array<IResource>>([]);
  const resources2D: Array<Array<IResource>> = [];

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const data = await fetchAllResources();
        setResources(data);
      } catch (err: unknown) {
        console.error(`Resources could not be fetched. Error: ${err}`);
      }
    };

    console.log("fetching");

    fetchResourceData();
  }, []);

  useEffect(() => {
    const splitResources = () => {
      let row: Array<IResource> = [];
      for (let i = 0; i < resources.length; i++) {
        if (row.length === 3) {
          resources2D.append(row);
          row = [];
        }
        row.append(resources[i]);
      }
      if (row.length !== 0) {
        resources2D.append(row);
      }
      console.log(resources2D);
    };

    splitResources();
  }, [resources]); // occurs after all resources fetched and set to 'resources'

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
      {resources?.map((single_resource: IResource, index: number) => (
        <Resource key={index} resource={single_resource} />
      ))}
    </div>
  );
}
