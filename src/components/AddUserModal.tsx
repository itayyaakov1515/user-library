import React, { useState, useEffect } from "react";
import { User } from "@/types/User";
import Button from "./Button";
import "../app/css/Form.css";

interface AddUserModalProps {
  onClose: () => void;
  onSave: (newUser: User) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSave }) => {
  const [newUser, setNewUser] = useState<User>({
    login: { uuid: "" },
    name: { first: "", last: "" },
    email: "",
    location: { city: "", country: "" },
    picture: { medium: "" },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (imagePreview) {
      setNewUser((prevUser) => ({
        ...prevUser,
        picture: { medium: imagePreview },
      }));
    }
  }, [imagePreview]);

  const validate = () => {
    const newErrors: any = {};

    if (!newUser.name.first) {
      newErrors.name = { ...newErrors.name, first: "First name is required" };
    }
    if (!newUser.name.last) {
      newErrors.name = { ...newErrors.name, last: "Last name is required" };
    }
    if (!newUser.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!newUser.location.city) {
      newErrors.location = { ...newErrors.location, city: "City is required" };
    }
    if (!newUser.location.country) {
      newErrors.location = {
        ...newErrors.location,
        country: "Country is required",
      };
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nameParts = name.split(".");
    if (nameParts.length === 2) {
      setNewUser((prevUser) => ({
        ...prevUser,
        [nameParts[0]]: {
          ...prevUser[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSave = () => {
    if (validate()) {
      onSave(newUser);
      onClose(); 
    }
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Add New User</h2>

          <div className="input-group">
            <label className="label">
              First Name:
              <input
                type="text"
                name="name.first"
                value={newUser.name.first}
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
                value={newUser.name.last}
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
                value={newUser.email}
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
                value={newUser.location.city}
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
                value={newUser.location.country}
                onChange={handleChange}
                className="input"
              />
            </label>
            {errors.location?.country && (
              <div className="error">{errors.location.country}</div>
            )}
          </div>

          <div className="input-group">
            <label className="label">
              Profile Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input"
              />
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="preview-image"
                />
              </div>
            )}
          </div>

          <Button text="Save" onClick={handleSave} color="green" size="small" />
          <Button text="Cancel" onClick={onClose} color="red" size="small" />
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
