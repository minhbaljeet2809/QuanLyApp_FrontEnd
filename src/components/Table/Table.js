import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RegularButton from "components/CustomButtons/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    actionView,
    actionDelete,
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((propRow, keyRow) => {
            const id = propRow[0];
            return (
              <TableRow key={keyRow} className={classes.tableBodyRow}>
                {propRow.map((prop, key) => {
                  if (key === 0) {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {keyRow + 1}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.tableCell} id-row={propRow[0]}>
                  <RegularButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      actionView(id);
                    }}
                  >
                    <VisibilityIcon />
                  </RegularButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <RegularButton
                    size="sm"
                    color="danger"
                    onClick={() => {
                      actionDelete(id);
                    }}
                  >
                    <DeleteIcon />
                  </RegularButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
