'use client';

import { FC, Fragment } from 'react';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import Search from '../UI/Search';
import { ISidebarItem } from '@/utils/interfaces';

interface IProps {
  sidebarItems: ISidebarItem[];
  options: ISidebarItem[];
}

const Sidebar: FC<IProps> = ({ sidebarItems, options }) => {
  return (
    <div className="fixed flex flex-col justify-between left-0 top-0 w-64 h-screen p-2 bg-gray-800 z-2">
      <div>
        <Link href='/' className="text-yellow-500 font-bold text-3xl p-2 block">AXIS</Link>

        <Search className="w-full md:max-w-md mt-3" />

        <ul className="h-4/5 mb-2.5 mt-7 overflow-y-auto">
          {!!options.length && (
            <>
              {options.map((item) => (
                <SidebarItem key={item.title} item={item} />
              ))}

              <div className='w-full h-0.5 bg-gray-400 my-3'></div>
            </>
          )}

          {sidebarItems.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
