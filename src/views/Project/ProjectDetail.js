/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Selection } from "components/InputComponent/Selection";

export default function ProjectDetail(props) {
  const {
    project,
    listTeachers,
    listStudents,
    handleChangeTeacher,
    handleChangeStudent,
    teacher,
    student,
  } = props;
  const [update, setUpdate] = useState(false);

  const handleChangeSelect = () => {};

  console.log("teacher", teacher);
  console.log("student", student);
  // console.log("project", project);
  // console.log("listTeachers", listTeachers);
  // console.log("listStudents", listStudents);

  return (
    <Box>
      <TextField
        autoFocus
        margin="dense"
        id="nameProject"
        label="Đề tài"
        type="text"
        fullWidth
        name="nameProject"
        onChange={(e) => {}}
        value={project.nameProject}
        rowsMax={3}
        InputProps={{
          readOnly: !update,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        label="Giảng viên hướng dẫn"
        type="text"
        fullWidth
        name="nameTeacher"
        onChange={(e) => {}}
        value={`${teacher.level}. ${teacher.name}`}
        rowsMax={3}
        InputProps={{
          readOnly: !update,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        label="Điện thoại giảng viên"
        type="text"
        fullWidth
        name="phoneTeacher"
        onChange={(e) => {}}
        value={teacher.phone}
        rowsMax={3}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        label="Email giảng viên"
        type="text"
        fullWidth
        name="emailTeacher"
        onChange={(e) => {}}
        value={teacher.email}
        rowsMax={3}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        label="Đơn vị công tác"
        type="text"
        fullWidth
        name="workspaceTeacher"
        onChange={(e) => {}}
        value={teacher.workspace}
        rowsMax={3}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <Selection
        label="Chuyên ngành"
        name="majors"
        readOnly={!update}
        value={project.majors}
        handle={(name, value) => {
          handleChangeSelect(name, value);
        }}
        listValueSelect={listMajors}
      />
      <TextField
        margin="dense"
        id="nameStudent"
        label="Sinh viên Đăng ký"
        type="text"
        fullWidth
        name="nameStudent"
        onChange={(e) => {}}
        value={student.name}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        id="phoneStudent"
        label="Điện thoại  sinh viên"
        type="text"
        fullWidth
        name="phoneStudent"
        value={student.phone}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        id="emailStudent"
        label="Email  sinh viên"
        type="text"
        fullWidth
        name="emailStudent"
        value={student.email}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        id="projectContent"
        label="Nội dung"
        type="text"
        fullWidth
        name="projectContent"
        onChange={(e) => {}}
        value={project.projectContent}
        rowsMax={5}
        multiline
        InputProps={{
          readOnly: !update,
        }}
        variant="outlined"
      />
      <TextField
        margin="dense"
        id="projectRequest"
        label="Yêu Cầu"
        type="text"
        fullWidth
        name="projectRequest"
        onChange={(e) => {}}
        multiline
        value={project.projectRequest}
        rowsMax={5}
        InputProps={{
          readOnly: !update,
        }}
        variant="outlined"
      />
      {!update ? (
        <Button
          onClick={() => {
            setUpdate(true);
          }}
          color="primary"
          variant="outlined"
        >
          {" "}
          Chỉnh sửa{" "}
        </Button>
      ) : (
        <>
          {" "}
          <Button
            onClick={() => {
              setUpdate(false);
            }}
            variant="outlined"
            style={{ color: "#FFF", backgroundColor: "green" }}
          >
            {" "}
            Cập nhật{" "}
          </Button>{" "}
          <Button
            onClick={() => {
              setUpdate(false);
            }}
            variant="outlined"
            style={{ color: "#FFF", backgroundColor: "red" }}
          >
            {" "}
            Huỷ
          </Button>{" "}
        </>
      )}
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
