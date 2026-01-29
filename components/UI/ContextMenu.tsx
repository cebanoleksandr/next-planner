import React, { useEffect, useRef, ReactElement, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export interface IContextMenuItem {
  text: string;
  onSelect(e: MouseEvent, item: IContextMenuItem): void;
  color?: string;
  subItems?: IContextMenuItem[];
}

export interface IContextMenuProps {
  state: boolean;
  setState(state: boolean): void;
  children: ReactElement<{ onClick?: (event: React.MouseEvent) => void }>;
  items: IContextMenuItem[];
}

const ContextMenu: React.FC<IContextMenuProps> = ({ state, setState, children, items }) => {
  const activatorRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  function getPositions(activator: HTMLElement) {
    const positions = activator.getBoundingClientRect();

    return {
      top: `${positions.bottom + window.scrollY + 12}px`,
      left: `${positions.right + window.scrollX - 260}px`,
    };
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        state &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state, setState]);

  return (
    <Fragment>
      <div ref={activatorRef}>
        {children}
      </div>

      {createPortal(
        <AnimatePresence>
          {state && (
            <motion.div
              ref={optionsRef}
              className="absolute z-10 bg-gray-800 rounded-lg overflow-hidden shadow-xl w-64 border border-yellow-500"
              style={activatorRef.current ? getPositions(activatorRef.current) : {}}
              initial={{ opacity: 0, scale: 0.5, y: -50, x: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {items.map((item) => (
                <div
                  key={item.text}
                  style={{ color: item.color ?? '#fde047' }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 active:bg-gray-500 transition duration-300"
                  // onClick={() => {
                  //   item.onSelect(item);
                  //   setState(false);
                  // }}
                  onClick={(e) => {
                    e.stopPropagation(); // ВАЖЛИВО: зупиняємо спливання події
                    item.onSelect(e as any, item); // Передаємо і подію, і сам item
                    setState(false);
                  }}
                >
                  {item.text}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Fragment>
  );
};

export default ContextMenu;
