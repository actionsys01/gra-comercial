import api from '@services/api';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

export default async function getCategoriesPagination(
  page: number,
  categorias: IUnformCompare[],
) {
  const filters = categorias?.reduce(
    (acc: any, { campo, valor, compare }: any) => {
      if (compare === 'contain') {
        campo = `${campo}_${compare}`;
      }
      return { ...acc, [campo]: valor };
    },
    {},
  );

  const response = await api.get('/categorias/pagination', {
    params: {
      page,
      ...filters,
    },
  });
  return response;
}
