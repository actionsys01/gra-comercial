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
import { AddBtn } from '@styles/buttons';
import * as request from '@services/categorias';
import { IConfigData } from '@services/categorias/cadastro-config/types';
import BotaoVoltar from '@components/BotaoVoltar';
import paginate from '@utils/paginate';
import DeleteModal from './modal';
import { useFiltro } from '@contexts/filtro-cadastros';
import Filtro from '@components/Filtro-cadastros/Filter-Modal';

export interface IData {
  aplicacao: string;
  desc_aplicacao: string;
  option: JSX.Element;
}

export default function ConfigCadastros() {
  const [, setToast] = useToasts();
  const router = useRouter();

  const [data, setData] = useState<IConfigData[]>([]);
  const [appId, setAppId] = useState(0);
  const [page, setPage] = useState(0);
  const [quantityPage, setQuantityPage] = useState(1);
  const categoria = router.query.cod;
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const { configApps } = useFiltro();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  // console.log('query', router.query.cod)

  const getConfigByCategoryCodePageData = useCallback(async () => {
    try {
      const response = await request.GetCategoryById(
        Number(router.query.cod),
        configApps,
      );
      const data = paginate(response.data);
      setData(data[page]);
      setQuantityPage(Math.ceil(data.length));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }, [page, configApps]);

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
                  onClick: () =>
                    router.push({
                      pathname: 'dados-cadastros',
                      query: {
                        app: item.aplicacao,
                        id: item.id,
                        desc: item.desc_aplicacao,
                        cod: categoria,
                      },
                    }),
                  className: 'able',
                },
                {
                  optionName: 'Editar',
                  onClick: () =>
                    router.push({
                      pathname: 'atualizar-aplicativo',
                      query: {
                        app: item.aplicacao,
                        id: item.id,
                        desc: item.desc_aplicacao,
                        cod: categoria,
                      },
                    }),
                  className: 'able',
                },
                {
                  optionName: 'Excluir',
                  onClick: () => {
                    setVisibleModal(true), setAppId(item.id);
                  },
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
  }, [page, configApps]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Orion | Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Aplicativos</h2>
      <AddBtn style={{ gap: '10px' }}>
        <Filtro data={configApps} abaAtual={'config'} />
        <button
          onClick={() =>
            router.push({
              pathname: 'cadastrar-aplicativo',
              query: { cod: categoria },
            })
          }
        >
          <span>
            <Plus />
          </span>
          Adicionar
        </button>
      </AddBtn>
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
      {visibleModal && (
        <DeleteModal
          setVisibleModal={setVisibleModal}
          data={data}
          setData={setData}
          id={appId}
        />
      )}
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
