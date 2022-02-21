import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useSession } from 'next-auth/client';
import { useToasts } from '@geist-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BotaoVoltar from '@components/BotaoVoltar';
import { AddBtn } from '@styles/buttons';
import { PageContent, InputStyles } from '../cadastrar-categoria/style';
import * as request from '@services/categorias';

export default function CadastroCategoria() {
  const [, setToast] = useToasts();
  const [session] = useSession();
  const router = useRouter();

  console.log('router.query', router.query)

  const [register, setRegister] = useState({
    name: router?.query?.cod?.toString(),
    description: router?.query?.desc?.toString(),
  });

  async function registerCategory() {
    try {
      await request.UpdateCategory({
        cod_categoria: String(router.query.cod),
        desc_categoria: String(register.description),
        user_update: Number(session?.usuario.id),
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
        <title>Orion | Atualização de Aplicativos</title>
      </Head>
      <BotaoVoltar />
      <h2>Atualizar Aplicativos</h2>
      <AddBtn style={{ padding: '0 35px' }}>
        <button onClick={() => registerCategory()}>Confirmar</button>
      </AddBtn>
      <PageContent>
        <InputStyles>
          <label htmlFor="title">Nome da Categoria</label>
          <input
            type="text"
            id="title"
            value={register.name}
            disabled
            // onChange={e => setRegister({ ...register, name: e.target.value })}
          />
        </InputStyles>
        <InputStyles>
          <label htmlFor="description">Descrição da Categoria</label>
          <input
            type="text"
            id="description"
            className="description"
            value={register.description}
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
