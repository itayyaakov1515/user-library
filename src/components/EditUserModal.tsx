import React, { useState, useEffect } from "react";
import { validateUser } from "@/utils/validation";
import { User } from "@/types/User";
import "../app/css/Form.css";
import Button from "./Button";
import ConfirmationModal from "./Modal";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  users: User[];
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
  users,
}) => {
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState<any>({});
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"save" | "cancel" | null>(null);

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
    const validationErrors = validateUser(editedUser, users);
    if (Object.keys(validationErrors).length === 0) {
      setActionType("save");
      setShowConfirmation(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirmAction = () => {
    if (actionType === "save") {
      onSave(editedUser);
    }
    onClose();
    setShowConfirmation(false);
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Edit User</h2>
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

          <Button text="Edit" onClick={handleSave} color="green" size="small" />
          <Button
            text="Cancel"
            onClick={handleCancel}
            color="red"
            size="small"
          />
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          action={"edit the user"}
          onConfirm={handleConfirmAction}
          onCancel={handleCancelAction}
        />
      )}
    </div>
  );
};

export default EditUserModal;
