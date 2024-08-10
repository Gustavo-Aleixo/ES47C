import { api } from './axios';
import { Teacher, TeacherDto } from '../types/types';




const createTeacher = async (teacherDto: TeacherDto): Promise<Teacher> => {
  return api.post('teacher/create', teacherDto)
    .then(response => response.data);
}

const getAllTeachers = async (): Promise<Teacher[]> => {
  return api.get('teacher/all')
    .then(response => response.data);
}





const TeacherService = {
  createTeacher,
  getAllTeachers,
};

export default TeacherService;