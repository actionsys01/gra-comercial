import api from '@services/api';

export default async function GetCategoryByService(
  cod_categoria: string,
  page: number,
) {
  const response = await api.get('/categorias', {
    params: {
      cod_categoria,
      page,
    },
  });

  return response;
}
