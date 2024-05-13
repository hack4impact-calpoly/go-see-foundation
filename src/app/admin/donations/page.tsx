"use client";
import { IDonation } from "@database/donationSchema";
import React, {useState, useEffect} from "react";
import styles from './donations.module.css'

export default function manageMembers() {
    const [users, setUsers] = useState([])

    interface TableProps {
        userData: IDonation[];
    }
    
    function Table(props: TableProps){
        return(
            <table className={styles.table2}>
                <TableHeader/>
                <TableBody 
                    userData={props.userData} 
                />
            </table>
        );
    }
    
    function TableHeader(){
        return(
            <thead className={styles.tableheader}>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>History</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
            </thead>
        );
    }

    function TableBody(props: TableProps){
        const userRows = props.userData.map((row: IDonation, index) => {
            return(
                <tr key={index}>
                    <td>{row.amount}</td>
                    <td>{row.email}</td>
                </tr>
            );
        });
        return(
            <tbody className={styles.tablebody}>
                {userRows}
            </tbody>
        );
    }

    async function fetchDonations(){
        const fetchedUsers = await fetch("/api/stripe", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!fetchedUsers.ok) {
            throw new Error("Failed to fetch donations");
        }
        const userData = await fetchedUsers.json();
        return userData;
    }

    useEffect(() => {
        const fetchDonationHistory = async () => {
            try{
                const userData = await fetchDonations();
                setUsers(userData);
            }
            catch (error: unknown){
                console.log(error);
            }
        }

        fetchDonationHistory();
    }, []);




    return(
        <div className={styles.container}>
            <div className={styles.table}>
                <Table 
                    userData={users}
                />
            </div>
        </div>
    )

}