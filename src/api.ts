import axios from 'axios';

const API_BASE_URL = 'https://leary1337.pythonanywhere.com';

export interface Section {
  id: number;
  name: string;
  description: string;
  parent_id?: number;
}

export const getSections = async (parentId: number = 0): Promise<Section[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sections`, {
      params: { parent_id: parentId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw error;
  }
};

export const getSectionById = async (sectionId: number): Promise<Section> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sections/${sectionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching section:', error);
    throw error;
  }
};

export const createSection = async (section: Omit<Section, 'id'>): Promise<Section> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sections`, section);
    return response.data;
  } catch (error) {
    console.error('Error creating section:', error);
    throw error;
  }
};

export const updateSection = async (section: Section): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/sections/${section.id}`, section);
  } catch (error) {
    console.error('Error updating section:', error);
    throw error;
  }
};

export const deleteSection = async (sectionId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/sections/${sectionId}`);
  } catch (error) {
    console.error('Error deleting section:', error);
    throw error;
  }
};
