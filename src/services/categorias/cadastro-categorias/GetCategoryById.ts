import api from '@services/api';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

export default async function GetCategoryById(
  id: number,
  configApps: IUnformCompare[],
) {
  console.log('configApps no service', configApps)
  const filters = configApps?.reduce(
    (acc: any, { campo, valor, compare }: any) => {
      if (compare === 'contain') {
        campo = `${campo}_${compare}`;
      }
      return { ...acc, [campo]: valor };
    },
    {},
  );

  const response = await api.get('/categorias', {
    params: {
      id,
      ...filters,
    },
  });

  return response;
}
