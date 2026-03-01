import React, { useState } from 'react';
// import Header from '../components/header/Index';
// import SidebarAdmin from '../components/sidebar/Index';
// import { DefaultLayoutAdminProps } from '../../../types/layout-admin';
import { DefaultLayoutAdminProps } from '@/types/layout-admin';
// import Sidebar from '@/components/Sidebar';
import Sidebar from '../components/sidebar';
// import Header from '@/pages/admin/header/Index';
import Header from '@/components/header';

// import Trigger from '../components/Trigger';



const DefaultLayoutAdmin: React.FC<DefaultLayoutAdminProps> = ({ children, Heading, text, Headingb, orgName, orgProfilePic, personalName, personalProfilePic, logoUrl }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dark:bg-bodydark1 bg-gray-100 dark:text-textWhite">
      <div className="flex h-screen overflow-hidden">
        {/* <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} orgName={orgName} orgProfilePic={orgProfilePic} logoUrl={logoUrl} /> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header Heading={Heading} text={text} Headingb={Headingb} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} orgName={orgName} orgProfilePic={orgProfilePic} personalName={personalName} personalProfilePic={personalProfilePic} />
          <main>
            <div className=" max-w-screen-7xl ">
              {children}

            </div>
          </main>

        </div>
        {/* <Trigger /> */}
      </div>
    </div>
  );
};

export default DefaultLayoutAdmin;
