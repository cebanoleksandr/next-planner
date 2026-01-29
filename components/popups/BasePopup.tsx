'use client';

import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BasePopup: FC<IProps> = ({ isVisible, onClose, children }) => {
  if (typeof document === 'undefined') return null; // SSR-safe

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-zinc-900/40 z-10"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-120 m-0
                       rounded-xl p-4 bg-gray-800 z-50 shadow-lg"
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BasePopup;
