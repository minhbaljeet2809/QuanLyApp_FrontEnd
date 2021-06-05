import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import { TextFieldCustom } from '../Component/TextFliedCustom';
import axios from 'axios';
import _ from 'lodash';
import { SelectCustom } from '../Component/SelectFlied';
import { getStudent } from 'service/Api';
import { getAllTeacher, createProject } from 'service/Api';
import { Selection } from 'components/InputComponent/Selection';

export function ProjectDialog(props) {
    const {
        open,
        onClose,
        idProject
    } = props;

    const [project, setProject] = useState({
        nameProject: "",
        nameTeacher: "",
        phoneTeacher: "",
        emailTeacher: "",
        workspaceTeacher: "",
        majors: "",
        nameStudent: "",
        phoneStudent: "",
        emailStudent: "",
        projectContent: "",
        projectRequest: "",
    });

    const [teacher, setTeacher] = useState({
        id: "",
        name: "",
        level: "",
        phone: "",
        email: "",
        workspace: "",
    });
    const [listTeacher, setListTeacher] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataTeacher = await getAllTeacher()
            if (dataTeacher.status === 200) {
                const listDataTeacher = dataTeacher.data.map((value, key) => {
                    return _.pick(value, ['id', 'name', 'level', 'phone', 'email', 'workspace']);
                })
                setListTeacher(listDataTeacher);
            }
        }
        fetchData();
    }, []);

    const handleChangeSelect = (name, value) => {
        setProject((state) => ({ ...state, [name]: value }));
    }

    const handleChangeInput = (inputName, value) => {
        setProject((state) => ({ ...state, [inputName]: value }));
    }

    const handleSelectTeacher = (name, value) => {
        const getTeacher = _.find(listTeacher, { id: value });
        setTeacher((preState) => ({
            ...getTeacher
        }))
    }

    const handleCreate = async () => {
        const data = {
            name: project.nameProject,
            projectRequest: project.projectRequest,
            projectContent: project.projectContent,
            majors: project.majors,
            idTeacher: teacher.id,
            nameTeacher: teacher.name,
        }

        const create = createProject(data);
        if (create.status === 200) {
            console.log(create.data);
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {idProject ? "Cập nhật Đồ Án" : "Tạo mới Đồ Án"}
            </DialogTitle>
            <DialogContent>
                <TextFieldCustom
                    label="Tên Đồ Án"
                    name="nameProject"
                    value={project.nameProject}
                    handle={(name, value) => {
                        handleChangeInput(name, value);
                    }}
                />
                <SelectCustom
                    label="Tên Giảng viên"
                    name="nameTeacher"
                    value={`${teacher.level}. ${teacher.name}`}
                    handle={(name, value) => {
                        handleSelectTeacher(name, value);
                    }}
                    select={true}
                    listValueSelect={listTeacher}
                />
                <TextFieldCustom
                    label="Điện thoại Giảng Viên"
                    name="phoneTeacher"
                    value={teacher.phone}
                    readOnly={true}
                />
                <TextFieldCustom
                    label="Đỉa chỉ email Giảng Viên"
                    name="emailTeacher"
                    value={teacher.email}
                    readOnly={true}
                />
                <TextFieldCustom
                    label="Nơi công tác Giảng Viên"
                    name="workspaceTeacher"
                    value={teacher.workspace}
                    readOnly={true}
                />

                <Selection
                    label="Chuyên ngành"
                    name="majors"
                    readOnly={false}
                    value={project.majors}
                    handle={(name, value) => {
                        handleChangeSelect(name, value);
                    }}
                    listValueSelect={listMajors}
                />


                <TextFieldCustom
                    label="Nội dung đề tài"
                    name="projectContent"
                    value={project.projectContent}
                    readOnly={false}
                    handle={(name, value) => {
                        handleChangeInput(name, value);
                    }}
                    rowsMax={4}
                />

                <TextFieldCustom
                    label="Yêu cầu đề tài đề tài"
                    name="projectRequest"
                    value={project.projectRequest}
                    readOnly={false}
                    handle={(name, value) => {
                        handleChangeInput(name, value);
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
    )
}

const listMajors = [
    {
        index: 1,
        value: "Nhúng"
    },
    {
        index: 2,
        value: "Di động"
    },
]