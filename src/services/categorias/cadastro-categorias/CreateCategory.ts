import api from '@services/api';

interface ICreateCategoriaDTO {
  cod_categoria: string;
  id_empresa: any;
  desc_categoria: string;
  user_insert: number;
}

export default async function CreateCategory(data: ICreateCategoriaDTO) {
  const response = await api.post('/categorias/', data);

  return response;
}
