"use client";
import { IUser } from "@database/userSchema";
import styles from "./TableRow.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { PatternFormat } from "react-number-format";
import { useErrorContext } from "./ErrorContext";

export interface RowProps {
  index: number;
  userData: IUser;
  deleteUser: (index: number) => void;
}

export default function TableRow({ index, userData, deleteUser }: RowProps) {
  const { appendErrorMessage, clearErrorMessages } = useErrorContext();
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
    setRowData((prevRowData) => ({
      ...prevRowData,
      [name]: value,
    }));
  }

  function handleEdit(index: number): void {
    setEditUser(true);
  }

  function validateEdits() {
    /*
    Function to validate edits to a member
    */
    let isValid: boolean = true;
    if (!rowData["fullname"]) {
      isValid = false;
      appendErrorMessage("Fullname cannot be empty");
    }

    if (!rowData["phoneNumber"]) {
      isValid = false;
      appendErrorMessage("Phone Number cannot be empty");
    } else if (rowData["phoneNumber"].includes("_")) {
      isValid = false;
      appendErrorMessage("Phone Number must contain 10 digits (0-9)");
    }

    if (!rowData["role"]) {
      isValid = false;
      appendErrorMessage("Role cannot be empty");
    }
    if (!rowData["history"]) {
      isValid = false;
      appendErrorMessage("History cannot be empty");
    }

    if (!rowData["email"]) {
      isValid = false;
      appendErrorMessage("Email cannot be empty");
    } else if (!rowData["email"].includes("@")) {
      isValid = false;
      appendErrorMessage("Email must contain a domain (ex: @gmail, @yahoo)");
    } else if (!rowData["email"].includes(".")) {
      isValid = false;
      appendErrorMessage('Email must contain a "." (ex: .com, .edu, .gov)');
    }
    return isValid;
  }

  function handleCancelEdit(): void {
    setEditUser(false);
    clearErrorMessages();

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
    if (!validateEdits()) {
      return;
    }

    const putData: IUser = {
      username: userData.username,
      password: userData.password,
      firstName: rowData.fullname.split(" ")[0],
      lastName: rowData.fullname.split(" ")[1],
      phoneNum: rowData.phoneNumber,
      userType: rowData.role,
      email: rowData.email,
    };

    try {
      const response = await updateUserData(putData);
      console.log("Response: " + response);
      if (response.ok) {
        setEditUser(false);
        clearErrorMessages();
      } else {
        appendErrorMessage("Update failed");
      }
    } catch (error) {
      appendErrorMessage("An error occured while updating the user");
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
    <tr key={index} className={styles.editing}>
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
      <td key={`row-${index}-editButtons`} className={styles.rowButtons}>
        <div>
          <button
            type="button"
            onClick={handleCancelEdit}
            className={styles.button}
          >
            Cancel
          </button>
          {/** TODO: add PatternFormat */}
          <button
            type="button"
            onClick={handleSaveEdit}
            className={styles.button}
          >
            Confirm
          </button>
        </div>
      </td>
      <td key={`row-${index}-deleteButton`}>
        <button onClick={() => deleteUser(index)} className={styles.button}>
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
      <td key={`row-${index}-editButton`} className={styles.rowButtons}>
        <button onClick={() => handleEdit(index)} className={styles.button}>
          Edit
        </button>
      </td>
      <td key={`row-${index}-deleteButton`}>
        <button onClick={() => deleteUser(index)} className={styles.button}>
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
