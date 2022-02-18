import api from '@services/api';

export default async function GetCategoryByService(cod_categoria: string) {
  const response = await api.get('/categorias', {
    params: {
      cod_categoria,
    },
  });

  return response;
}
