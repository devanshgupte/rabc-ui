import axios from "axios";

const API_URL = "http://localhost:5000";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const fetchRoles = async () => {
  try {
    const response = await fetch("http://localhost:5000/roles");
    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }
    const data = await response.json();

    // You can process the roles data here if necessary.
    return data.map((role) => ({
      ...role,
      name: role.name || `Role ${role.id}`, // Default name if not provided
    }));
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const addRole = async (newRole) => {
  try {
    const response = await fetch("http://localhost:5000/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    });
    if (!response.ok) {
      throw new Error("Failed to add role");
    }
    const addedRole = await response.json();
    return addedRole;
  } catch (error) {
    console.error("Error adding role:", error);
    throw error;
  }
};

// Update an existing role
export const updateRole = async (id, updatedRole) => {
  try {
    const response = await axios.put(`${API_URL}/roles/${id}`, updatedRole);
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (id) => {
  try {
    await axios.delete(`${API_URL}/roles/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};

// Fetch all permissions
export const fetchPermissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/permissions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
};
const updateRolePermissions = async (roleId, newPermissions) => {
  try {
    // Fetch the current roles from db.json
    const response = await fetch("http://localhost:5000/roles");
    const roles = await response.json();

    // Find the role by its ID
    const roleToUpdate = roles.find(role => role.id === roleId);
    if (!roleToUpdate) {
      throw new Error(`Role with id ${roleId} not found.`);
    }

    // Update the permissions of the role
    roleToUpdate.permissions = newPermissions;

    // Update the db.json file by sending the modified roles back to the server
    const updateResponse = await fetch(`http://localhost:5000/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleToUpdate),
    });

    if (updateResponse.ok) {
      console.log("Permissions updated successfully.");
      
    } else {
      throw new Error("Failed to update the permissions.");
    }
  } catch (error) {
    console.error("Error updating role permissions:", error);
    alert("Failed to update permissions. Please try again.");
  }
};

// check login status
export const checkLoginStatus = () => {
  return !!localStorage.getItem("authToken"); 
};

// logout user
export const logoutUser = () => {
  localStorage.removeItem("authToken"); // Remove the token from localStorage
};
