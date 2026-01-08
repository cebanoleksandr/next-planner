'use client';

import { FC, ReactNode, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Alert from "../UI/Alert";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { AdjustmentsHorizontalIcon, CalendarIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { ISidebarItem } from "@/utils/interfaces";
import { useKeycloak } from "@react-keycloak/web";
import { apiClient } from "@/api";
import { useGetGoalTypesQuery } from "@/react-query/queries/goalTypesQueries/useGetGoalTypesQuery";
import { setSidebarItems } from "@/storage/sidebarItemsSlice";
import { getSidebarOptions } from "@/utils/helpers";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const { goalTypes } = useGetGoalTypesQuery();
  
  const dispatch = useAppDispatch();

  console.log('goalTypes', goalTypes);

  const getUser = async (id: string) => {
    // try {
    //   const response = await getUserById(id);
    //   console.log("Fetched user:", response);
    //   dispatch(setUserAC(response));
    // } catch (error) {
    //   dispatch(setAlertAC({ text: 'Cannot fetch user', mode: 'error' }));
    // }
  }

  useEffect(() => {
    console.log('initialized', initialized)
    console.log('authenticated', keycloak.authenticated)
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }

    if (!initialized) return;
    if (!keycloak.authenticated) return;
    
    apiClient.defaults.headers['Authorization'] = `Bearer ${keycloak.token}`;
    console.log("UserId:", keycloak.tokenParsed?.sub);

    if (!!keycloak.tokenParsed?.sub) {
      getUser(keycloak.tokenParsed?.sub);
    }
  }, [initialized, keycloak, keycloak.token]);

  // useEffect(() => {
  //   dispatch(setSidebarItems(getSidebarOptions(goalTypes)));
  // }, [goalTypes]);

  const options = useAppSelector((state) => state.sidebarItems.items);

  const sidebarItems: ISidebarItem[] = useMemo(() => [
    ...options,
    { id: 'dashboard', title: 'Dashboard', icon: Squares2X2Icon, href: '/' },
    { id: 'calendar', title: 'Calendar', icon: CalendarIcon, href: '/calendar' },
    { id: 'configuration', title: 'Configuration', icon: AdjustmentsHorizontalIcon, href: '/configuration' },
  ], [options]);

  return (

    <div className='flex min-h-screen w-full bg-gray-100'>
      <div className='hidden md:block md:w-64 md:shrink-0'>
        <Sidebar sidebarItems={sidebarItems} />
      </div>

      <div className='flex-1 min-w-0'>
        <Header sidebarItems={sidebarItems} />

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
