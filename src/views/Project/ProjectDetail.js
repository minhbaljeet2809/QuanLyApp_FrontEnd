/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@material-ui/core";
import { Selection } from "components/InputComponent/Selection";
import { TextFieldCustom } from "./Component/TextFliedCustom";
import { SelectCustom } from "./Component/SelectFlied";
import {
  updateOrCreate,
  actionUpdate,
  removeStudent,
} from "redux/slice/projectSlice";
import { useDispatch } from "react-redux";

export default function ProjectDetail(props) {
  const { project, listTeachers } = props;
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  console.log("project", project);

  const handleChangeSelect = (teacher) => {
    const teacherName = `${teacher.level}. ${teacher.name}`;
    handleChangeInput("idTeacher", teacher.id);
    handleChangeInput("nameTeacher", teacherName);
    handleChangeInput("phoneTeacher", teacher.phone);
    handleChangeInput("emailTeacher", teacher.email);
    handleChangeInput("workspaceTeacher", teacher.workspace);
  };

  const handleChangeInput = (name, value) => {
    console.log(name, value);
    dispatch(updateOrCreate({ name: name, value: value }));
  };

  const handleUpdate = async () => {
    dispatch(actionUpdate(project));
  };

  const handleRemoveStudent = async () => {
    dispatch(removeStudent());
  };

  const viewBtn = useMemo(() => {
    if (!update) {
      return (
        <Button
          onClick={() => {
            setUpdate(true);
          }}
          color="primary"
          variant="outlined"
        >
          Chỉnh sửa
        </Button>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            onClick={() => {
              setUpdate(false);
              handleRemoveStudent();
            }}
            variant="outlined"
            style={{ color: "#FFF", backgroundColor: "blue" }}
          >
            Xoá Sinh viên
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              setUpdate(false);
              handleUpdate();
            }}
            variant="outlined"
            style={{ color: "#FFF", backgroundColor: "green", marginRight: 10 }}
          >
            Cập nhật
          </Button>
          <Button
            onClick={() => {
              setUpdate(false);
            }}
            variant="outlined"
            style={{ color: "#FFF", backgroundColor: "red" }}
          >
            Huỷ
          </Button>
        </div>
      </div>
    );
  }, [update, project, listTeachers]);
  return (
    <Box>
      <TextFieldCustom
        label="Đề tài"
        name="name"
        value={project.name}
        readOnly={!update}
        handle={(name, value) => {
          handleChangeInput(name, value);
        }}
      />
      <SelectCustom
        label="Giảng viên hướng dẫn"
        name="nameTeacher"
        value={project.idTeacher}
        handle={(teacher) => {
          handleChangeSelect(teacher);
        }}
        listValueSelect={listTeachers}
        readOnly={!update}
      />
      <TextFieldCustom
        label="Điện thoại giảng viên"
        name="phoneTeacher"
        value={project.phoneTeacher}
        readOnly={true}
      />
      <TextFieldCustom
        label="Email giảng viên"
        name="emailTeacher"
        value={project.emailTeacher}
        readOnly={true}
      />
      <TextFieldCustom
        label="Đơn vị công tác"
        name="workspaceTeacher"
        value={project.workspaceTeacher}
        readOnly={true}
      />
      <Selection
        label="Chuyên ngành"
        name="majors"
        readOnly={!update}
        value={project.majors}
        handle={(name, value) => {
          handleChangeInput(name, value);
        }}
        listValueSelect={listMajors}
      />
      <TextFieldCustom
        label="Sinh viên Đăng ký"
        name="nameStudent"
        value={project.nameStudent}
        readOnly={true}
      />
      <TextFieldCustom
        label="Điện thoại  sinh viên"
        name="phoneStudent"
        value={project.phoneStudent}
        readOnly={true}
      />
      <TextFieldCustom
        label="Email sinh viên"
        name="emailStudent"
        value={project.emailStudent}
        readOnly={true}
      />
      <TextFieldCustom
        label="Nội dung"
        name="projectContent"
        value={project.projectContent}
        readOnly={!update}
        rowsMax={3}
        handle={(name, value) => {
          handleChangeInput(name, value);
        }}
      />
      <TextFieldCustom
        label="Yêu Cầu"
        name="projectRequest"
        value={project.projectRequest}
        readOnly={!update}
        rowsMax={3}
        handle={(name, value) => {
          handleChangeInput(name, value);
        }}
      />
      {viewBtn}
    </Box>
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
