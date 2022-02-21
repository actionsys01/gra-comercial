import api from '@services/api';
import { ICreateCadastroConfigDTO } from './types';

export default async function CreateConfig(data: ICreateCadastroConfigDTO) {
  const response = await api.post('/cadastro-config/', data);

  return response;
}
