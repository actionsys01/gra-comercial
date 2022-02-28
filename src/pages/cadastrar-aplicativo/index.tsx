import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { InputStyles, RowStyle, Form, InputBoxStyle, BoxTitles } from './style';
import * as request from '@services/categorias';

export default function CadastrarAplicativo() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();
  const [mainData, setMainData] = useState({
    id_empresa: Number(session?.usuario.empresa.id),
    cod_categoria: router?.query?.cod,
    aplicacao: '',
    desc_aplicacao: '',
  });

  const [register, setRegister] = useState({});

  function inputHandler(evt: any) {
    const value = evt.target.value;
    setRegister({
      ...register,
      [evt.target.id]: value,
    });
  }

  async function registerNewAppConfig() {
    try {
      await request.CreateConfig({
        id_empresa: mainData.id_empresa,
        cod_categoria: String(mainData.cod_categoria),
        aplicacao: mainData.aplicacao,
        desc_aplicacao: mainData.desc_aplicacao,
        ...register,
      });
      setToast({
        text: 'Cadastro concluído',
        type: 'success',
      });
      router.back();
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  // useEffect(() => {
  //   console.log('request', register);
  // }, [register]);

  return (
    <>
      <Head>
        <title>Orion | Cadastro de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Aplicativos</h2>
      <AddBtn>
        <button onClick={() => registerNewAppConfig()}>Confirmar</button>
      </AddBtn>
      <Form>
        <RowStyle>
          <InputStyles>
            <label htmlFor="nome">Nome do Aplicativo</label>
            <input
              type="text"
              id="nome"
              onChange={e =>
                setMainData({ ...mainData, aplicacao: e.target.value })
              }
            />
          </InputStyles>
          <InputStyles>
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              id="categoria"
              value={router.query.cod}
              disabled
            />
          </InputStyles>
        </RowStyle>
        <InputStyles>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            className="description"
            onChange={e =>
              setMainData({ ...mainData, desc_aplicacao: e.target.value })
            }
          />
        </InputStyles>
        <BoxTitles>
          <h6>Chaves de Aplicação</h6>
          <h6>Campos de Dados(Alfanuméricos)</h6>
          <h6>Campos de Dados Numéricos</h6>
        </BoxTitles>
        <InputBoxStyle>
          <div>
            <InputStyles>
              <label htmlFor="chave_1">Título Chave 1</label>
              <input
                type="text"
                id="chave_1"
                className="chave"
                placeholder="Apenas Números"
                onChange={inputHandler}
              />
              <label htmlFor="chave_2">Título Chave 2</label>
              <input
                type="text"
                id="chave_2"
                className="chave"
                placeholder="Até 20 caracteres"
                onChange={inputHandler}
                maxLength={20}
              />
              <label htmlFor="chave_3">Título Chave 3</label>
              <input
                type="text"
                id="chave_3"
                className="chave"
                placeholder="Até 20 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="chave_4">Título Chave 4</label>
              <input
                type="text"
                id="chave_4"
                className="chave"
                placeholder="Até 20 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="chave_5">Título Chave 5</label>
              <input
                type="text"
                id="chave_5"
                className="chave"
                placeholder="Até 30 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="chave_6">Título Chave 6</label>
              <input
                type="text"
                id="chave_6"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="chave_7">Título Chave 7</label>
              <input
                type="text"
                id="chave_7"
                className="chave"
                placeholder="Até 100 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="chave_8">Título Chave 8</label>
              <input
                type="text"
                id="chave_9"
                className="chave"
                placeholder="Apenas Datas"
                maxLength={20}
                onChange={inputHandler}
              />
            </InputStyles>
          </div>
          <div>
            <InputStyles>
              <label htmlFor="valor_string_1">Título Dado Alfa 1</label>
              <input
                type="text"
                id="valor_string_1"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_2">Título Dado Alfa 2</label>
              <input
                type="text"
                id="valor_string_2"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_3">Título Dado Alfa 3</label>
              <input
                type="text"
                id="valor_string_3"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_4">Título Dado Alfa 4</label>
              <input
                type="text"
                id="valor_string_4"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_5">Título Dado Alfa 5</label>
              <input
                type="text"
                id="valor_string_5"
                className="chave"
                placeholder="Até 50 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_6">Título Dado Alfa 6</label>
              <input
                type="text"
                id="valor_string_6"
                className="chave"
                placeholder="Até 255 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_7">Título Dado Alfa 7</label>
              <input
                type="text"
                id="valor_string_7"
                className="chave"
                placeholder="Até 255 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_8">Título Dado Alfa 8</label>
              <input
                type="text"
                id="valor_string_8"
                className="chave"
                placeholder="Até 255 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_9">Título Dado Alfa 9</label>
              <input
                type="text"
                id="valor_string_9"
                className="chave"
                placeholder="Até 255 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_string_10">Título Dado Alfa 10</label>
              <input
                type="text"
                id="valor_string_10"
                className="chave"
                placeholder="Até 255 caracteres"
                maxLength={20}
                onChange={inputHandler}
              />
            </InputStyles>
          </div>
          <div>
            <InputStyles>
              <label htmlFor="valor_number_1">Título Dado Num. 1</label>
              <input
                type="text"
                id="valor_number_1"
                className="chave"
                placeholder="Apenas Números"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_number_2">Título Dado Num. 2</label>
              <input
                type="text"
                id="valor_number_2"
                className="chave"
                placeholder="Apenas Números"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_number_3">Título Dado Num. 3</label>
              <input
                type="text"
                id="valor_number_3"
                className="chave"
                placeholder="Apenas Números Decimais"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_number_4">Título Dado Num. 4</label>
              <input
                type="text"
                id="valor_number_4"
                className="chave"
                placeholder="Apenas Números Decimais"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_number_5">Título Dado Num. 5</label>
              <input
                type="text"
                id="valor_number_5"
                className="chave"
                placeholder="Apenas Números Decimais"
                maxLength={20}
                onChange={inputHandler}
              />
            </InputStyles>
            <InputStyles style={{ marginTop: '35px' }}>
              <label htmlFor="valor_date_1">Título Data 1</label>
              <input
                type="text"
                id="valor_date_1"
                className="chave"
                placeholder="Apenas Datas"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_date_2">Título Data 2</label>
              <input
                type="text"
                id="valor_date_2"
                className="chave"
                placeholder="Apenas Datas"
                maxLength={20}
                onChange={inputHandler}
              />
              <label htmlFor="valor_date_3">Título Data 3</label>
              <input
                type="text"
                id="valor_date_3"
                className="chave"
                placeholder="Apenas Datas"
                maxLength={20}
                onChange={inputHandler}
              />
            </InputStyles>
          </div>
        </InputBoxStyle>
      </Form>
    </>
  );
}

CadastrarAplicativo.auth = true;
