import api from '@services/api';

export default async function ConfigPagination(page: number) {
  const response = await api.get('/cadastro-config/pagination', {
    params: {
      page,
    },
  });
  return response;
}
