import { RouteObject } from "react-router";
import React from "react";

const Layout = React.lazy(() => import("../layout"));
const Boards = React.lazy(() => import("../pages/Boards"));
const Projects = React.lazy(() => import("../pages/Projects"));
const Workflows = React.lazy(() => import("../pages/Workflows"));
const WorkflowDetail = React.lazy(() => import("../pages/Workflows/Detail"));
const Analytics = React.lazy(() => import("../pages/Analytics"));
const Home = React.lazy(() => import("../pages/Home"));
const MeuPerfil = React.lazy(() => import("../pages/MeuPerfil"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Login = React.lazy(() => import("../pages/Login"));
const Cadastro = React.lazy(() => import("../pages/Cadastro"));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const token = localStorage.getItem("token");
	if (!token) {
		window.location.href = "/login";
		return null;
	}
	return <>{children}</>;
};

const routes: RouteObject[] = [
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/cadastro",
		element: <Cadastro />,
	},
	{
		path: "/",
		element: <ProtectedRoute><Layout /></ProtectedRoute>,
		children: [
			{ path: "", element: <Home /> },
			{ path: "boards", element: <Boards /> },
			{ path: "projects", element: <Projects /> },
			{ path: "analytics", element: <Analytics /> },
			{ path: "workflows", element: <Workflows /> },
			{ path: "workflows/:id", element: <WorkflowDetail /> },
			{ path: "meu-perfil", element: <MeuPerfil /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];

export default routes;
// import React from "react";

// const Layout = React.lazy(() => import("../layout"));



// const Boards = React.lazy(() => import("../pages/Boards"));
// const Projects = React.lazy(() => import("../pages/Projects"));
// const Workflows = React.lazy(() => import("../pages/Workflows"));
// const WorkflowDetail = React.lazy(() => import("../pages/Workflows/Detail"));
// const Analytics = React.lazy(() => import("../pages/Analytics"));
// const Home = React.lazy(() => import("../pages/Home"));

// const MeuPerfil = React.lazy(() => import("../pages/MeuPerfil"));
// const NotFound = React.lazy(() => import("../pages/NotFound"));





// const routes: RouteObject[] = [
// 	{
// 		path: "/",
// 		element: <Layout />,
// 		children: [
// 			{
// 				path: "",
// 				element: <Home />,
// 			},
// 			{
// 				path: "boards",
// 				element: <Boards />,
// 			},
// 			{
// 				path: "projects",
// 				element: <Projects />,
// 			},
// 			{
// 				path: "analytics",
// 				element: <Analytics />,
// 			},
// 			{
// 				path: "workflows",
// 				element: <Workflows />,
// 			},
// 			{
// 				path: "workflows/:id",
// 				element: <WorkflowDetail />,
// 			},
// 			   {
// 				   path: "meu-perfil",
// 				   element: <MeuPerfil />,
// 			   },
// 			   {
// 				   path: "*",
// 				   element: <NotFound />,
// 			   },
// 		],
// 	},
// ];

// export default routes;
