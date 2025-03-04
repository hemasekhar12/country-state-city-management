import React from "react";

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button className="cancel" onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationDialog;

