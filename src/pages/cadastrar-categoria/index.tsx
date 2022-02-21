import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { PageContent, InputStyles } from './style';
import * as request from '@services/categorias';

export default function CadastroCategoria() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  const [register, setRegister] = useState({
    name: '',
    description: '',
  });

  async function registerCategory() {
    try {
      await request.CreateCategory({
        cod_categoria: register.name,
        desc_categoria: register.description,
        user_insert: Number(session?.usuario.id),
        id_empresa: 1,
      });
      setToast({
        text: 'Categoria cadastradacom sucesso',
        type: 'success',
      });
      router.push('categorias-cadastros');
    } catch (error) {
      console.log(error);
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
  }

  return (
    <>
      <Head>
        <title>Orion | Cadastro de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Cadastro de Aplicativos</h2>
      <AddBtn style={{ padding: '0 35px' }}>
        <button onClick={() => registerCategory()}>Confirmar</button>
      </AddBtn>
      <PageContent>
        <InputStyles>
          <label htmlFor="title">Nome da Categoria</label>
          <input
            type="text"
            id="title"
            onChange={e => setRegister({ ...register, name: e.target.value })}
          />
        </InputStyles>
        <InputStyles>
          <label htmlFor="description">Descrição da Categoria</label>
          <input
            type="text"
            id="description"
            className="description"
            onChange={e =>
              setRegister({ ...register, description: e.target.value })
            }
          />
        </InputStyles>
      </PageContent>
    </>
  );
}

CadastroCategoria.auth = true;
