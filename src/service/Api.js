import Http from "./Http";

// lấy danh sách sinh viên
export const getStudent = (config) => {
  return Http.get("/student/getAll", config);
};

// lấy chi tiết nhân viên theo id
export const getStudentById = (id, config) => {
  return Http.get("/student/get/" + id, config);
};

// tạo mới sinh viên
export const createStudent = (data, config) => {
  return Http.post("/student/create", data, config);
};

// chỉnh sửa sinh viên
export const updateStudent = (id, data, config) => {
  return Http.post(`/student/update/${id}`, data, config);
};

// xoá sinh viên
export const deleteStudent = (id) => {
  return Http.delete(`student/delete/${id}`);
};

// lấy danh sách giảng viên
export const getAllTeacher = (config) => {
  return Http.get("/teacher/getAll", config);
};

// lấy chi tiết giảng viên theo id
export const getTeacherByID = async (id, config) => {
  return await Http.get(`/teacher/getById/${id}`, config);
};

// tạo mới giảng viên
export const createTeacher = (data, config) => {
  return Http.post("/teacher/create", data, config);
};

// chỉnh sửa giảng viên
export const updateTeacher = (id, data, config) => {
  return Http.post(`/teacher/update/${id}`, data, config);
};

// Kiểm tra giảng viên
export const checkTeacher = (id, config) => {
  return Http.get(`/teacher/checkTeacher/${id}`, config);
};

// Xoá giảng viên
export const deleteTeacher = (id, config) => {
  return Http.delete(`/teacher/delete/${id}`, config);
};

// lấy danh sách đồ án
export const getAllProject = async (config) => {
  return await Http.get("/project/getAll", config);
};

// lấy thông tin chi tiết đồ án theo Id
export const getProjectById = async (id, config) => {
  return await Http.get(`/project/getId/${id}`, config);
};

// tạo mới đồ án
export const createProject = async (data, config) => {
  return await Http.post("/project/create", data, config);
};

// Cập nhật đồ án
export const updateProject = async (data, config) => {
  return await Http.post("project/update", data, config);
};

// Xoá đồ án
export const deleteProject = (id, config) => {
  return Http.delete(`/project/delete/${id}`, config);
};

// lấy thông tin chi tết tiến độ đồ án theo tiến độ
export const getProjectProgress = (idPr, stage, config) => {
  return Http.get(`/projectProgress/get/${idPr}/${stage}`, config);
};

// tạo mới tiến độ đồ ấn
export const createProjectProgress = (data, config) => {
  return Http.post(`/projectProgress/create`, data, config);
};

// sửa tiến độ đồ án
export const updateProjectProgress = async (id, data, config) => {
  return await Http.post(`/projectProgress/update/${id}`, data, config);
};

// lấy thông tin chi tiết công việc đồ đán theo tiếng độ
export const getProjectProgressLogs = (idProjectProgress, config) => {
  return Http.get(`/projectProgressLog/${idProjectProgress}`, config);
};

// tạo project progress log
export const createProgressLog = (data, config) => {
  return Http.post(`/projectProgressLog/create`, data, config);
};

// sửa project progress log
export const updateProgressLog = async (id, data, config) => {
  return await Http.post(`/projectProgressLog/update/${id}`, data, config);
};

// getOne progress log
export const getProjectProgressLogsById = async (id, config) => {
  return await Http.get(`/projectProgressLog/get/${id}`, config);
};

// xoá progress log
export const deleteProjectProgressLog = async (id, config) => {
  return await Http.delete(`/projectProgressLog/delete/${id}`, config);
};

// tk danh sách đồ án đã được đăng ký
export const getTkProject = (config) => {
  return Http.get("/project/tkProject", config);
};

// tk danh sách sinh viên đã đăng ký đồ án
export const getTkStudent = (config) => {
  return Http.get("/project/tkStudent", config);
};

// tk tiến độ đồ án
export const getTkProgress = (stage, config) => {
  return Http.get(`/project/tkProgress/${stage}`, config);
};
