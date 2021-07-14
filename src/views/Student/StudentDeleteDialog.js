/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { deleteStudent } from "service/Api";

export function StudentDialogDelete(props) {
  const { open, onClose, idStudent } = props;
  const handleDelete = async () => {
    const actionDelete = await deleteStudent(idStudent);
    if (actionDelete.status === 200) {
      alert("Xoá thành công");
    }
    if (actionDelete.status === 202) {
      alert(`${actionDelete.data.message}`);
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle> Xác nhận xoá sinh viên</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            console.log("Huỷ");
            onClose();
          }}
          color="primary"
        >
          Huỷ
        </Button>
        <Button onClick={handleDelete} color="primary">
          Xoá sinh viên
        </Button>
      </DialogActions>
    </Dialog>
  );
}
