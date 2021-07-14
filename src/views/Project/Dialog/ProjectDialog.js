/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { TextFieldCustom } from "../Component/TextFliedCustom";
import { SelectCustom } from "../Component/SelectFlied";
import { Selection } from "components/InputComponent/Selection";
import { selectTeacher, loadListTeacher } from "redux/slice/teacherSlice";
import {
  selectProject,
  updateOrCreate,
  actionCreate,
} from "redux/slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";

export function ProjectDialog(props) {
  const { open, onClose } = props;
  const { listTeachers } = useSelector(selectTeacher);
  const { detailProject } = useSelector(selectProject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadListTeacher());
  }, []);
  const handleChange = (name, value) => {
    const payload = {
      name: name,
      value: value,
    };
    dispatch(updateOrCreate(payload));
  };

  const handleSelectTeacher = (teacher) => {
    const teacherName = `${teacher.level}. ${teacher.name}`;
    handleChange("idTeacher", teacher.id);
    handleChange("nameTeacher", teacherName);
    handleChange("phoneTeacher", teacher.phone);
    handleChange("emailTeacher", teacher.email);
    handleChange("workspaceTeacher", teacher.workspace);
  };

  const handleCreate = async () => {
    await dispatch(actionCreate(detailProject));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tạo mới Đồ Án</DialogTitle>
      <DialogContent>
        <TextFieldCustom
          label="Tên Đồ Án"
          name="name"
          value={detailProject.name}
          handle={(name, value) => {
            handleChange(name, value);
          }}
        />
        <SelectCustom
          label="Tên Giảng viên"
          name="nameTeacher"
          value={detailProject.idTeacher}
          handle={(teacher) => {
            handleSelectTeacher(teacher);
          }}
          select={true}
          listValueSelect={listTeachers}
        />
        <TextFieldCustom
          label="Điện thoại Giảng Viên"
          name="phoneTeacher"
          value={detailProject.phoneTeacher}
          readOnly={true}
        />
        <TextFieldCustom
          label="Đỉa chỉ email Giảng Viên"
          name="emailTeacher"
          value={detailProject.emailTeacher}
          readOnly={true}
        />
        <TextFieldCustom
          label="Nơi công tác Giảng Viên"
          name="workspaceTeacher"
          value={detailProject.workspaceTeacher}
          readOnly={true}
        />

        <Selection
          label="Chuyên ngành"
          name="majors"
          readOnly={false}
          value={detailProject.majors}
          handle={(name, value) => {
            handleChange(name, value);
          }}
          listValueSelect={listMajors}
        />

        <TextFieldCustom
          label="Nội dung đề tài"
          name="projectContent"
          value={detailProject.projectContent}
          readOnly={false}
          handle={(name, value) => {
            handleChange(name, value);
          }}
          rowsMax={4}
        />
        <TextFieldCustom
          label="Yêu cầu đề tài đề tài"
          name="projectRequest"
          value={detailProject.projectRequest}
          readOnly={false}
          handle={(name, value) => {
            handleChange(name, value);
          }}
          rowsMax={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={handleCreate} color="primary">
          Tạo mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const listMajors = [
  {
    index: 1,
    value: "Nhúng",
  },
  {
    index: 2,
    value: "Di động",
  },
];
