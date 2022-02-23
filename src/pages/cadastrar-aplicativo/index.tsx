import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { InputStyles, RowStyle, Form, InputBoxStyle } from './style';

export default function CadastrarAplicativo() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  // console.log('router.query', router.query);

  return (
    <>
      <Head>
        <title>Orion | Cadastro de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Aplicativos</h2>
      <AddBtn>
        <button>Confirmar</button>
      </AddBtn>
      <Form>
        <RowStyle>
          <InputStyles>
            <label htmlFor="nome">Nome do Aplicativo</label>
            <input type="text" id="nome" />
          </InputStyles>
          <InputStyles>
            <label htmlFor="categoria">Categoria</label>
            <input type="text" id="categoria" />
          </InputStyles>
        </RowStyle>
        <InputStyles>
          <label htmlFor="descricao">Descrição</label>
          <input type="text" id="descricao" className="description" />
        </InputStyles>
        <InputBoxStyle>
          <div>
            <InputStyles>
              <label htmlFor="descricao">Título Chave 1</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 2</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 3</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 4</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 5</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 6</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 7</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Chave 8</label>
              <input type="text" id="descricao" className="chave" />
            </InputStyles>
          </div>
          <div>
            <InputStyles>
              <label htmlFor="descricao">Título Dado Alfa 1</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 2</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 3</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 4</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 5</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 6</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 7</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Alfa 8</label>
              <input type="text" id="descricao" className="chave" />
            </InputStyles>
          </div>
          <div>
            <InputStyles>
              <label htmlFor="descricao">Título Dado Num. 1</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Num. 2</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Num. 3</label>
              <input type="text" id="descricao" className="chave" />
              <label htmlFor="descricao">Título Dado Num. 4</label>
              <input type="text" id="descricao" className="chave" />
            </InputStyles>
          </div>
        </InputBoxStyle>
      </Form>
    </>
  );
}

CadastrarAplicativo.auth = true;
