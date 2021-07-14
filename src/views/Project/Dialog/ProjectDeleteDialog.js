/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProjectById, deleteProject } from "service/Api";

export function ProjectDialogDelete(props) {
  const { open, onClose, idProject } = props;
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (idProject !== "") {
        const isCheck = await getProjectById(idProject);
        console.log(isCheck.data.state);
        if (isCheck.data.state === false) {
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
  }, [idProject]);

  const handleDelete = async () => {
    const actionDelete = await deleteProject(idProject);
    if (actionDelete.status === 200) {
      alert("Xoá thành công");
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {!check
          ? "Không thể xoá, đề tài đã có sinh viên đăng ký"
          : "Xác nhận xoá đề tài"}
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
            Xoá đề tài
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
