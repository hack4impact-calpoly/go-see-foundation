"use client";
import { IUser } from "@database/userSchema";
import React, {useState, useEffect} from "react";

export default function manageMembers() {
    const [users, setUsers] = useState([])

    interface TableProps {
        userData: IUser[];
        deleteUser: (index: number) => void;
    }
    
    function Table(props: TableProps){
        return(
            <table>
                <TableHeader/>
                <TableBody 
                    userData={props.userData} 
                    deleteUser={props.deleteUser}
                />
            </table>
        );
    }
    
    function TableHeader(){
        return(
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>History</th>
                    <th>Contact</th>
                </tr>
            </thead>
        );
    }

    function TableBody(props: TableProps){
        const userRows = props.userData.map((row, index) => {
            return(
                <tr key={index}>
                    <td>{row.firstName} {row.lastName}</td>
                    <td>No Age</td>
                    <td>{row.phoneNum}</td>
                    <td>{row.userType}</td>
                    <td>No History</td>
                    <td>{row.email}</td>
                    <td>
                    <button onClick={() => props.deleteUser(index)} style={{ cursor: 'pointer' }}>
                        Delete
                    </button>
                    </td>
                </tr>
            );
        });
        return(
            <tbody>
                {userRows}
            </tbody>
        );
    }

    async function fetchUsers(){
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
            try{
                const userData = await fetchUsers();
                setUsers(userData);
            }
            catch (error: unknown){
                console.log(error);
            }
        }

        fetchUserData();
    }, []);

    async function deleteUserByID(index: number){
        const userToDelete: IUser = users[index]
        backendUserDelete(userToDelete)
            .then((response) => {
                if (response.status == 200){
                    const updatedUsers = users.filter((user: IUser) => user.email != userToDelete.email);
                    setUsers(updatedUsers);
                }
                else{
                    throw new Error("User Not Deleted: " + response.status)
                }
            })
            .catch((error) => {console.log(error)});
    }

    async function backendUserDelete(userToDelete: IUser){
        const email = userToDelete.email;
        const response = await fetch(`/api/users/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response;
    }

    return(
        <div>
            <Table 
                userData={users}
                deleteUser={deleteUserByID}
            />
        </div>
    )

}