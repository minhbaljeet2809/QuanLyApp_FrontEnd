import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ProjectDetail from './ProjectDetail';
import { getProjectById } from 'service/Api';
import { ProjectProgress } from './ProjectProgress';

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
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
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
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}));


export default function ProjectContainer() {
    const { params } = useRouteMatch();
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [project, setProject] = useState({
        nameProject: "",
        nameTeacher: "",
        phoneTeacher: "",
        emailTeacher: "",
        workspaceTeacher: "",
        majors: "",
        nameStudent: "",
        phoneStudent: "",
        emailStudent: "",
        projectContent: "",
        projectRequest: "",
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        const fetchProject = async () => {
            const dataProject = await getProjectById(params.id);
            if (dataProject.status === 200) {
                const data = dataProject.data;
                setProject((preState) => ({
                    ...preState,
                    nameProject: data.name,
                    nameTeacher: data.nameTeacher,
                    phoneTeacher: data.phoneTeacher,
                    emailTeacher: data.emailTeacher,
                    workspaceTeacher: data.workspaceTeacher,
                    majors: data.majors,
                    nameStudent: data.nameStudent,
                    phoneStudent: data.phoneStudent,
                    emailStudent: data.emailStudent,
                    projectContent: data.projectContent,
                    projectRequest: data.projectRequest,
                }))
            }
        }
        fetchProject();

        return () => {
            console.log("component umount")
        }
    }, [params.id]);

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
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProjectDetail project={project} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ProjectProgress idProject={params.id} stage="stage1" title="đợt 1" nameStudent={project.nameStudent} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <ProjectProgress idProject={params.id} stage="stage2" title="đợt 2" nameStudent={project.nameStudent} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <ProjectProgress idProject={params.id} stage="stage3" title="đợt 3" nameStudent={project.nameStudent} />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <ProjectProgress idProject={params.id} stage="stage4" title="đợt 4" nameStudent={project.nameStudent} />
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}