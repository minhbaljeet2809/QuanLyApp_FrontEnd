/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import { Box } from "@material-ui/core";
import { TextFieldCustom } from "../Component/TextFliedCustom";
import { Selection } from "components/InputComponent/Selection";
import { projectProgress } from "shared/Contain";

export function ProjectProgressDetail(props) {
  const { progress, update, changeInput, changeSelect } = props;

  const handleChangeInput = (name, value) => {
    changeInput(name, value);
  };

  const handleChangeSelect = (name, value) => {
    changeSelect(name, value);
  };

  return (
    <CardBody>
      <GridContainer>
        <GridItem xs={6} sm={9} md={9}>
          <p>
            SINH VIÊN ước lượng tổng thể tỷ lệ nội dung công việc đồ án đã thực
            hiện được
          </p>
        </GridItem>
        <GridItem xs={6} sm={3} md={3}>
          <TextFieldCustom
            readOnly={!update}
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
            CÁN BỘ HƯỚNG DẪN Đánh giá tổng thể tỷ lệ nội dung công việc đồ án đã
            đạt được
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
              readOnly={!update}
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
              readOnly={!update}
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
              readOnly={!update}
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
              readOnly={!update}
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
            Đánh giá khả năng hoàn thành đồ án đúng thời hạn (ngày 10/06/2021):
          </p>
        </GridItem>
        <GridItem xs={6} sm={3} md={3}>
          <Box display="flex" alignItems="center" height="100%">
            <Selection
              label=""
              name="abilityRate"
              readOnly={!update}
              value={progress.abilityRate}
              handle={(name, value) => {
                handleChangeSelect(name, value);
              }}
              listValueSelect={projectProgress.abilityRate}
            />
          </Box>
        </GridItem>
      </GridContainer>
    </CardBody>
  );
}
