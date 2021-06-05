import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';

export default function ProjectDetail(props) {
    const { project } = props;

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
                onChange={(e) => { }}
                value={project.nameProject}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="nameTeacher"
                label="Giảng viên hướng dẫn"
                type="text"
                fullWidth
                name="nameTeacher"
                onChange={(e) => { }}
                value={project.nameTeacher}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="phoneTeacher"
                label="Điện thoại giảng viên"
                type="text"
                fullWidth
                name="phoneTeacher"
                onChange={(e) => { }}
                value={project.phoneTeacher}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="emailTeacher"
                label="Email giảng viên"
                type="text"
                fullWidth
                name="emailTeacher"
                onChange={(e) => { }}
                value={project.emailTeacher}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="workspaceTeacher"
                label="Đơn vị công tác"
                type="text"
                fullWidth
                name="workspaceTeacher"
                onChange={(e) => { }}
                value={project.workspaceTeacher}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="majors"
                label="Chuyên ngành"
                type="text"
                fullWidth
                name="majors"
                onChange={(e) => { }}
                value={project.majors}
                rowsMax={3}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <TextField
                margin="dense"
                id="nameStudent"
                label="Sinh viên Đăng ký"
                type="text"
                fullWidth
                name="nameStudent"
                onChange={(e) => { }}
                value={project.nameStudent}
                rowsMax={3}
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
                onChange={(e) => { }}
                value={project.phoneStudent}
                rowsMax={3}
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
                onChange={(e) => { }}
                value={project.emailStudent}
                rowsMax={3}
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
                onChange={(e) => { }}
                value={project.projectContent}
                rowsMax={5}
                multiline
                InputProps={{
                    readOnly: true,
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
                onChange={(e) => { }}
                multiline
                value={project.projectRequest}
                rowsMax={5}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
        </Box>
    )
}