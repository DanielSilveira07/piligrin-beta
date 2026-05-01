import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const openLeadModal = () => {
    setIsLeadModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <ModalContext.Provider value={{ 
      isLeadModalOpen, 
      openLeadModal, 
      closeLeadModal 
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

