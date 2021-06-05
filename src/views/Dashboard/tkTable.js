import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import stylesTable from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles= makeStyles(stylesTable);

export function TkTableBody(props) {
    const { dataTable, stage } = props;
    const classesTable = useStyles();

    return (
        <TableRow className={classesTable.tableBodyRow}>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{stage}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkPlanState?.CHT}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkPlanState?.HT}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkPlanState?.VM}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttitudeStudy?.TC}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttitudeStudy?.VP}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttitudeStudy?.RTD}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttWithTeacher?.TX}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttWithTeacher?.KTX}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAttWithTeacher?.KG}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAbilityRate?.KNC}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAbilityRate?.CKN}</p>
            </TableCell>
            <TableCell className={classesTable.tableCell}>
                <p style={{ textAlign: 'center' }}>{dataTable.tkAbilityRate?.KNT}</p>
            </TableCell>
        </TableRow>
    );
}