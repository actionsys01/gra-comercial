import api from '@services/api';

export default async function DeleteCategory(cod_categoria: string) {
  const response = await api.delete('/categorias', {
    params: {
      cod_categoria,
    },
  });

  return response;
}
