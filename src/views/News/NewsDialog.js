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
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { createStudent, getStudentById, updateStudent } from "service/Api";
import { Selection } from "components/InputComponent/Selection";

export function NewsDialog(props) {
  const { open, onClose, idNews } = props;

  const [readOnly, setReadOnly] = useState(false);
  const [stateDialog, setStateDialog] = useState("");
  const [news, setNews] = useState({
    title: "",
    subTitle: "",
    idImageUrl: "",
    content: "",
    type: "",
    status: "",
    description: "",
  });
  useEffect(() => {
    const fetchData = async () => {};
    if (idNews !== "") {
      setStateDialog("view");
      setReadOnly(true);
      fetchData();
    }
    if (idNews === "") {
      setStateDialog("create");
      setReadOnly(false);
    }
  }, [idNews]);
  const handleChangeInput = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setNews((state) => ({ ...state, [inputName]: value }));
  };
  const handleChangeSelect = (name, value) => {
    // setStudent((state) => ({ ...state, [name]: value }));
  };
  const handleCreate = async () => {
    console.log(news);
  };
  const handleUpdate = async () => {};

  const viewTitle = useMemo(() => {
    if (stateDialog === "view") {
      return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Chi tiết sinh viên
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
      return <span>Tạo mới sinh viên</span>;
    }
    if (stateDialog === "update") {
      return <span>Cập nhật sinh viên</span>;
    }
  }, [stateDialog, news]);

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
  }, [stateDialog, news]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{viewTitle}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tiêu đề"
          type="text"
          fullWidth
          name="title"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          value={news.title}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Phụ đề"
          type="text"
          fullWidth
          name="subTitle"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          value={news.subTitle}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Nội dung"
          type="text"
          fullWidth
          name="content"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          value={news.content}
          rowsMax={4}
          multiline
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Mô tả"
          type="text"
          fullWidth
          name="description"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          value={news.description}
          rowsMax={2}
          multiline
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>{viewAction}</DialogActions>
    </Dialog>
  );
}
