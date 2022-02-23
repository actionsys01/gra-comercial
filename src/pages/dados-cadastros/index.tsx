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
import BotaoVoltar from '@components/BotaoVoltar';
import * as request from '@services/categorias/';
import { IConfigData } from '@services/categorias/cadastro-config/types';
import { CollumHide } from './style';
import { IDados } from '@services/categorias/cadastro-dados/types';

export interface IData {
  aplicacao: string;
  desc_aplicacao: string;
  option: JSX.Element;
}

const initialValues = {
  chave_8: false,
  valor_date_1: false,
  valor_date_2: false,
  valor_date_3: false,
};

export default function DadosCadastros() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [columnData, setColumnData] = useState<IConfigData[]>([]);
  const [appData, setAppData] = useState([]);
  const [dates, setDates] = useState({ ...initialValues });

  // console.log('router.query', router.query);

  const getDadosCadastrosPages = useCallback(async () => {
    try {
      const response = await request.GetConfigById(Number(router.query.id));
      const data = response.data;
      setColumnData([data]);
      setAppData(data.cadastro_dados_id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDadosCadastrosPages();
  }, []);



  return (
    <>
      <Head>
        <title>Orion | Dados de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>{`Cadastro de ${router.query.app}`} </h2>
      <BtnRow>
        <button>
          <span>
            <Filter />
          </span>
          Filtrar
        </button>
        <button>
          <span>
            <Plus />
          </span>
          Adicionar
        </button>
      </BtnRow>
      <TableGrid>
        <table>
          <thead>
            {columnData.map((item, i) => (
              <CollumHide key={i}>
                <th className="first"></th>
                <th className={!item.chave_1 ? 'hideSeek' : ''}>
                  {item.chave_1}
                </th>
                <th className={!item.chave_2 ? 'hideSeek' : ''}>
                  {item.chave_2}
                </th>
                <th className={!item.chave_3 ? 'hideSeek' : ''}>
                  {item.chave_3}
                </th>
                <th className={!item.chave_4 ? 'hideSeek' : ''}>
                  {item.chave_4}
                </th>
                <th className={!item.chave_5 ? 'hideSeek' : ''}>
                  {item.chave_5}
                </th>
                <th className={!item.chave_6 ? 'hideSeek' : ''}>
                  {item.chave_6}
                </th>
                <th className={!item.chave_7 ? 'hideSeek' : ''}>
                  {item.chave_7}
                </th>
                <th className={!item.chave_8 ? 'hideSeek' : ''}>
                  {item.chave_8}
                </th>
                <th className={!item.valor_string_1 ? 'hideSeek' : ''}>
                  {item.valor_string_1}
                </th>
                <th className={!item.valor_string_2 ? 'hideSeek' : ''}>
                  {item.valor_string_2}
                </th>
                <th className={!item.valor_string_3 ? 'hideSeek' : ''}>
                  {item.valor_string_3}
                </th>
                <th className={!item.valor_string_4 ? 'hideSeek' : ''}>
                  {item.valor_string_4}
                </th>
                <th className={!item.valor_string_5 ? 'hideSeek' : ''}>
                  {item.valor_string_5}
                </th>
                <th className={!item.valor_string_6 ? 'hideSeek' : ''}>
                  {item.valor_string_6}
                </th>
                <th className={!item.valor_string_7 ? 'hideSeek' : ''}>
                  {item.valor_string_7}
                </th>
                <th className={!item.valor_string_8 ? 'hideSeek' : ''}>
                  {item.valor_string_8}
                </th>
                <th className={!item.valor_string_9 ? 'hideSeek' : ''}>
                  {item.valor_string_9}
                </th>
                <th className={!item.valor_string_10 ? 'hideSeek' : ''}>
                  {item.valor_string_10}
                </th>
                <th className={!item.valor_number_1 ? 'hideSeek' : ''}>
                  {item.valor_number_1}
                </th>
                <th className={!item.valor_number_2 ? 'hideSeek' : ''}>
                  {item.valor_number_2}
                </th>
                <th className={!item.valor_number_3 ? 'hideSeek' : ''}>
                  {item.valor_number_3}
                </th>
                <th className={!item.valor_number_4 ? 'hideSeek' : ''}>
                  {item.valor_number_4}
                </th>
                <th className={!item.valor_number_5 ? 'hideSeek' : ''}>
                  {item.valor_number_5}
                </th>
                <th className={!item.valor_date_1 ? 'hideSeek' : ''}>
                  {item.valor_date_1}
                </th>
                <th className={!item.valor_date_2 ? 'hideSeek' : ''}>
                  {item.valor_date_2}
                </th>
                <th className={!item.valor_date_3 ? 'hideSeek' : ''}>
                  {item.valor_date_3}
                </th>
                <th className="first"></th>
              </CollumHide>
            ))}
          </thead>
          <tbody>
            {appData.map((item: IDados, i: number) => (
              <CollumHide key={i}>
                <td></td>
                <td className={!item.chave_1 ? 'hideSeek' : ''}>
                  {item.chave_1}
                </td>
                <td className={!item.chave_2?.trim() ? 'hideSeek' : ''}>
                  {item.chave_2}
                </td>
                <td className={!item.chave_3?.trim() ? 'hideSeek' : ''}>
                  {item.chave_3}
                </td>
                <td className={!item.chave_4?.trim() ? 'hideSeek' : ''}>
                  {item.chave_4}
                </td>
                <td className={!item.chave_5?.trim() ? 'hideSeek' : ''}>
                  {item.chave_5}
                </td>
                <td className={!item.chave_6?.trim() ? 'hideSeek' : ''}>
                  {item.chave_6}
                </td>
                <td className={!item.chave_7?.trim() ? 'hideSeek' : ''}>
                  {item.chave_7}
                </td>
                <td className={!dates.chave_8 ? 'hideSeek' : ''}>
                  {item.chave_8}
                </td>
                <td className={!item.valor_string_1 ? 'hideSeek' : ''}>
                  {item.valor_string_1}
                </td>
                <td className={!item.valor_string_2 ? 'hideSeek' : ''}>
                  {item.valor_string_2}
                </td>
                <td className={!item.valor_string_3 ? 'hideSeek' : ''}>
                  {item.valor_string_3}
                </td>
                <td className={!item.valor_string_4 ? 'hideSeek' : ''}>
                  {item.valor_string_4}
                </td>
                <td className={!item.valor_string_5 ? 'hideSeek' : ''}>
                  {item.valor_string_5}
                </td>
                <td className={!item.valor_string_6 ? 'hideSeek' : ''}>
                  {item.valor_string_6}
                </td>
                <td className={!item.valor_string_7 ? 'hideSeek' : ''}>
                  {item.valor_string_7}
                </td>
                <td className={!item.valor_string_8 ? 'hideSeek' : ''}>
                  {item.valor_string_8}
                </td>
                <td className={!item.valor_string_9 ? 'hideSeek' : ''}>
                  {item.valor_string_9}
                </td>
                <td className={!item.valor_string_10 ? 'hideSeek' : ''}>
                  {item.valor_string_10}
                </td>
                <td className={!item.valor_number_1 ? 'hideSeek' : ''}>
                  {item.valor_number_1}
                </td>
                <td className={!item.valor_number_2 ? 'hideSeek' : ''}>
                  {item.valor_number_2}
                </td>
                <td className={!item.valor_number_3 ? 'hideSeek' : ''}>
                  {item.valor_number_3}
                </td>
                <td className={!item.valor_number_4 ? 'hideSeek' : ''}>
                  {item.valor_number_4}
                </td>
                <td className={!item.valor_number_5 ? 'hideSeek' : ''}>
                  {item.valor_number_5}
                </td>
                <td className={!dates.valor_date_1 ? 'hideSeek' : ''}>
                  {item.valor_date_1}
                </td>
                <td className={!dates.valor_date_2 ? 'hideSeek' : ''}>
                  {item.valor_date_2}
                </td>
                <td className={!dates.valor_date_3 ? 'hideSeek' : ''}>
                  {item.valor_date_3}
                </td>
                {/* <td></td> */}
              </CollumHide>
            ))}
          </tbody>
        </table>
      </TableGrid>
    </>
  );
}

DadosCadastros.auth = true;
