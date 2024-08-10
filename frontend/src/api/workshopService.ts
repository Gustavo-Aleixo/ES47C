import { api } from './axios';
import { Workshop, WorkshopDto } from '../types/types';


const createWorkshop = async (workshopDto: WorkshopDto): Promise<Workshop> => {
  return api.post('workshop/create', workshopDto)
    .then(response => response.data);
};



const WorkshopService = {
  createWorkshop,
};

export default WorkshopService;