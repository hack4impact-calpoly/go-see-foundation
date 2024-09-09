"use client";
import { IDonation } from "@database/donationSchema";
import React, { useState, useEffect } from "react";
import styles from "./donations.module.css";
import BackButton from '@components/BackButton';

export default function ManageMembers() {
  const [donations, setDonations] = useState([]);

  interface TableProps {
    donationData: IDonation[];
  }

  function Table(props: TableProps) {
    return (
      <table className={styles.table2}>
        <TableHeader />
        <TableBody donationData={props.donationData} />
      </table>
    );
  }

  function TableHeader() {
    return (
      <thead className={styles.tableheader}>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Amount</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props: TableProps) {
    const userRows = props.donationData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.firstName + " " + row.lastName}</td>
          <td>{row.phoneNum}</td>
          <td>{row.email}</td>
          <td>{"$" + row.amount}</td>
        </tr>
      );
    });
    return <tbody className={styles.tablebody}>{userRows}</tbody>;
  }

  async function fetchDonations() {
    const fetchedDonations = await fetch("/api/donations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!fetchedDonations.ok) {
      throw new Error("Failed to fetch donations");
    }
    const donationData = await fetchedDonations.json();
    return donationData;
  }

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const userData = await fetchDonations();
        setDonations(userData);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchDonationData();
  }, []);

  return (
    <div> <BackButton />
      <div className={styles.container}>
        <div className={styles.table}>
          <Table donationData={donations} />
        </div>
      </div>
    </div>
  );
}
