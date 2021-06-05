import React, { useEffect, useState } from 'react';
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import { Box } from '@material-ui/core';


export function ProjectProgressDetail(props) {
    const { projectProgress } = props;

    return (
        <CardBody>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        SINH VIÊN ước lượng tổng thể tỷ lệ nội dung công việc đồ án đã thực hiện được
                                </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.studentRate}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        CÁN BỘ HƯỚNG DẪN Đánh giá tổng thể tỷ lệ nội dung công việc đồ án đã đạt được
                                </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.teacherRate}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        Đánh giá mức độ hoàn thành kế hoạch đồ án đến thời điểm báo cáo:
                            </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.planState}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        Tinh thần, thái độ của sinh viên trong việc tìm kiếm tài liệu, nghiên cứu và thực hiện ĐATN trong thời gian qua:
                                </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.attitudeStudy}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        Tinh thần, thái độ của sinh viên trong việc gặp gỡ, trao đổi với GVHD các nhiệm vụ thực hiện ĐATN:
                                </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.attWithTeacher}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={6} sm={10} md={10}>
                    <p>
                        Đánh giá khả năng hoàn thành đồ án đúng thời hạn (ngày 10/06/2021):
                                </p>
                </GridItem>
                <GridItem xs={6} sm={2} md={2}>
                    <Box display="flex" alignItems="center" height="100%">
                        <p>
                            {projectProgress.abilityRate}
                        </p>
                    </Box>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Box display="flex" alignItems="center" height="100%">
                    </Box>
                </GridItem>
            </GridContainer>
        </CardBody>
    );
}