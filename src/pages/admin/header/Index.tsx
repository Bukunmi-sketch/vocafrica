/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { IoMenuOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { Crown, Mail, Sparkles } from 'lucide-react';




interface HeaderAdminProps {
  Heading?: string | React.ReactNode
  text?: string;
  Headingb?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  orgName?: string;
  orgProfilePic?: string;
  personalName?: string;
  personalProfilePic?: string;
}

const Header: React.FC<HeaderAdminProps> = ({ Heading, text, Headingb, sidebarOpen, setSidebarOpen, orgName, orgProfilePic, personalProfilePic, personalName }) => {

  const userDetails = {
  picture:"",
  role:"",
  first_name:"",
  last_name:"",
  organization:{
    name:"",
  }
}

function Logout (){
  
}

  // const { setUserDetails, userDetails, } = useAuth()
  const navigate = useNavigate();
  const [displayOrgName, setDisplayOrgName] = useState(personalName || userDetails?.organization?.name || "")
  const [displayProfilePic, setDisplayProfilePic] = useState(personalProfilePic || userDetails?.picture || "/null.png");

  // useEffect(() => {
  //   setDisplayOrgName(personalName || userDetails?.organization?.name || "")

  //   if (personalProfilePic && userDetails) {
  //     setUserDetails({
  //       ...userDetails,
  //       picture: personalProfilePic,
  //     });
  //   }

  //   setDisplayProfilePic(personalProfilePic || userDetails?.picture || "/null.png")
  // }, [personalName, personalProfilePic])


  return (
    <header className="sticky top-0 z-999 flex w-full bg-white border-gray-200 drop-shadow-1 dark:bg-bodydark dark:border dark:border-strokedark dark:drop-shadow-none  border-b">
      <div className="flex flex-grow items-center justify-between  px-4 py-3 md:py-1 md:px-6 2xl:px-11 ">
        <div className="flex items-center gap-2 w-20 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button aria-controls="sidebar" onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }} className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden" >
            <IoMenuOutline className='text-xl' />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <div className=" mr-1">
              <img src="/images/logo/logo.png" alt="Logo" className="w-8" />
            </div>
          </Link>
        </div>



        <div className="hidden sm:block xl:ml-3 2xl:-ml-3">
          <h1 className="text-sm font-semibold text-primary ">{Heading} <span className='text-gray-900'>{Headingb}</span> </h1>
          <span className='font-normal text-xs dark:text-textWhite'>{text} </span>
        </div>



        <div className="flex items-center gap-3 2xsm:gap-7 ">
          {/* {(userDetails?.is_administrator &&
            (userDetails?.subscription_name === "Standard" ||
              userDetails?.subscription_name === "Business+")) && (
              <button
                onClick={() => navigate("/admin/subscription")}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-500 text-white px-3 py-2 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade Plan
              </button>
            )} */}


          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <DropdownNotification /> */}
            <li>
              {/* <DropdownNotification /> */}
            </li>
            <li>
              <Link to='/admin/messages'>
                <button
                  className="flex items-center justify-center p-2 border-gray-200 rounded-full border bg-gray transition-colors dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  aria-label="Messages"
                >
                  <Mail size={18} />
                </button>
              </Link>
            </li>
          </ul>


          {/* <!-- User Area --> */}
          <DropdownUser orgName={orgName} orgProfilePic={orgProfilePic} personalName={personalName} personalProfilePic={personalProfilePic} />
          {/* <!-- User Area --> */}
        </div>


      </div>
    </header>
  );
};

export default Header;
