'use client';

import { FC, useState } from 'react';
import {
  Bars3Icon,
} from '@heroicons/react/24/solid';
import MobileMenu from './MobileMenu';
import Search from '../UI/Search';
import LogoutPopup from '../popups/LogoutPopup';
import { ISidebarItem } from '@/utils/interfaces';
import ContextMenu, { IContextMenuItem } from '../UI/ContextMenu';
import { useRouter } from 'next/navigation';
import keycloak from '@/keyckloak';
// import BaseButton from '../UI/BaseButton';
// import LogoutPopup from '../popups/LogoutPopup';
// import MobileMenu from './MobileMenu';
// import Input from '../UI/Input';

interface IProps {
  sidebarItems: ISidebarItem[];
}

const Header: FC<IProps> = ({ sidebarItems }) => {
  const router = useRouter();

  const [isLogoutPopupVisible, setIsLogoutPopupVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const handleUserLogout = () => {
    setIsLogoutPopupVisible(false);

    keycloak.logout();
  };

  const contextMenuOptions: IContextMenuItem[] = [
    { text: 'Profile', onSelect: () => router.push('/profile')},
    { text: 'Settings', onSelect: () => router.push('/settings')},
    { text: 'Logout', onSelect: () => setIsLogoutPopupVisible(true)},
  ];

  return (
    <header className='fixed left-0 md:left-64 right-0 top-0 z-10 py-4 px-10 flex items-center justify-between bg-gray-800 md:bg-gray-100'>
      <div className="flex items-center w-full gap-3">
        <Bars3Icon
          className="size-10 mr-3 text-white cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        />

        <Search className="w-full md:hidden" />
      </div>

      <ContextMenu
        state={isContextMenuOpen}
        setState={setIsContextMenuOpen}
        items={contextMenuOptions}
      >
        <div className='cursor-pointer' onClick={() => setIsContextMenuOpen(true)}>AVA</div>
      </ContextMenu>

      <LogoutPopup
        isVisible={isLogoutPopupVisible}
        onClose={() => setIsLogoutPopupVisible(false)}
        onLogout={handleUserLogout}
      />

      <MobileMenu
        sidebarItems={sidebarItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
