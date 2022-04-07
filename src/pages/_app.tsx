import { Container, Main } from '@components/App/index';
import MenuLateral from '@components/MenuLateral';
import PaginaCarregamento from '@components/PaginaCarregamento';
// import FiltroProvider from '@contexts/filtro';
import {
  CssBaseline,
  GeistProvider,
  Themes,
  useMediaQuery,
} from '@geist-ui/react';
import FiltroContextProvider from '@contexts/filtro-cadastros';
import { AlignCenter } from '@geist-ui/react-icons';
import 'inter-ui/inter.css';
import { Provider, useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/menu-lateral.css';

interface IProps {
  children: JSX.Element;
}

const Auth = ({ children }: IProps) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const isUser = !!session?.user;

  useEffect(() => {
    if (loading) return; // Do nothing while loading
    if (!isUser) router.push(`${window.location.origin}`); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <PaginaCarregamento />;
};

export default function App({ Component, pageProps }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const isXS = useMediaQuery('xs');
  const [toggle, setToggle] = useState(false);

  const orionTheme = Themes.createFromLight({
    type: 'orion',
    palette: {
      foreground: '#1C496A',
      accents_5: '#1C496A',
      secondary: '#1C496A',
      success: '#0DD0B3',
    },
  });

  return (
    <Provider session={pageProps.session}>
      <GeistProvider themes={[orionTheme]} themeType="orion">
        <CssBaseline />
        <FiltroContextProvider>
          <ThemeProvider theme={orionTheme}>
            <Head>
              <link
                rel="icon"
                href="https://actionsys.com.br/wp-content/themes/actionsys/_assets/images/logo-desktop.png"
              />
            </Head>
            {Component.auth ? (
              <Auth>
                <Container>
                  <MenuLateral
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    toggled={toggle}
                    setToggled={setToggle}
                  />
                  <Main>
                    {isXS && <AlignCenter onClick={() => setToggle(!toggle)} />}

                    <Component {...pageProps} />
                  </Main>
                </Container>
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </FiltroContextProvider>
      </GeistProvider>
    </Provider>
  );
}
