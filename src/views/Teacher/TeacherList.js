/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles, Dialog, Box, Button } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import _ from "lodash";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { TeacherCreateDialog } from "./TeacherCreateDialog";
import { TeacherDialogDelete } from "./TeacherDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTeacher,
  loadListTeacher,
  loadTeacher,
} from "../../redux/slice/teacherSlice";

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

export default function TeacherList() {
  const classes = useStyles();
  const { listTable } = useSelector(selectTeacher);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(loadListTeacher());
  };
  const getTeacher = async (id) => {
    await dispatch(loadTeacher(id));
  };

  const [openDialog, setDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    idTeacher: "",
  });
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
              <h4 className={classes.cardTitleWhite}>Danh sách giảng viên</h4>
              <Button
                onClick={() => {
                  setDialog(true);
                  getTeacher("");
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
                "Giảng Viên",
                "Trình độ học vấn",
                "Số điện thoại",
                "Email",
                "Đơn vị công tác",
                "Xem",
                "Xoá",
              ]}
              tableData={listTable}
              actionView={(id) => {
                setDialog({
                  state: "view",
                  open: true,
                  idTeacher: id,
                });
                getTeacher(id);
              }}
              actionDelete={(id) => {
                setOpenDeleteDialog({
                  open: true,
                  idTeacher: id,
                });
              }}
            />
          </CardBody>
        </Card>
      </GridItem>
      <TeacherCreateDialog
        open={openDialog}
        onClose={() => {
          setDialog(false);
          getData();
        }}
      />
      <TeacherDialogDelete
        open={openDeleteDialog.open}
        onClose={() => {
          setOpenDeleteDialog({
            open: false,
            idTeacher: "",
          });
          getData();
        }}
        idTeacher={openDeleteDialog.idTeacher}
      />
    </GridContainer>
  );
}
