/* eslint-disable no-unused-vars */
import { makeStyles, Box, Button } from "@material-ui/core";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import axios from "axios";
import _ from "lodash";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { NewsDialog } from "./NewsDialog";

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

export default function NewsList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [openDialog, setOpenDialog] = useState({
    open: false,
    idNews: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8080/api/v1/news/getAll"
      );
      const data = result.data;
      const newsData = data.map((value, key) => {
        value["view"] = value["view"].toString();
        return _.pick(value, ["id", "title", "description", "view"]);
      });
      const newData = newsData.map((value) => {
        return Object.values(value);
      });
      setNewsList(newData);
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
              <h4 className={classes.cardTitleWhite}>Danh sách tin tức</h4>
              <Button
                onClick={() => {
                  setOpenDialog((pre) => ({
                    ...pre,
                    open: true,
                  }));
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
                "Tiêu đề",
                "Mô tả",
                "Lượt xem",
                "Chi tiết",
                "Xoá",
              ]}
              tableData={newsList}
              actionView={(id) => {
                setOpenDialog({
                  open: true,
                  idNews: id,
                });
              }}
            />
          </CardBody>
        </Card>
        <NewsDialog
          open={openDialog.open}
          onClose={() => {
            setOpenDialog({
              open: false,
              idNews: "",
            });
          }}
          idNews={openDialog.idNews}
        />
      </GridItem>
    </GridContainer>
  );
}
