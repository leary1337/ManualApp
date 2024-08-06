import React, { useState } from 'react';

import { Section } from '../api';
import styles from '../components/EditSectionDialog.module.css';

interface Props {
    initialSection: Section;
    isEditMode: boolean;
    onClose: () => void;
    onSave: (section: Section, isEditMode: boolean) => void;
}

const EditSectionDialog: React.FC<Props> = ({ initialSection, isEditMode, onClose, onSave }) => {
    const [name, setName] = useState(initialSection.name);
    const [description, setDescription] = useState(initialSection.description);

    const handleSave = () => {
        const section = { ...initialSection, name, description };
        onSave(section, isEditMode);
    };

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
                <h2 className={styles.dialogTitle}>{isEditMode ? 'Edit Section' : 'Create Section'}</h2>
                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={styles.saveButton} onClick={handleSave}>Save</button>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditSectionDialog;
