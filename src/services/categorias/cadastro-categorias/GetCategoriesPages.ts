import api from '@services/api';

export default async function getCategoriesPagination(page: number) {
  const response = await api.get('/categorias/pagination', {
    params: {
      page,
    },
  });
  return response;
}
