import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import { Plus, Filter } from '@geist-ui/react-icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ICategories } from '@services/categorias/cadastro-categorias/types';
import * as request from '@services/categorias';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import Loader from '@components/Loader';
import { BtnRow } from '@styles/buttons';

interface IData {
  cod_categoria: string;
  desc_categoria: string;
  option: JSX.Element;
}

export default function CategoriasAplicativos() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [data, setData] = useState<ICategories[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getCategoriesPagesData = useCallback(async () => {
    try {
      const response = await request.getCategoriesPagination(page);
      const data = response.data;
      // console.log('data', data.categorias);
      setLoading(false);
      setData(data.categorias);
      setQuantityPage(Math.ceil(data.total / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page]);

  const gatheredData = useMemo(() => {
    const allData: IData[] = [];
    if (data) {
      data.forEach((item, i) => {
        allData.push({
          ...item,
          option: (
            <Popover
              num={i}
              content={[
                {
                  optionName: 'Selecionar',
                  onClick: () => console.log('selecionar'),
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onClick: () => console.log('editar'),
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => console.log('excluir'),
                  className: 'able',
                },
              ]}
            />
          ),
        });
      });
    }
    return allData;
  }, [data]);

  useEffect(() => {
    getCategoriesPagesData();
  }, [page]);

  useEffect(() => {
    if (page > quantityPage) {
      setPage(1);
    }
  }, [quantityPage, page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Categorias</title>
      </Head>
      <h2>Categorias de Aplicativos</h2>
      <BtnRow>
        <button>
          <span>
            <Filter />
          </span>
          Filtrar
        </button>
        <button
          onClick={() =>
            router.push({
              pathname: 'cadastro-categoria',
            })
          }
        >
          <span>
            <Plus />
          </span>
          Adicionar
        </button>
      </BtnRow>
      <TableGrid>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {gatheredData.map((item, i) => (
              <tr key={i}>
                <td style={{ width: '40px' }}>{item.option}</td>
                <td>{item.cod_categoria}</td>
                <td>{item.desc_categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableGrid>

      <Pages>
        <Pagination
          onChange={handleChange}
          count={quantityPage}
          shape="rounded"
        />
      </Pages>
    </>
  );
}

CategoriasAplicativos.auth = true;
