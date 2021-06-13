/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
  createMuiTheme,
  Box,
} from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { getTeacherByID, createTeacher, updateTeacher } from "service/Api";

const theme = createMuiTheme({
  overrides: {},
});

export function TeacherCreateDialog(props) {
  const { open, onClose, state, idTeacher } = props;
  const [teacher, setTeacher] = useState({
    name: "",
    level: "",
    birthday: "",
    address: "",
    phone: "",
    email: "",
    image: "",
    workspace: "",
    description: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const [stateDialog, setStateDialog] = useState("");
  useEffect(() => {
    setStateDialog(state);
    const fetchData = async () => {
      const getTeacher = await getTeacherByID(idTeacher);
      if (getTeacher.status === 200) {
        const data = getTeacher.data;
        setTeacher((state) => ({
          ...state,
          name: data.name,
          level: data.level,
          birthday: data.birthday,
          address: data.address,
          phone: data.phone,
          email: data.email,
          image: data.image,
          workspace: data.workspace,
          description: data.description,
        }));
      }
    };
    if (state === "view" && idTeacher) {
      setReadOnly(true);
      fetchData();
    }
    if (state === "create") {
      setTeacher({
        name: "",
        level: "",
        birthday: "",
        address: "",
        phone: "",
        email: "",
        image: "",
        workspace: "",
        description: "",
      });
      setReadOnly(false);
    }
  }, [state, idTeacher]);

  const handleChangeInput = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setTeacher((state) => ({ ...state, [inputName]: value }));
  };

  const handleCreate = async () => {
    const create = await createTeacher(teacher);
    if (create.status === 200) {
      alert("Tạo thành công");
    }
    onClose();
  };

  const handleUpdate = async () => {
    const update = await updateTeacher(idTeacher, teacher);
    if (update.status === 200) {
      alert("Cập nhật thành công");
    }
    onClose();
  };

  const viewTitle = useMemo(() => {
    if (stateDialog === "view") {
      return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Chi tiết giảng viên
          <Button
            onClick={() => {
              setStateDialog("update");
              setReadOnly(false);
            }}
          >
            cập nhật
            <EditIcon />
          </Button>
        </Box>
      );
    }

    if (stateDialog === "create") {
      return <span>Tạo mới giảng viên</span>;
    }
    if (stateDialog === "update") {
      return <span>Cập nhật giảng viên</span>;
    }
  }, [stateDialog]);

  const viewAction = useMemo(() => {
    if (stateDialog === "create") {
      return (
        <>
          <Button onClick={onClose} color="primary">
            Đóng
          </Button>
          <Button onClick={handleCreate} color="primary">
            Tạo mới
          </Button>
        </>
      );
    }
    if (stateDialog === "view") {
      return (
        <>
          <Button onClick={onClose} color="primary">
            Đóng
          </Button>
        </>
      );
    }
    if (stateDialog === "update") {
      return (
        <>
          <Button
            onClick={() => {
              setStateDialog("view");
            }}
            color="primary"
          >
            Huỷ
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Cập nhật
          </Button>
        </>
      );
    }
  }, [stateDialog, teacher]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{viewTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ và Tên Giảng viên"
            type="text"
            fullWidth
            name="name"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={teacher.name}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="level"
            label="Trình độ học vấn"
            type="text"
            fullWidth
            name="level"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={teacher.level}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="số điện thoại"
            type="text"
            fullWidth
            name="phone"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={teacher.phone}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="email"
            type="text"
            fullWidth
            name="email"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={teacher.email}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="workspace"
            label="Nơi làm việc"
            type="text"
            fullWidth
            name="workspace"
            onChange={(e) => {
              handleChangeInput(e);
            }}
            value={teacher.workspace}
            InputProps={{
              readOnly: readOnly,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>{viewAction}</DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
