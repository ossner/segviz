import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        },
        content: {
            position: 'relative',
            inset: 'auto',
            width: '90%',
            maxWidth: '750px',
            maxHeight: '85vh',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '12px',
            outline: 'none',
            padding: 0,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
    } as const;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Metric Information Modal"
            closeTimeoutMS={200}
        >
            {/* Modal Header */}
            <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                background: 'white',
                zIndex: 10
            }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>{title}</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        padding: '0 5px',
                        lineHeight: 1
                    }}
                    title="Close Modal (Esc)"
                >
                    &times;
                </button>
            </div>

            {/* Modal Body - Where the rich React Nodes render */}
            <div style={{ padding: '0rem 1.5rem 1rem', color: '#334155', lineHeight: 1.6 }}>
                {children}
            </div>

            {/* Modal Footer (Optional, good for actions) */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', background: '#f8fafc' }}>
                <button
                    onClick={onClose}
                    style={{ padding: '8px 16px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, color: '#475569' }}
                >
                    Got it
                </button>
            </div>
        </Modal>
    );
};