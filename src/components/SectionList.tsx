import React, { useEffect, useState } from 'react';
import { Section, createSection, deleteSection, getSections, updateSection } from '../api';

import EditSectionDialog from './EditSectionDialog';
import { Link } from '@telegram-apps/telegram-ui';
import styles from '../components/SectionList.module.css';

interface Props {
	selectedSection?: Section;
	onClick: (section: Section) => void;
}


const SectionList: React.FC<Props> = ({ selectedSection, onClick }) => {
	const [queryResult, setQueryResult] = useState<Section[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [editingSection, setEditingSection] = useState<Section | null>(null);
	const [creatingSection, setCreatingSection] = useState<boolean>(false);

	const runQuery = async () => {
		setLoading(true);
		try {
			const result = await getSections(selectedSection ? selectedSection.id : 0);
			setQueryResult(result);
		} catch (err) {
			console.log('Failed to fetch sections');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		runQuery();
	}, [selectedSection]);

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleEdit = (section: Section) => {
		setEditingSection(section);
	};

	const handleSave = async (section: Section, isEditMode: boolean) => {
		if (isEditMode) {
			await updateSection(section);
		} else {
			await createSection(section);
		}
		setEditingSection(null);
		setCreatingSection(false);
		runQuery();
	};

	const handleDelete = async (section: Section) => {
		if (window.confirm('Are you sure you want to delete this section and all its children?')) {
			await deleteSection(section.id);
			runQuery();
		}
	};

	return (
		<div className={styles.sectionList}>
			<p>{selectedSection?.description}</p>
			<button className={styles.createButton} onClick={() => setCreatingSection(true)}>Create New Section</button>
			<ul className={styles.sectionItems}>
				{queryResult && queryResult.map(section => (
					<li key={section.id} className={styles.sectionItem}>
						<Link className={styles.sectionLink} onClick={() => onClick(section)}>{section.name}</Link>
						<div className={styles.sectionActions}>
							<button className={styles.editButton} onClick={() => handleEdit(section)}>✏️</button>
							<button className={styles.deleteButton} onClick={() => handleDelete(section)}>🗑️</button>
						</div>
					</li>
				))}
			</ul>
			{(editingSection || creatingSection) && (
				<EditSectionDialog
					initialSection={editingSection || { id: 0, name: '', description: '', parent_id: selectedSection?.id }}
					isEditMode={!!editingSection}
					onClose={() => {
						setEditingSection(null);
						setCreatingSection(false);
					}}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};

export default SectionList;
