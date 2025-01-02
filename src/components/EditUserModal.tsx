import React, { useState, useEffect } from "react";
import { validateUser } from "@/utils/validation";
import { User } from "@/types/User";
import "../app/css/EditUser.css";
import Button from "./Button";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split("."); 

    setEditedUser((prevUser) => {
      const updatedUser = { ...prevUser }; 

      let current: any = updatedUser; 

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; 
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return updatedUser;
    });
  };

  const handleSave = () => {
    const validationErrors = validateUser(editedUser);
    console.log(validationErrors); 
    if (Object.keys(validationErrors).length === 0) {
      onSave(editedUser);
      onClose();
    } else {
      setErrors(validationErrors); 
      console.log("Errors set:", validationErrors); 
    }
  };

  console.log("EditUserModal errors:", errors);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit User</h2>
        <form className="form">
          <div className="input-group">
            <label className="label">
              First Name:
              <input
                type="text"
                name="name.first"
                value={editedUser.name.first}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.name?.first && (
              <div className="error">{errors.name.first}</div>
            )}
          </div>

          <div className="input-group">
            <label className="label">
              Last Name:
              <input
                type="text"
                name="name.last"
                value={editedUser.name.last}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.name?.last && (
              <div className="error">{errors.name.last}</div>
            )}
          </div>

          <div className="input-group">
            <label className="label">
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label className="label">
              City:
              <input
                type="text"
                name="location.city"
                value={editedUser.location.city}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.location?.city && (
              <div className="error">{errors.location.city}</div>
            )}
          </div>

          <div className="input-group">
            <label className="label">
              Country:
              <input
                type="text"
                name="location.country"
                value={editedUser.location.country}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.location?.country && (
              <div className="error">{errors.location.country}</div>
            )}
          </div>
          <Button text="Save" onClick={handleSave} color="green" size="small" />
          <Button text="Cancel" onClick={onClose} color="red" size="small" />
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
