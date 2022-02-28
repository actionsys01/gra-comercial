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
import { appInitialValue } from '@utils/initial-values';
import { format } from 'date-fns';

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
  const [appData, setAppData] = useState<IDados[]>([]);
  const [dates, setDates] = useState({ ...initialValues });
  const [mainData, setMainData] = useState({
    id_empresa: Number(session?.usuario.empresa.id),
    cod_categoria: router?.query?.cod,
    aplicacao: router?.query?.id,
    desc_aplicacao: router?.query?.desc,
  });

  const getDadosCadastrosPages = useCallback(async () => {
    try {
      const response = await request.GetConfigById(Number(router.query.id));
      const data = response.data;
      setColumnData([data]);
      setAppData(data.cadastro_dados_id);
      data.chave_8 && setDates({ ...dates, chave_8: true });
      data.valor_date_1 && setDates({ ...dates, valor_date_1: true });
      data.valor_date_2 && setDates({ ...dates, valor_date_2: true });
      data.valor_date_3 && setDates({ ...dates, valor_date_3: true });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamenteee',
        type: 'warning',
      });
    }
  }, []);

  useEffect(() => {
    getDadosCadastrosPages();
  }, []);

  async function saveChanges() {
    try {
      await appData.forEach(async data => {
        await request
          .CreateDado({
            id_empresa: mainData.id_empresa,
            // cod_categoria: String(mainData.cod_categoria),
            aplicacao: Number(mainData.aplicacao),
            // desc_aplicacao: String(mainData.desc_aplicacao),
            ...data,
          })
          .then(() => console.log('Update concluído!'));
      });
      setToast({
        text: 'Cadastro concluído',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  const gatheredData = useMemo(() => {
    const allData: any = [];
    if (appData) {
      appData.forEach((item, i) => {
        allData.push({
          ...item,
        });
      });
    }
    // console.log('allData', allData);
    return allData;
  }, [appData]);

  async function getValidColumns() {
    const newAppData = [...appData];
    newAppData.push({ ...appInitialValue });
    setAppData(newAppData);
  }

  // useEffect(() => {
  //   console.log('appdata', appData);
  // }, [appData]);

  return (
    <>
      <Head>
        <title>Orion | Dados de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>{`Cadastro de ${router.query.app}`} </h2>
      <BtnRow>
        <button onClick={() => getValidColumns()}>
          <span>
            <Filter />
          </span>
          Filtrar
        </button>
        <button onClick={() => saveChanges()}>Salvar</button>
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
            {gatheredData.map((item: IDados, i: number) => (
              <CollumHide key={i}>
                <td></td>
                <td className={!item.chave_1 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.chave_1}
                    name="chave_1"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_1 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_2?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_2}
                    name="chave_2"
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_2 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_3?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_3}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_3 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_4?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_4 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_5?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_5 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_6?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_6}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_6 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.chave_7?.trim() ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.chave_7}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_7 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.chave_8 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.chave_8 &&
                      format(new Date(item.chave_8), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].chave_8 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_1 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_1}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_1 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_2 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_2}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_2 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_3 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_3}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_3 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_4 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_4 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_5 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_5 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_6 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_6}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_6 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_7 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_7}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_7 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_8 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_8}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_8 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_9 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_9}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_9 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_string_10 ? 'hideSeek' : ''}>
                  <input
                    type="text"
                    value={item.valor_string_10}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_string_10 = e.target.value;
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_number_1 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.valor_number_1}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_1 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!item.valor_number_2 ? 'hideSeek' : ''}>
                  <input
                    type="number"
                    value={item.valor_number_2}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_2 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td
                  className={
                    !item.valor_number_3 || item.valor_number_3 === '0'
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={Number(item.valor_number_3)}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_3 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td
                  className={
                    !item.valor_number_4 || item.valor_number_4 === '0'
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={item.valor_number_4}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_4 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td
                  className={
                    !item.valor_number_5 || item.valor_number_5 === '0'
                      ? 'hideSeek'
                      : ''
                  }
                >
                  <input
                    type="number"
                    value={item.valor_number_5}
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_number_5 = Number(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_1 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_1 &&
                      format(new Date(item.valor_date_1), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_1 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_2 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_2 &&
                      format(new Date(item.valor_date_2), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_2 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td className={!dates.valor_date_3 ? 'hideSeek' : ''}>
                  <input
                    type="Date"
                    value={
                      item.valor_date_3 &&
                      format(new Date(item.valor_date_3), 'dd/MM/yyyy')
                    }
                    onChange={e => {
                      const newAppData = [...appData];
                      newAppData[i].valor_date_3 = new Date(e.target.value);
                      setAppData(newAppData);
                    }}
                  />
                </td>
                <td></td>
              </CollumHide>
            ))}
          </tbody>
        </table>
      </TableGrid>
    </>
  );
}

DadosCadastros.auth = true;

/*
 onChange={e => {
                        const newAppData = [...appData];
                        newAppData[i].chave_2 = e.target.value;
                        setAppData(newAppData);
                      }}
*/
