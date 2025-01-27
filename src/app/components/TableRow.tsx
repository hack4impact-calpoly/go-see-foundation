"use client";
import { IUser } from "@database/userSchema";
import styles from "./TableRow.module.css";
import React, { useState } from "react";
import Image from "next/image";

export interface RowProps {
  index: number;
  userData: IUser;
  deleteUser: (index: number) => void;
}

export default function TableRow({ index, userData, deleteUser }: RowProps) {
  const [editUser, setEditUser] = useState(false);
  const [rowData, setRowData] = useState({
    username: `${userData.firstName} ${userData.lastName}`,
    phoneNumber: userData.phoneNum,
    role: userData.userType,
    history: "No History",
    email: userData.email,
  });

  function handleRowChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    console.log(name, value);
    setRowData((prevRowData) => ({
      ...prevRowData,
      [name]: value,
    }));
  }

  function handleEdit(index: number): void {
    setEditUser(true);

    console.log("editing", index);
    console.log(rowData);
  }

  function validateEdits() {
    /*
    Function to validate edits to a member
    Currently, only checks that every field is not empty
    */
    return (
      rowData["username"] &&
      rowData["phoneNumber"] &&
      rowData["role"] &&
      rowData["history"] &&
      rowData["email"]
    );
  }

  function handleSaveEdit(): void {
    // TODO: add other saves

    if (validateEdits()) {
      setEditUser(false);
    } else {
      console.log("Cannot save edits, member details not validated");
    }
  }

  function handleCancelEdit(): void {
    setEditUser(false);

    setRowData({
      username: `${userData.firstName} ${userData.lastName}`,
      phoneNumber: userData.phoneNum,
      role: userData.userType,
      history: "No History", // currently, 'history' is not used anywher
      email: userData.email,
    });
  }

  return editUser ? (
    <tr key={index} className={editUser ? styles.editing : ""}>
      <td>
        <input
          type="text"
          className={styles.rowinput}
          id="username"
          name="username"
          value={rowData["username"] || ""}
          onChange={handleRowChange}
        />
      </td>
      <td key={`row-${index}-phoneNumber`}>
        <input
          type="text"
          className={styles.rowinput}
          id="phoneNumber"
          name="phoneNumber"
          value={rowData["phoneNumber"] || ""}
          onChange={handleRowChange}
        />
      </td>
      <td>
        <select
          className={styles.dropdown}
          id="role"
          name="role"
          value={rowData["role"] || ""}
          onChange={handleRowChange}
        >
          <option value="Member">Member</option>
          <option value="Volunteer">Volunteer</option>
          <option value="admin">admin</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          className={styles.rowinput}
          id="history"
          name="history"
          value={rowData["history"] || ""}
          onChange={handleRowChange}
        />
      </td>
      <td>
        <input
          type="text"
          className={styles.rowinput}
          id="email"
          name="email"
          value={rowData["email"] || ""}
          onChange={handleRowChange}
        />
      </td>
      <td>
        <div>
          <button
            onClick={handleCancelEdit}
            className="cancelbutton"
            style={{ cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEdit}
            className="savebutton"
            style={{ cursor: "pointer" }}
          >
            Confirm
          </button>
        </div>
      </td>
      <td>
        <button
          onClick={() => deleteUser(index)}
          className="deletebutton"
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/delete.jpg"
            alt="Delete"
            width={30}
            height={30}
            style={{ width: "30px", height: "30px" }}
          />
        </button>
      </td>
    </tr>
  ) : (
    <tr key={index} className={editUser ? styles.editing : ""}>
      <td>{rowData.username}</td>
      <td key={`row-${index}-phoneNumber`}>{userData.phoneNum}</td>
      <td>{rowData.role}</td>
      <td>{rowData.history}</td>
      <td>{rowData.email}</td>
      <td>
        <button
          onClick={() => handleEdit(index)}
          className="deletebutton"
          style={{ cursor: "pointer" }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => deleteUser(index)}
          className="deletebutton"
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/delete.jpg"
            alt="Delete"
            width={30}
            height={30}
            style={{ width: "30px", height: "30px" }}
          />
        </button>
      </td>
    </tr>
  );
}
