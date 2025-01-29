"use client";
import { IUser } from "@database/userSchema";
import styles from "./TableRow.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { PatternFormat } from "react-number-format";

export interface RowProps {
  index: number;
  userData: IUser;
  deleteUser: (index: number) => void;
}

export default function TableRow({ index, userData, deleteUser }: RowProps) {
  const [editUser, setEditUser] = useState(false);
  const [rowData, setRowData] = useState({
    fullname: `${userData.firstName} ${userData.lastName}`,
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
      rowData["fullname"] &&
      rowData["phoneNumber"] &&
      rowData["role"] &&
      rowData["history"] &&
      rowData["email"] &&
      !rowData["phoneNumber"].includes("_") // phone number must be complete
    );
  }

  function handleCancelEdit(): void {
    setEditUser(false);

    setRowData({
      fullname: `${userData.firstName} ${userData.lastName}`,
      phoneNumber: userData.phoneNum,
      role: userData.userType,
      history: "No History", // currently, 'history' is not used anywher
      email: userData.email,
    });
  }

  async function handleSaveEdit() {
    // TODO: add other saves
    if (validateEdits()) {
      const putData: IUser = {
        username: userData.username,
        password: userData.password,
        firstName: rowData.fullname.split(" ")[0],
        lastName: rowData.fullname.split(" ")[1],
        phoneNum: rowData.phoneNumber,
        userType: rowData.role,
        email: rowData.email,
      };
      console.log("updating:", putData);
      await updateUserData(putData);
      setEditUser(false);
    } else {
      console.log("Cannot save edits, member details not validated");
    }
  }

  async function updateUserData(userToUpdate: IUser) {
    const response = await fetch(`/api/users/${userToUpdate.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToUpdate),
    });
    return response;
  }

  return editUser ? (
    <tr key={index} className={editUser ? styles.editing : ""}>
      <td key={`row-${index}-fullname`}>
        <input
          type="text"
          className={styles.rowinput}
          id="fullname"
          name="fullname"
          value={rowData["fullname"] || ""}
          onChange={handleRowChange}
          required
        />
      </td>
      <td key={`row-${index}-phoneNumber`}>
        <PatternFormat
          className={styles.input}
          type="tel"
          format="+1 (###) ###-####"
          id="phoneNumber"
          name="phoneNumber"
          mask="_"
          value={rowData["phoneNumber"] || ""}
          placeholder="Phone Number"
          onChange={handleRowChange}
          required
        />
      </td>
      <td key={`row-${index}-role`}>
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
      <td key={`row-${index}-history`}>
        <input
          type="text"
          className={styles.rowinput}
          id="history"
          name="history"
          value={rowData["history"] || ""}
          onChange={handleRowChange}
          required
        />
      </td>
      <td key={`row-${index}-email`}>
        <input
          type="email"
          className={styles.rowinput}
          id="email"
          name="email"
          value={rowData["email"] || ""}
          onChange={handleRowChange}
          required
        />
      </td>
      <td key={`row-${index}-editButtons`}>
        <div>
          <button
            onClick={handleCancelEdit}
            className="cancelbutton"
            style={{ cursor: "pointer" }}
          >
            Cancel
          </button>
          {/** TODO: add PatternFormat */}
          <button
            onClick={handleSaveEdit}
            className="savebutton"
            style={{ cursor: "pointer" }}
          >
            Confirm
          </button>
        </div>
      </td>
      <td key={`row-${index}-deleteButton`}>
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
      <td key={`row-${index}-fullname`}>{rowData.fullname}</td>
      <td key={`row-${index}-phoneNumber`}>{rowData.phoneNumber}</td>
      <td key={`row-${index}-role`}>{rowData.role}</td>
      <td key={`row-${index}-history`}>{rowData.history}</td>
      <td key={`row-${index}-email`}>{rowData.email}</td>
      <td key={`row-${index}-editButton`}>
        <button
          onClick={() => handleEdit(index)}
          className="deletebutton"
          style={{ cursor: "pointer" }}
        >
          Edit
        </button>
      </td>
      <td key={`row-${index}-deleteButton`}>
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
