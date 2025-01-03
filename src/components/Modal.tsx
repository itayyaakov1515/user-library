import React from "react";
import "../app/css/Modal.css";
import Button from "./Button";

interface ConfirmationModalProps {
  action: string;
  text?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  action,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h2>{`Are you sure you want to ${action}?`}</h2>
        <Button
          text="Confirm"
          onClick={onConfirm}
          color="green"
          size="medium"
        />
        <Button text="Cancel" onClick={onCancel} color="red" size="medium" />
      </div>
    </div>
  );
};

export default ConfirmationModal;
