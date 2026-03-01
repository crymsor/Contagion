import React from 'react';
import Modal from 'react-modal';

const AiEvaluationModal = ({ isOpen, onRequestClose, evaluationResult }) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            position: 'relative',
            inset: 'auto',
            width: '90%',
            maxWidth: '500px',
            backgroundColor: '#020617',
            border: '1px solid #1e293b',
            padding: '0',
            borderRadius: '4px',
            color: '#f8fafc',
            overflow: 'hidden'
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="AI Evaluation Result"
            ariaHideApp={false}
        >
            <div className="border-b border-phantom p-4 flex justify-between items-center bg-obsidian">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-toxic shadow-[0_0_8px_#22C55E]"></div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-100">Neural Analysis Report</h2>
                </div>
                <button 
                    onClick={onRequestClose}
                    className="text-slate-500 hover:text-toxic transition-colors text-lg font-mono"
                >
                    [×]
                </button>
            </div>

            <div className="p-6 bg-abyss">
                {evaluationResult}
            </div>

            <div className="border-t border-phantom p-4 bg-obsidian flex justify-end">
                <button 
                    onClick={onRequestClose}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors"
                >
                    Close Terminal
                </button>
            </div>
        </Modal>
    );
};

export default AiEvaluationModal;