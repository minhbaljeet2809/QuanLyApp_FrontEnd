/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import BookIcon from "@material-ui/icons/Book";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import GroupIcon from "@material-ui/icons/Group";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import NewsList from "views/News/news";
import TeacherList from "views/Teacher/TeacherList";
import StudentList from "views/Student/StudentList";
import Project from "views/Project/Project";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "Danh sách tin tức",
    icon: AnnouncementIcon,
    component: NewsList,
    layout: "/admin",
  },
  {
    path: "/teacher",
    name: "Danh sách giáo viên",
    icon: Person,
    component: TeacherList,
    layout: "/admin",
  },
  {
    path: "/student",
    name: "Danh sách sinh viên",
    icon: GroupIcon,
    component: StudentList,
    layout: "/admin",
  },
  {
    path: "/project",
    name: "Danh sách đồ án",
    icon: LibraryBooks,
    component: Project,
    layout: "/admin",
  },
];

export default dashboardRoutes;
