/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ProjectDetail from "./ProjectDetail";
import { getProjectById, getAllTeacher, getStudent } from "service/Api";
import { ProjectProgress } from "./ProjectProgress";
import _ from "lodash";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function ProjectContainer() {
  const { params } = useRouteMatch();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({
    nameProject: "",
    idTeacher: "",
    nameTeacher: "",
    phoneTeacher: "",
    emailTeacher: "",
    workspaceTeacher: "",
    majors: "",
    idStudent: "",
    nameStudent: "",
    phoneStudent: "",
    emailStudent: "",
    projectContent: "",
    projectRequest: "",
  });
  const [listStudents, setListStudents] = useState([]);
  const [student, setStudent] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    majors: "",
  });

  const [teacher, setTeacher] = useState({
    id: "",
    name: "",
    level: "",
    phone: "",
    email: "",
    workspace: "",
  });
  const [listTeachers, setListTeacher] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const fetchListTeachers = async () => {
    const dataTeacher = await getAllTeacher();
    if (dataTeacher.status === 200) {
      const listDataTeacher = dataTeacher.data.map((value, key) => {
        return _.pick(value, [
          "id",
          "name",
          "level",
          "phone",
          "email",
          "workspace",
        ]);
      });
      setListTeacher(listDataTeacher);
    }
  };
  const fetchListStudents = async () => {
    const result = await getStudent();
    const data = result.data;
    const studentData = data.map((value, key) => {
      return _.pick(value, [
        "id",
        "name",
        "code",
        "birthday",
        "address",
        "phone",
        "email",
        "majors",
        "schoolYear",
      ]);
    });
    setListStudents(studentData);
  };

  const fetchProject = async () => {
    const dataProject = await getProjectById(params.id);
    if (dataProject.status === 200) {
      const data = dataProject.data;
      setProject((preState) => ({
        ...preState,
        nameProject: data.name,
        idTeacher: data.idTeacher,
        // nameTeacher: data.nameTeacher,
        // phoneTeacher: data.phoneTeacher,
        // emailTeacher: data.emailTeacher,
        // workspaceTeacher: data.workspaceTeacher,
        idStudent: data.idStudent,
        majors: data.majors,
        // nameStudent: data.nameStudent,
        // phoneStudent: data.phoneStudent,
        // emailStudent: data.emailStudent,
        projectContent: data.projectContent,
        projectRequest: data.projectRequest,
      }));
    }
  };

  useEffect(() => {
    fetchListTeachers();
    fetchListStudents();
  }, []);

  useEffect(() => {
    fetchProject();
    return () => {
      console.log("component umount");
    };
  }, [params.id, loading]);

  useEffect(() => {
    if (project.idTeacher !== "") {
      const teacher = _.filter(listTeachers, { id: project.idTeacher });
      setTeacher((preState) => ({
        ...preState,
        id: teacher[0].id,
        name: teacher[0].name,
        level: teacher[0].level,
        phone: teacher[0].phone,
        email: teacher[0].email,
        workspace: teacher[0].workspace,
      }));
      if (project.idStudent !== "") {
        const student = _.filter(listStudents, { id: project.idStudent });
        setStudent((preState) => ({
          ...preState,
          id: student[0].id,
          name: student[0].name,
          phone: student[0].phone,
          email: student[0].email,
        }));
      }
    }
  }, [listStudents, listTeachers, project]);

  const handleChangeSelectTeacher = (name, value) => {};

  const handleChangeSelectStudent = (name, value) => {};

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Chi tiết đồ án" {...a11yProps(0)} />
          <Tab label="Báo cáo đợt 1" {...a11yProps(1)} />
          <Tab label="Báo cáo đợt 2" {...a11yProps(2)} />
          <Tab label="Báo cáo đợt 3" {...a11yProps(3)} />
          <Tab label="Báo cáo đợt 4" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProjectDetail
            project={project}
            listTeachers={listTeachers}
            listStudents={listStudents}
            handleChangeTeacher={(name, value) => {
              handleChangeSelectTeacher(name, value);
            }}
            handleChangeStudent={(name, value) => {
              handleChangeSelectStudent(name, value);
            }}
            teacher={teacher}
            student={student}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ProjectProgress
            idProject={params.id}
            stage="stage1"
            title="đợt 1"
            nameStudent={project.nameStudent}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ProjectProgress
            idProject={params.id}
            stage="stage2"
            title="đợt 2"
            nameStudent={project.nameStudent}
          />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ProjectProgress
            idProject={params.id}
            stage="stage3"
            title="đợt 3"
            nameStudent={project.nameStudent}
          />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <ProjectProgress
            idProject={params.id}
            stage="stage4"
            title="đợt 4"
            nameStudent={project.nameStudent}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
