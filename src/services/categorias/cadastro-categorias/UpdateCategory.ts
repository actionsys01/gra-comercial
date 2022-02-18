import api from '@services/api';

interface IUpdateCategoriaDTO {
  cod_categoria: string;
  id_empresa: number | any;
  desc_categoria: string;
  user_update: number;
}

export default async function UpdateCategory(data: IUpdateCategoriaDTO) {
  const response = await api.put('/categorias/', data);

  return response;
}
