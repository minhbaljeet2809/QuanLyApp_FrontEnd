/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Button, Box } from "@material-ui/core";
import Table from "components/Table/Table.js";
import _ from "lodash";
import { getProjectProgressLogs, deleteProjectProgressLog } from "service/Api";
import { ProjectProgressLogDialog } from "../Dialog/ProjectProgressLogDialog";

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

export function ProjectProgressLog(props) {
  const classes = useStyles();
  const { idProjectProgress, stage, nameStudent } = props;
  const [listProgressLogs, setListProgressLogs] = useState([]);
  const [openProgressLog, setOpenProgressLog] = useState({
    open: false,
    idLog: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const getListLogs = await getProjectProgressLogs(idProjectProgress);
    if (getListLogs.status === 200) {
      const listData = getListLogs.data.map((value, key) => {
        return _.pick(value, ["id", "content", "worker", "percent"]);
      });
      const newData = listData.map((value) => {
        return Object.values(value);
      });
      setListProgressLogs(newData);
    }
  };
  useEffect(() => {
    if (idProjectProgress) {
      fetchData();
    }
    setLoading(false);
  }, [idProjectProgress, loading]);

  const deleteLog = async (id) => {
    const deleteProgressLog = await deleteProjectProgressLog(id);
    if (deleteProgressLog.status === 200) {
      setLoading(true);
    }
  };

  return (
    <Card plain>
      <CardHeader plain color="primary">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h4 className={classes.cardTitleWhite}>Chi tiết báo cáo tiến độ</h4>
          <Button
            onClick={() => {
              setOpenProgressLog({
                open: true,
                idLog: "",
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
            "Công việc Đồ Án",
            "Sinh viên thực hiện",
            "Tiến độ(%)",
            "Chỉnh xửa",
            "Xoá",
          ]}
          tableData={listProgressLogs}
          actionView={(id) => {
            setOpenProgressLog({
              open: true,
              idLog: id,
            });
          }}
          actionDelete={(id) => {
            console.log("delete", { id: id });
            deleteLog(id);
          }}
        />
      </CardBody>
      <ProjectProgressLogDialog
        open={openProgressLog.open}
        onClose={() => {
          setOpenProgressLog({
            open: false,
            idLog: "",
          });
          setLoading(true);
        }}
        idProjectProgress={idProjectProgress}
        stage={stage}
        nameStudent={nameStudent}
        idLog={openProgressLog.idLog}
      />
    </Card>
  );
}
