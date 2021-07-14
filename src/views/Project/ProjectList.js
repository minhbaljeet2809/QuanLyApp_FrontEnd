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
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useRouteMatch, useHistory } from "react-router-dom";
import { ProjectDialog } from "./Dialog/ProjectDialog";
import { ProjectDialogDelete } from "./Dialog/ProjectDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  loadList,
  selectProjectList,
} from "../../redux/slice/projectListSlice";
import { loadDetail } from "redux/slice/projectSlice";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    idProject: "",
  });
  const dispatch = useDispatch();
  const { listProject } = useSelector(selectProjectList);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await dispatch(loadList());
  };

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
                  dispatch(loadDetail());
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
              tableData={listProject}
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
            getData(true);
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
          getData(true);
        }}
      />
    </GridContainer>
  );
}
