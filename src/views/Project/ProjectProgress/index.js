import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import { ProjectProgressLog } from './ProjectProgressLog';
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import { ProjectProgressDetail } from './ProjectProgressDetail';
import { getProjectProgress } from 'service/Api';
import CardHeader from "components/Card/CardHeader.js";
import { ProjectProgressDialog } from '../Dialog/ProjectProgressDiaLog';

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export function ProjectProgress(props) {
    const classes = useStyles();
    const { idProject, stage, title } = props;
    const [loading, setLoading] = useState(false);
    const [openProgressDialog, setOpenProgressDialog] = useState(false);
    const [projectProgress, setProjectLog] = useState({
        id: "",
        stage: "",
        studentRate: "",
        teacherRate: "",
        attitudeStudy: "",
        attWithTeacher: "",
        abilityRate: "",
        planState: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const dataProjectProgress = await getProjectProgress(idProject, stage);
            if (dataProjectProgress.status === 200) {
                const data = dataProjectProgress.data;
                setProjectLog((preState) => ({
                    ...preState,
                    id: data.id,
                    stage: data.stage,
                    studentRate: data.studentRate,
                    teacherRate: data.teacherRate,
                    attitudeStudy: data.attitudeStudy,
                    attWithTeacher: data.attWithTeacher,
                    abilityRate: data.abilityRate,
                    planState: data.planState,
                }))
            }
        }
        fetchData();
        setLoading(false);

        return () => { }
    }, [loading]);

    const createProgress = (
        <Box display="flex" justifyContent="center" alignItems="center" padding={5}>
            <Button variant="outlined" onClick={() => { setOpenProgressDialog(true) }}>
                Tạo tiến độ
            </Button>
        </Box>)

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <ProjectProgressLog idProjectProgress={projectProgress.id} />
                <Card plain>
                    <CardHeader plain color="primary">
                        <Box display="flex" justifyContent="flex-start" alignItems="center" >
                            <h4 className={classes.cardTitleWhite}>
                                Đánh giá tiến độ {title}
                            </h4>
                        </Box>
                    </CardHeader>
                    {
                        projectProgress.id === "" ?
                            createProgress :
                            <ProjectProgressDetail projectProgress={projectProgress} />
                    }
                </Card>
                <ProjectProgressDialog
                    open={openProgressDialog}
                    onClose={() => { 
                        setOpenProgressDialog(false)
                        setLoading(true);
                    }}
                    stage={stage}
                    idProject={idProject}
                />
            </GridItem>
        </GridContainer>
    );
}