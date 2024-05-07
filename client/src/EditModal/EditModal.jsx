import React, { useState } from 'react';

const EditModal = ({ isOpen, targetKey, onClose, object, onUpdate }) => {
  const [editedObjects, setEditedObjects] = useState(object);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setEditedObjects({
      ...setEditedObjects,
      [targetKey]: {...editedObjects[targetKey], [name]: value},
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedObjects[targetKey]);
    onClose();
  };

  if (!isOpen) {
    return null;
  } else {
    console.log(editedObjects[targetKey])
    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Edit Object</h2>
            <form onSubmit={handleSubmit}>
              <label>
                DBC ID:
                <input
                  type="text"
                  name="DBC_ID"
                  value={editedObjects[targetKey].DBC_ID}
                  onChange={handleChange}
                  readOnly={true}
                />
              </label>
              <br />
              <label>
                Label:
                <input
                  type="text"
                  name="label"
                  
                  defaultValue={editedObjects[targetKey].label}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Start:
                <input
                  type="number"
                  name="start"
                  value={editedObjects[targetKey].start}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                End:
                <input
                  type="number"
                  name="end"
                  value={editedObjects[targetKey].end}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Major Divisions:
                <input
                  type="number"
                  name="major_divisions"
                  value={editedObjects[targetKey].major_divisions}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Minor Divisions:
                <input
                  type="number"
                  name="minor_divisions"
                  value={editedObjects[targetKey].minor_divisions}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Multiplier:
                <input
                  type="number"
                  name="multiplier"
                  value={editedObjects[targetKey].multiplier}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      );
  }

  
};

export default EditModal;