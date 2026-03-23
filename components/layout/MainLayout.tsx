'use client';

import { FC, ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Alert from "../UI/Alert";
import { AdjustmentsHorizontalIcon, CalendarIcon, FlagIcon, ListBulletIcon, RectangleGroupIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { ISidebarItem } from "@/utils/interfaces";
import { useKeycloak } from "@react-keycloak/web";
import { apiClient } from "@/api";
import { useTranslations } from "next-intl";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  const t = useTranslations('Sidebar');
  const { keycloak, initialized } = useKeycloak();

  const getUser = async (id: string) => {}

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }

    if (!initialized) return;
    if (!keycloak.authenticated) return;
    
    apiClient.defaults.headers['Authorization'] = `Bearer ${keycloak.token}`;

    if (!!keycloak.tokenParsed?.sub) {
      getUser(keycloak.tokenParsed?.sub);
    }
  }, [initialized, keycloak, keycloak.token]);

  const sidebarItems: ISidebarItem[] = [
    { id: 'dashboard', title: t('dashboard'), icon: Squares2X2Icon, href: '/dashboard' },
    { id: 'calendar', title: t('calendar'), icon: CalendarIcon, href: '/calendar' },
    { id: 'configuration', title: t('configuration'), icon: AdjustmentsHorizontalIcon, href: '/configuration' },
  ];

  const options: ISidebarItem[] = [
    { id: 'aspects', title: t('lifeAspect'), icon: RectangleGroupIcon, href: '/aspects' },
    { id: 'goals', title: t('goals'), icon: FlagIcon, href: '/goals' },
    { id: 'subgoals', title: t('subGoals'), icon: ListBulletIcon, href: '/subgoals' },
  ]

  if (!initialized) {
    return null;
  }

  return (
    <div className='flex min-h-screen w-full bg-gray-100'>
      <div className='hidden md:block md:w-64 md:shrink-0'>
        <Sidebar sidebarItems={sidebarItems} options={options} />
      </div>

      <div className='flex-1 min-w-0'>
        <Header sidebarItems={sidebarItems} options={options} />

        <main>
          <div className='px-10 pt-20'>
            {children}
            <Alert />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout;
