import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { Plus, Filter } from '@geist-ui/react-icons';
import { Pages } from '@styles/pages';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { TableGrid } from '@styles/tableStyle';
import Popover from '@components/Popover';
import Loader from '@components/Loader';
import { BtnRow } from '@styles/buttons';
import * as request from '@services/categorias';
import { IConfigData } from '@services/categorias/cadastro-config/types';
import BotaoVoltar from '@components/BotaoVoltar';

export interface IData {
  aplicacao: string;
  desc_aplicacao: string;
  option: JSX.Element;
}

export default function ConfigCadastros() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [data, setData] = useState<IConfigData[]>([]);
  const [page, setPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getConfigByCategoryCodePageData = useCallback(async () => {
    try {
      const response = await request.GetCategoryByService(
        String(router.query.cod),
        page,
      );
      const data = response.data;
      setData(data.aplicacoes);
      setQuantityPage(Math.ceil(data.aplicacoes.length / 8));
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, []);

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
                  onClick: () => console.log('Selecionar'),
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onClick: () => console.log('Editar'),
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => console.log('Excluir'),
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
    getConfigByCategoryCodePageData();
  }, []);

  return (
    <>
      <Head>
        <title>Orion | Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Aplicativos</h2>
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
              pathname: 'cadastrar-aplicativo',
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
                <td>{item.option}</td>
                <td>{item.aplicacao}</td>
                <td>{item.desc_aplicacao}</td>
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

ConfigCadastros.auth = true;
