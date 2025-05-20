import React, { useEffect, useState } from "react";
import styles from "./AddUserPopUp.module.css";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import { IUser } from "@database/userSchema";
import { ErrorProvider, useErrorContext } from "./ErrorContext";
import ErrorMessageDisplay from "./ErrorMessageDisplay";

type AddUserPopUpProps = {
  setShowPopUp: React.Dispatch<React.SetStateAction<Boolean>>;
  onUserAdded: (user: IUser) => void;
};

export default function AddUserPopUp({
  setShowPopUp,
  onUserAdded,
}: AddUserPopUpProps) {
  const { appendErrorMessage, clearErrorMessages, removeErrorMessage } =
    useErrorContext();
  const [rowData, setRowData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    role: "Member",
    email: "",
  });
  const FIRSTNAME_EMPTY_MSG = "Firstname cannot be empty";
  const LASTNAME_EMPTY_MSG = "Lastname cannot be empty";
  const PHONE_NUMBER_EMPTY_MSG = "Phone Number cannot be empty";
  const PHONE_NUMBER_DIGITS_MSG = "Phone Number must contain 10 digits (0-9)";
  const ROLE_EMPTY_MSG = "Role cannot be empty";
  const EMAIL_EMPTY_MSG = "Email cannot be empty";
  const EMAIL_DOMAIN_MSG = "Email must contain a domain (ex: @gmail, @yahoo)";
  const EMAIL_DOT_MSG = 'Email must contain a "." (ex: .com, .edu, .gov)';

  function handleRowChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value } = event.target;
    setRowData((prevRowData) => ({
      ...prevRowData,
      [name]: value,
    }));
  }

  function validateUser() {
    /*
    Function to validate edits to a member
    */
    let isValid: boolean = true;
    if (!rowData["firstname"]) {
      isValid = false;
      appendErrorMessage(FIRSTNAME_EMPTY_MSG);
    } else {
      removeErrorMessage(FIRSTNAME_EMPTY_MSG);
    }

    if (!rowData["lastname"]) {
      isValid = false;
      appendErrorMessage(LASTNAME_EMPTY_MSG);
    } else {
      removeErrorMessage(LASTNAME_EMPTY_MSG);
    }

    if (!rowData["phoneNumber"]) {
      isValid = false;
      appendErrorMessage(PHONE_NUMBER_EMPTY_MSG);
    } else if (rowData["phoneNumber"].includes("_")) {
      isValid = false;
      removeErrorMessage(PHONE_NUMBER_EMPTY_MSG);
      appendErrorMessage(PHONE_NUMBER_DIGITS_MSG);
    } else {
      removeErrorMessage(PHONE_NUMBER_DIGITS_MSG);
    }

    if (!rowData["role"]) {
      isValid = false;
      appendErrorMessage(ROLE_EMPTY_MSG);
    } else {
      removeErrorMessage(ROLE_EMPTY_MSG);
    }

    if (!rowData["email"]) {
      isValid = false;
      appendErrorMessage(EMAIL_EMPTY_MSG);
    } else if (!rowData["email"].includes("@")) {
      isValid = false;
      removeErrorMessage(EMAIL_EMPTY_MSG);
      appendErrorMessage(EMAIL_DOMAIN_MSG);
    } else if (!rowData["email"].includes(".")) {
      isValid = false;
      removeErrorMessage(EMAIL_DOMAIN_MSG);
      appendErrorMessage(EMAIL_DOT_MSG);
    } else {
      removeErrorMessage(EMAIL_DOT_MSG);
    }
    return isValid;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    if (!validateUser()) {
      return;
    }

    const newUser: IUser = {
      username: rowData.firstname + " " + rowData.lastname,
      password: "no_password",
      userType: rowData.role,
      firstName: rowData.firstname,
      lastName: rowData.lastname,
      phoneNum: rowData.phoneNumber,
      email: rowData.email,
    };

    try {
      const response = await fetch("/api/registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Account created successfully!");
        setShowPopUp(false);
        onUserAdded(newUser);
        clearErrorMessages();
      } else {
        appendErrorMessage("Failed to add new user");
      }
    } catch (error) {
      appendErrorMessage("Error creating account: " + error);
    }
  };

  const handleCancel = async (e: React.MouseEvent<HTMLElement>) => {
    setShowPopUp(false);
    clearErrorMessages();
  };

  return (
    <ErrorProvider>
      <div className={styles.popupContainer}>
        <h1 className={styles.title}>Add a new member</h1>
        <table className={styles.table}>
          <thead className={styles.tableheader}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className={styles.tablebody}>
            <tr>
              <td>
                <input
                  type="text"
                  className={styles.rowinput}
                  id="firstname"
                  name="firstname"
                  value={rowData["firstname"]}
                  placeholder="First Name"
                  onChange={handleRowChange}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.rowinput}
                  id="lastname"
                  name="lastname"
                  value={rowData["lastname"]}
                  placeholder="Last Name"
                  onChange={handleRowChange}
                  required
                />
              </td>
              <td>
                <PatternFormat
                  className={styles.rowinput}
                  type="tel"
                  format="+1 (###) ###-####"
                  id="phoneNumber"
                  name="phoneNumber"
                  mask="_"
                  value={rowData["phoneNumber"]}
                  placeholder="+1 (###) ###-####"
                  onChange={handleRowChange}
                  required
                />
              </td>
              <td>
                <select
                  className={styles.dropdown}
                  id="role"
                  name="role"
                  value={rowData["role"]}
                  onChange={handleRowChange}
                >
                  <option value="Member">Member</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                <input
                  type="email"
                  className={styles.rowinput}
                  id="email"
                  name="email"
                  value={rowData["email"]}
                  placeholder="example@email.com"
                  onChange={handleRowChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.formButtonContainer}>
          <button className={styles.formButton} onClick={handleCancel}>
            Cancel
          </button>{" "}
          <button className={styles.formButton} onClick={handleSubmit}>
            Add
          </button>
          <ErrorMessageDisplay />
        </div>
      </div>
    </ErrorProvider>
  );
}
