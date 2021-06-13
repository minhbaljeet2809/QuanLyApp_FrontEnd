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
import { StudentDialog } from "./StudentDialog";
import { getStudent, deleteStudent } from "service/Api";
import { StudentDialogDelete } from "./StudentDeleteDialog";

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

export default function StudentList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openDialog, setDialog] = useState({
    state: "",
    open: false,
    idStudent: "",
  });
  const [openDialogDelete, setOpenDialogDelete] = useState({
    open: false,
    idStudent: "",
  });
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
      const newData = studentData.map((value) => {
        return Object.values(value);
      });
      setStudentList(newData);
    };
    fetchData();
    setLoading(false);
  }, [loading]);

  const handleDelete = async (id) => {
    setOpenDialogDelete({
      open: true,
      idStudent: id,
    });
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
              <h4 className={classes.cardTitleWhite}>Danh sách sinh viên</h4>
              <Button
                onClick={() => {
                  setDialog({
                    state: "create",
                    open: true,
                    idStudent: "",
                  });
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
                "Sinh viên",
                "MSV",
                "Ngày Sinh",
                "Địa chỉ",
                "Đt",
                "Email",
                "Chuyên Ngành",
                "Năm học",
                "Xem",
                "Xoá",
              ]}
              tableData={studentList}
              actionView={(id) => {
                setDialog({
                  state: "view",
                  open: true,
                  idStudent: id,
                });
              }}
              actionDelete={(id) => {
                handleDelete(id);
              }}
            />
          </CardBody>
        </Card>
      </GridItem>
      <StudentDialog
        open={openDialog.open}
        onClose={() => {
          setDialog({
            state: "",
            open: false,
            idStudent: "",
          });
          setLoading(true);
        }}
        state={openDialog.state}
        idStudent={openDialog.idStudent}
      />
      <StudentDialogDelete
        open={openDialogDelete.open}
        onClose={() => {
          setOpenDialogDelete({
            open: false,
            idStudent: "",
          });
          setLoading(true);
        }}
        idStudent={openDialogDelete.idStudent}
      />
    </GridContainer>
  );
}
