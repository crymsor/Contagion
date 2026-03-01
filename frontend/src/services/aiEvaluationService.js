// aiEvaluationService.js

// This service layer manages AI evaluation data

import axios from 'axios';

const API_URL = 'https://api.example.com/evaluations';

// Fetch evaluations
export const fetchEvaluations = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        throw error;
    }
};

// Add a new evaluation
export const addEvaluation = async (evaluationData) => {
    try {
        const response = await axios.post(API_URL, evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error adding evaluation:', error);
        throw error;
    }
};

// Update an existing evaluation
export const updateEvaluation = async (id, evaluationData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error updating evaluation:', error);
        throw error;
    }
};

// Delete an evaluation
export const deleteEvaluation = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting evaluation:', error);
        throw error;
    }
};
