/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles, Box, Button } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import _ from "lodash";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useRouteMatch, useHistory } from "react-router-dom";
import { ProjectDialog } from "./Dialog/ProjectDialog";
import { getAllProject } from "service/Api";
import { ProjectDialogDelete } from "./Dialog/ProjectDeleteDialog";

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

export default function ProjectList() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    idProject: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProject();
      const data = result.data;
      const projectData = data.map((value, key) => {
        if (value["nameStudent"] == "" || value["nameStudent"] == null) {
          value["nameStudent"] = "Chưa có sinh viên đăng ký";
        }
        return _.pick(value, [
          "id",
          "name",
          "majors",
          "nameTeacher",
          "nameStudent",
        ]);
      });
      const newData = projectData.map((value) => {
        return Object.values(value);
      });
      setProjectList(newData);
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4 className={classes.cardTitleWhite}>Danh sách đồ án</h4>
              <Button
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <AddBoxIcon />
              </Button>
            </Box>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "TT",
                "Đề Tài",
                "Chuyên Ngành",
                "Giáo Viên Hướng Dẫn",
                "Sinh Viên Đăng ký",
                "Xem",
                "Xoá",
              ]}
              tableData={projectList}
              actionView={(id) => {
                history.push(`${path}/${id}`);
              }}
              actionDelete={(id) => {
                setOpenDeleteDialog({
                  open: true,
                  idProject: id,
                });
              }}
            />
          </CardBody>
        </Card>
        <ProjectDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setLoading(true);
          }}
        />
      </GridItem>
      <ProjectDialogDelete
        open={openDeleteDialog.open}
        idProject={openDeleteDialog.idProject}
        onClose={() => {
          setOpenDeleteDialog({
            open: false,
            idProject: "",
          });
          setLoading(true);
        }}
      />
    </GridContainer>
  );
}
