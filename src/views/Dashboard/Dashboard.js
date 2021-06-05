import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { getTkProject, getTkStudent, getTkProgress } from "service/Api";

import {
  emailsSubscriptionChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesTable from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { TkTableBody } from "./tkTable";

const useStyles = makeStyles(styles);
const useStylesTable = makeStyles(stylesTable);

export default function Dashboard() {
  const classes = useStyles();
  const classesTable = useStylesTable();
  const [tkProject, setTkProject] = useState({
    countProject: "",
    countProjectRegis: ""
  });
  const [tkStudent, setTkStudent] = useState({
    countStudent: "",
    countStudentRegis: ""
  });

  const [tkProgressStage1, setTkProgressStage1] = useState({});
  const [tkProgressStage2, setTkProgressStage2] = useState({});
  const [tkProgressStage3, setTkProgressStage3] = useState({});
  const [tkProgressStage4, setTkProgressStage4] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const dataTkProject = await getTkProject();
      const dataTkStudent = await getTkStudent();
      const dataTkProgressStage1 = await getTkProgress('stage1');
      const dataTkProgressStage2 = await getTkProgress('stage2');
      const dataTkProgressStage3 = await getTkProgress('stage3');
      const dataTkProgressStage4 = await getTkProgress('stage4');

      if (dataTkProject.status === 200) {
        setTkProject({
          countProject: dataTkProject.data.countProject,
          countProjectRegis: dataTkProject.data.countProjectRegis
        });
      }
      if (dataTkStudent.status === 200) {
        setTkStudent({
          countStudent: dataTkStudent.data.countStudent,
          countStudentRegis: dataTkStudent.data.countProjectRegis
        });
      }
      if (dataTkProgressStage1.status === 200) {
        const data = dataTkProgressStage1.data
        setTkProgressStage1((pre) => ({
          tkPlanState: data.tkPlanState,
          tkAttitudeStudy: data.tkAttitudeStudy,
          tkAttWithTeacher: data.tkAttWithTeacher,
          tkAbilityRate: data.tkAbilityRate
        }));
      }
      if (dataTkProgressStage2.status === 200) {
        const data = dataTkProgressStage2.data
        setTkProgressStage2((pre) => ({
          tkPlanState: data.tkPlanState,
          tkAttitudeStudy: data.tkAttitudeStudy,
          tkAttWithTeacher: data.tkAttWithTeacher,
          tkAbilityRate: data.tkAbilityRate
        }));
      }
      if (dataTkProgressStage3.status === 200) {
        const data = dataTkProgressStage3.data
        setTkProgressStage3((pre) => ({
          tkPlanState: data.tkPlanState,
          tkAttitudeStudy: data.tkAttitudeStudy,
          tkAttWithTeacher: data.tkAttWithTeacher,
          tkAbilityRate: data.tkAbilityRate
        }));
      }
      if (dataTkProgressStage4.status === 200) {
        const data = dataTkProgressStage4.data
        setTkProgressStage4((pre) => ({
          tkPlanState: data.tkPlanState,
          tkAttitudeStudy: data.tkAttitudeStudy,
          tkAttWithTeacher: data.tkAttWithTeacher,
          tkAbilityRate: data.tkAbilityRate
        }));
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Thống kê danh sách đồ án đã được đăng ký</p>
              <h3 className={classes.cardTitle}>{tkProject.countProjectRegis}/{tkProject.countProject} </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                cập nhật liên tục
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Thống kê danh sách sinh viên đăng ký đồ án</p>
              <h3 className={classes.cardTitle}>{tkStudent.countStudentRegis}/{tkStudent.countStudent}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                cập nhật liên tục
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <h3>Thống kê tiến độ đồ án</h3>
            </CardHeader>
            <CardBody>
              <div className={classesTable.tableResponsive}>
                <Table className={classesTable.table}>
                  <TableHead className={classesTable.TableHeader}>
                    <TableRow className={classesTable.tableHeadRow} >
                      <TableCell rowSpan={2} className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Đợt / số lượng</p>
                      </TableCell>
                      <TableCell colSpan={3} className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Mức độ hoàn thành kế hoạch đồ án</p>
                      </TableCell>
                      <TableCell colSpan={3} className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Thái độ sinh viên trong việc nghiên cứu tài liệu</p>
                      </TableCell>
                      <TableCell colSpan={3} className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Thái độ sinh viên trong việc trao đổi với giảng viên</p>
                      </TableCell>
                      <TableCell colSpan={3} className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Khả năng hoàn thành đồ án</p>
                      </TableCell>
                    </TableRow>
                    <TableRow className={classesTable.tableHeadRow} >
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Chưa hoàn thành</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Hoàn thành</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Hoành thành vượt mức</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Tích cực</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Vừa phải</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Rất thụ động</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Thường xuyên</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Không thường xuyên</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Không gặp</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Khả năng cao</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Có khả năng</p>
                      </TableCell>
                      <TableCell className={classesTable.tableCell + " " + classesTable.tableHeadCell}>
                        <p style={{ textAlign: 'center' }}>Khả năng thấp</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TkTableBody
                      dataTable={tkProgressStage1}
                      stage="Đợt 1"
                    />
                    <TkTableBody
                      dataTable={tkProgressStage2}
                      stage="Đợt 2"
                    />
                    <TkTableBody
                      dataTable={tkProgressStage3}
                      stage="Đợt 3"
                    />
                    <TkTableBody
                      dataTable={tkProgressStage4}
                      stage="Đợt 4"
                    />
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
