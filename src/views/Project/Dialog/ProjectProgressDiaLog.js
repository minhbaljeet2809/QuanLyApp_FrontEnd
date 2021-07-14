/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TextFieldCustom } from "../Component/TextFliedCustom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { createProjectProgress } from "service/Api";
import { Selection } from "components/InputComponent/Selection";
import { projectProgress } from "shared/Contain";

export function ProjectProgressDialog(props) {
  const { open, onClose, stage, idProject } = props;
  const [progress, setProgress] = useState({
    stage: "",
    studentRate: "",
    teacherRate: "",
    planState: "",
    attitudeStudy: "",
    attWithTeacher: "",
    abilityRate: "",
  });

  const handleChangeInput = (name, value) => {
    setProgress((state) => ({ ...state, [name]: value }));
  };

  const handleCreate = async () => {
    const dataProgress = {
      stage: stage,
      idProject: idProject,
      studentRate: progress.studentRate,
      teacherRate: progress.teacherRate,
      planState: progress.planState,
      attitudeStudy: progress.attitudeStudy,
      attWithTeacher: progress.attWithTeacher,
      abilityRate: progress.abilityRate,
    };
    const create = await createProjectProgress(dataProgress);
    if (create.status === 200) {
      onClose();
    }
  };

  const handleChangeSelect = (name, value) => {
    setProgress((state) => ({ ...state, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tạo đánh giá tiến độ</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              SINH VIÊN ước lượng tổng thể tỷ lệ nội dung công việc đồ án đã
              thực hiện được
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <TextFieldCustom
              name="studentRate"
              value={progress.studentRate}
              handle={(name, value) => {
                handleChangeInput(name, value);
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              CÁN BỘ HƯỚNG DẪN Đánh giá tổng thể tỷ lệ nội dung công việc đồ án
              đã đạt được
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <Box display="flex" alignItems="center" height="100%">
              <TextFieldCustom
                name="teacherRate"
                value={progress.teacherRate}
                handle={(name, value) => {
                  handleChangeInput(name, value);
                }}
              />
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              Đánh giá mức độ hoàn thành kế hoạch đồ án đến thời điểm báo cáo:
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <Box display="flex" alignItems="center" height="100%">
              <Selection
                label=""
                name="planState"
                readOnly={false}
                value={progress.planState}
                handle={(name, value) => {
                  handleChangeSelect(name, value);
                }}
                listValueSelect={projectProgress.planState}
              />
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              Tinh thần, thái độ của sinh viên trong việc tìm kiếm tài liệu,
              nghiên cứu và thực hiện ĐATN trong thời gian qua:
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <Box display="flex" alignItems="center" height="100%">
              <Selection
                label=""
                name="attitudeStudy"
                readOnly={false}
                value={progress.attitudeStudy}
                handle={(name, value) => {
                  handleChangeSelect(name, value);
                }}
                listValueSelect={projectProgress.attitudeStudy}
              />
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              Tinh thần, thái độ của sinh viên trong việc gặp gỡ, trao đổi với
              GVHD các nhiệm vụ thực hiện ĐATN:
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <Box display="flex" alignItems="center" height="100%">
              <Selection
                label=""
                name="attWithTeacher"
                readOnly={false}
                value={progress.attWithTeacher}
                handle={(name, value) => {
                  handleChangeSelect(name, value);
                }}
                listValueSelect={projectProgress.attWithTeacher}
              />
            </Box>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={6} sm={9} md={9}>
            <p>
              Đánh giá khả năng hoàn thành đồ án đúng thời hạn (ngày
              10/06/2021):
            </p>
          </GridItem>
          <GridItem xs={6} sm={3} md={3}>
            <Box display="flex" alignItems="center" height="100%">
              <Selection
                label=""
                name="abilityRate"
                readOnly={false}
                value={progress.abilityRate}
                handle={(name, value) => {
                  handleChangeSelect(name, value);
                }}
                listValueSelect={projectProgress.abilityRate}
              />
            </Box>
          </GridItem>
        </GridContainer>
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
