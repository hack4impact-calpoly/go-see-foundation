import React, { useEffect, useState } from "react";
import styles from "./AddUserPopUp.module.css";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import { IUser } from "@database/userSchema";

type AddUserPopUpProps = {
  setShowPopUp: React.Dispatch<React.SetStateAction<Boolean>>;
  onUserAdded: (user: IUser) => void;
};

export default function AddUserPopUp({
  setShowPopUp,
  onUserAdded,
}: AddUserPopUpProps) {
  const [showError, setShowError] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [rowData, setRowData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    role: "Member",
    email: "",
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

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    if (
      !rowData.firstname ||
      !rowData.lastname ||
      !rowData.phoneNumber ||
      !rowData.role ||
      !rowData.email
    ) {
      setShowError(true);
      if (
        !rowData.phoneNumber ||
        rowData.phoneNumber[9] === "_" ||
        rowData.phoneNumber[16] === "_"
      ) {
        setValidNumber(false);
        return;
      } else {
        setValidNumber(true);
      }
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
    console.log(newUser);

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
      } else {
        console.error("Failed to add new user");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.popupContainer}>
      <h1 className="title">Add a new member</h1>
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
                <option value="admin">admin</option>
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
        <button
          className={styles.formButton}
          onClick={() => setShowPopUp(false)}
        >
          Cancel
        </button>{" "}
        <button className={styles.formButton} onClick={handleSubmit}>
          Add
        </button>
      </div>
      {showError ? (
        <div className={styles.errorMessage}>
          <p>
            ERROR: Cannot add new user. All fields must be filled out!
            {validNumber
              ? null
              : "The phone number must contain exactly 10 numbers."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
