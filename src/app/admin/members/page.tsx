"use client";
import { IUser } from "@database/userSchema";
import TableRow, { RowProps } from "@components/TableRow";
import React, { useState, useEffect } from "react";
import styles from "./members.module.css";
// import BackButton from '@components/BackButton';

export default function ManageMembers() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [addingUser, setAddingUser] = useState<Boolean>(false);
  const [newUserData, setNewUserData] = useState({
    user: "",
    phoneNumber: "",
    role: "",
    history: "",
    email: "",
  });

  function handleAddUser() {
    setAddingUser(true);
  }

  function handleCancelAddUser() {
    setAddingUser(false);
  }

  function handleConfirmAddUser() {
    setAddingUser(false);
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
        <TableRow index={index} userData={row} deleteUser={props.deleteUser} />
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

  async function postUser() {
    // TODO: find out if empty password acceptable
    const postUserData: IUser = {
      username: newUserData.user,
      password: "",
      userType: newUserData.role,
      firstName: newUserData.user.split(" ")[0],
      lastName: newUserData.user.split(" ")[1],
      phoneNum: newUserData.phoneNumber,
      email: newUserData.email,
    };

    const response = await fetch(`/api/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postUserData),
    });
    return response;
  }

  return (
    <div>
      {/* <BackButton/>  */}
      <div className={styles.container}>
        <div className={styles.table}>
          <Table userData={users} deleteUser={deleteUserByID} />
        </div>
        <div className={styles.addButtons}>
          {addingUser ? (
            <div>
              <button onClick={handleCancelAddUser}>Cancel</button>{" "}
              <button onClick={handleConfirmAddUser}>Confirm</button>
            </div>
          ) : (
            <button className={styles.addButton} onClick={handleAddUser}>
              Add User
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
