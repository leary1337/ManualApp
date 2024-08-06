import React, { useEffect, useState } from 'react';
import { Section, getSectionById } from '../api';

import { BackButton } from '@twa-dev/sdk/react';
import styles from '../components/NavigationBar.module.css';

interface Props {
	selectedSection?: Section;
	onClick: (section: Section) => void;
}

const NavigationBar: React.FC<Props> = ({ selectedSection, onClick }) => {
	const [parentSection, setParentSection] = useState<Section | null>(null);

	useEffect(() => {
		const fetchParentSection = async () => {
			if (selectedSection && selectedSection.parent_id) {
				const parent = await getSectionById(selectedSection.parent_id);
				setParentSection(parent as Section);
			} else {
				setParentSection(null);
			}
		};
		fetchParentSection();
	}, [selectedSection]);

	return (
		<>
			<h2 className={styles.title}>{selectedSection?.name || 'Все разделы'}</h2>
			{selectedSection && (
				<div>
					<BackButton onClick={() => onClick(parentSection!)} />
				</div>
			)}
		</>
	);
};

export default NavigationBar;
