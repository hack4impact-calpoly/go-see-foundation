"use client";
import { IUser } from "@database/userSchema";
import TableRow, { RowProps } from "@components/TableRow";
import React, { useState, useEffect, useRef } from "react";
import styles from "./members.module.css";
import AddUserPopUp from "@components/AddUserPopUp";
import ErrorMessageDisplay from "@components/ErrorMessageDisplay";
import { ErrorProvider } from "@components/ErrorContext";

export default function ManageMembers() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [addingUser, setAddingUser] = useState<Boolean>(false);

  function handleAddUser() {
    setAddingUser(true);
  }

  interface TableProps {
    userData: IUser[];
    deleteUser: (index: number) => void;
  }

  function Table(props: TableProps) {
    return (
      <table className={styles.table2}>
        <TableHeader />
        <TableBody userData={props.userData} deleteUser={props.deleteUser} />
      </table>
    );
  }

  function TableHeader() {
    return (
      <thead className={styles.tableheader}>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>History</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props: TableProps) {
    const userRows = props.userData.map((row, index) => {
      return (
        <TableRow
          key={index}
          index={index}
          userData={row}
          deleteUser={props.deleteUser}
        />
      );
    });
    return <tbody className={styles.tablebody}>{userRows}</tbody>;
  }

  async function fetchUsers() {
    const fetchedUsers = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!fetchedUsers.ok) {
      throw new Error("Failed to fetch users");
    }
    const userData = await fetchedUsers.json();
    return userData;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  function handleUpdateUsers(newUser: IUser) {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  }

  async function deleteUserByID(index: number) {
    const userToDelete: IUser = users[index];
    backendUserDelete(userToDelete)
      .then((response) => {
        if (response.status == 200) {
          const updatedUsers = users.filter(
            (user: IUser) => user.email != userToDelete.email
          );
          setUsers(updatedUsers);
        } else {
          throw new Error("User Not Deleted: " + response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function backendUserDelete(userToDelete: IUser) {
    const email = userToDelete.email;
    const response = await fetch(`/api/users/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  return (
    <ErrorProvider>
      <div>
        {/* <BackButton/>  */}
        <div className={styles.container}>
          <div className={styles.table}>
            <Table userData={users} deleteUser={deleteUserByID} />
          </div>
          <ErrorMessageDisplay />
          <div className={styles.addButtons}>
            {addingUser ? (
              <div>
                <AddUserPopUp
                  setShowPopUp={setAddingUser}
                  onUserAdded={handleUpdateUsers}
                />
              </div>
            ) : (
              <button className={styles.addButton} onClick={handleAddUser}>
                Add User
              </button>
            )}
          </div>
        </div>
      </div>
    </ErrorProvider>
  );
}
