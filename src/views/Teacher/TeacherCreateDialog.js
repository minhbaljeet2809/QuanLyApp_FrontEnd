/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  createMuiTheme,
  Box,
} from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { createTeacher, updateTeacher } from "service/Api";
import { InputCustom } from "components/InputComponent/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTeacher,
  changeValueTeacher,
} from "../../redux/slice/teacherSlice";

const theme = createMuiTheme({
  overrides: {},
});

export function TeacherCreateDialog(props) {
  const { open, onClose } = props;
  const { teacher } = useSelector(selectTeacher);
  const dispatch = useDispatch();
  const handleChange = (payload) => {
    dispatch(changeValueTeacher(payload));
  };

  const [readOnly, setReadOnly] = useState(false);
  const [stateDialog, setStateDialog] = useState("");
  useEffect(() => {
    if (teacher.id == "") {
      setStateDialog("create");
      setReadOnly(false);
    }
    if (teacher.id !== "") {
      setStateDialog("view");
      setReadOnly(true);
    }
  }, [teacher.id]);

  const handleCreate = async () => {
    const create = await createTeacher(teacher);
    if (create.status === 200) {
      alert("Tạo thành công");
    }
    onClose();
    setStateDialog("view");
  };

  const handleUpdate = async () => {
    const update = await updateTeacher(teacher.id, teacher);
    if (update.status === 200) {
      alert("Cập nhật thành công");
    }
    onClose();
    setStateDialog("view");
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
          <InputCustom
            label="Họ và Tên Giảng viên"
            name="name"
            value={teacher.name}
            readOnly={readOnly}
            handle={(e) => {
              handleChange(e);
            }}
          />
          <InputCustom
            label="Trình độ học vấn"
            name="level"
            value={teacher.level}
            readOnly={readOnly}
            handle={(e) => {
              handleChange(e);
            }}
          />
          <InputCustom
            label="Số điện thoại"
            name="phone"
            value={teacher.phone}
            readOnly={readOnly}
            handle={(e) => {
              handleChange(e);
            }}
          />
          <InputCustom
            label="Email"
            name="email"
            value={teacher.email}
            readOnly={readOnly}
            handle={(e) => {
              handleChange(e);
            }}
          />
          <InputCustom
            label="Nơi làm việc"
            name="workspace"
            value={teacher.workspace}
            readOnly={readOnly}
            handle={(e) => {
              handleChange(e);
            }}
          />
        </DialogContent>
        <DialogActions>{viewAction}</DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
