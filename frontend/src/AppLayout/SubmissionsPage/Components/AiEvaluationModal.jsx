import React from 'react';
import Modal from 'react-modal';

const AiEvaluationModal = ({ isOpen, onRequestClose, evaluationResult }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>AI Evaluation Result</h2>
            <div>{evaluationResult}</div>
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default AiEvaluationModal;