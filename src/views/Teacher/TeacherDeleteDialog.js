/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { deleteTeacher, checkTeacher } from "service/Api";

export function TeacherDialogDelete(props) {
  const { open, onClose, idTeacher } = props;
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (idTeacher !== "") {
        const isCheck = await checkTeacher(idTeacher);
        console.log(isCheck);
        if (isCheck.status === 200) {
          setCheck(true);
        } else {
          setCheck(false);
        }
      }
    };
    fetch();
    return () => {
      setCheck(false);
    };
  }, [idTeacher]);

  const handleDelete = async () => {
    const actionDelete = await deleteTeacher(idTeacher);
    if (actionDelete.status === 200) {
      alert("Xoá thành công");
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {!check
          ? "Không thể xoá, giảng viên đang hướng dẫn đề tài"
          : "Xác nhận xoá giảng viên"}
      </DialogTitle>
      {!check ? (
        ""
      ) : (
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
            color="primary"
          >
            Huỷ
          </Button>
          <Button onClick={handleDelete} color="primary">
            Xoá giảng viên
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
