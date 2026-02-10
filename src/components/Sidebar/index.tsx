import {
  AppsOutline,
  GridOutline,
  HomeOutline,
  LogOutOutline,
  PeopleOutline,
  PieChartOutline,
  // NewspaperOutline, // removido, não usado
  // NotificationsOutline, // removido, não usado
} from "react-ionicons";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    {
      title: "Home",
      icon: <HomeOutline color="#555" width="22px" height="22px" />,
      path: "/",
    },
    {
      title: "Boards",
      icon: <AppsOutline color="#555" width="22px" height="22px" />,
      path: "/boards",
    },
    {
      title: "Projects",
      icon: <GridOutline color="#555" width="22px" height="22px" />,
      path: "/projects",
    },
    {
      title: "Analytics",
      icon: <PieChartOutline color="#555" width="22px" height="22px" />,
      path: "/analytics",
    },
    {
      title: "Workflows",
      icon: <PeopleOutline color="#555" width="22px" height="22px" />,
      path: "/workflows",
    },
  ];

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
      {/* Logo */}
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-white">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">Logo.</span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">L.</span>
      </div>

      {/* Links de navegação */}
      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-white py-5 md:px-3 px-3 relative">
        {navLinks.map((link) => {
          const isActive = link.path !== "#" && location.pathname === link.path;
          return (
            <div
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
                isActive ? "bg-orange-300" : "bg-transparent"
              }`}
              onClick={() => link.path !== "#" && navigate(link.path)}
            >
              {link.icon}
              <span className="font-medium text-[15px] md:block hidden">{link.title}</span>
            </div>
          );
        })}

        {/* Log Out */}
        <div
          className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <LogOutOutline color="#555" width="22px" height="22px" />
          <span className="font-medium text-[15px] md:block hidden">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
