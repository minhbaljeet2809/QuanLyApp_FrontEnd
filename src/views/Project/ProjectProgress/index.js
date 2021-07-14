/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";

// core components
import GridItem from "components/Grid/GridItem.js";
import { ProjectProgressLog } from "./ProjectProgressLog";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import { ProjectProgressDetail } from "./ProjectProgressDetail";
import { getProjectProgress, updateProjectProgress } from "service/Api";
import CardHeader from "components/Card/CardHeader.js";
import { ProjectProgressDialog } from "../Dialog/ProjectProgressDiaLog";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectProgress } from "redux/slice/projectProgressSlice";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export function ProjectProgress(props) {
  const classes = useStyles();
  const { idProject, stage, title, nameStudent } = props;
  const dispatch = useDispatch();
  const projectProgressDetail = useSelector(selectProjectProgress);
  const [update, setUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [openProgressDialog, setOpenProgressDialog] = useState(false);
  const [projectProgress, setProjectProgress] = useState({
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
        setProjectProgress((preState) => ({
          ...preState,
          id: data.id,
          stage: data.stage,
          studentRate: data.studentRate,
          teacherRate: data.teacherRate,
          attitudeStudy: data.attitudeStudy,
          attWithTeacher: data.attWithTeacher,
          abilityRate: data.abilityRate,
          planState: data.planState,
        }));
      }
    };
    fetchData();
    setLoading(false);
  }, [loading]);

  const handleUpdate = useCallback(async () => {
    console.log("projectProgress", { projectProgress: projectProgress });
    const updateProgress = await updateProjectProgress(
      projectProgress.id,
      projectProgress
    );
    console.log({ updateProgress: updateProgress });
    if (updateProgress.status === 200) {
      setLoading(true);
    }
  }, [projectProgress]);

  const createProgress = (
    <Box display="flex" justifyContent="center" alignItems="center" padding={5}>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenProgressDialog(true);
        }}
      >
        Tạo tiến độ
      </Button>
    </Box>
  );

  const viewBtn = useMemo(() => {
    if (!update) {
      return (
        <div>
          <Button
            onClick={() => {
              setUpdate(true);
            }}
            color="primary"
            variant="outlined"
          >
            Chỉnh sửa
          </Button>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          onClick={() => {
            setUpdate(false);
            handleUpdate();
          }}
          variant="outlined"
          style={{ color: "#FFF", backgroundColor: "green", marginRight: 10 }}
        >
          Cập nhật
        </Button>
        <Button
          onClick={() => {
            setUpdate(false);
          }}
          variant="outlined"
          style={{ color: "#FFF", backgroundColor: "red" }}
        >
          Huỷ
        </Button>
      </div>
    );
  }, [update, projectProgress]);

  const handleChangeSelect = (name, value) => {
    setProjectProgress((state) => ({ ...state, [name]: value }));
  };

  const handleChangeInput = (name, value) => {
    setProjectProgress((state) => ({ ...state, [name]: value }));
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <ProjectProgressLog
          idProjectProgress={projectProgress.id}
          nameStudent={nameStudent}
        />
        <Card plain>
          <CardHeader plain color="primary">
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <h4 className={classes.cardTitleWhite}>
                Đánh giá tiến độ {title}
              </h4>
            </Box>
          </CardHeader>
          {projectProgress.id === "" ? (
            createProgress
          ) : (
            <ProjectProgressDetail
              progress={projectProgress}
              update={update}
              changeInput={handleChangeInput}
              changeSelect={handleChangeSelect}
            />
          )}
          {viewBtn}
        </Card>
        <ProjectProgressDialog
          open={openProgressDialog}
          onClose={() => {
            setOpenProgressDialog(false);
            setLoading(true);
          }}
          stage={stage}
          idProject={idProject}
        />
      </GridItem>
    </GridContainer>
  );
}
