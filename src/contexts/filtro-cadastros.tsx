import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import colunas_categorias from '@utils/filtros/colunas/colunas_categorias';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';

interface IUnformCompare {
  campo: string;
  valor: string | number;
  compare: string;
}

interface IFilter {
  categorias: IUnformCompare[];
  configApps: IUnformCompare[];
  registerCategory(categorias: IUnformCompare[]): void;
  registerConfigApp(apps: IUnformCompare[]): void;
  cleanFilter(): void;
  // scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
}

interface IFiltroProps {
  children: ReactNode;
}

export const FiltroCadastroContext = createContext({} as IFilter);

export function useFiltro() {
  return useContext(FiltroCadastroContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
  const [categorias, setCategorias] = useState<IUnformCompare[]>([]);
  const [configApps, setConfigApps] = useState<IUnformCompare[]>([]);

  useEffect(() => {
    async function carregarStorage() {
      const categoryStorage = localStorage.getItem('@orion:categorias');
      const configStorage = localStorage.getItem('@orion:configApps');
      if (categoryStorage) {
        setCategorias(JSON.parse(categoryStorage));
      }
      if (configStorage) {
        setConfigApps(JSON.parse(configStorage));
      }
    }
    carregarStorage();
  }, []);

  function registerCategory(category: IUnformCompare[]) {
    setCategorias(category);
    localStorage.setItem('@orion:categorias', JSON.stringify(category));
  }

  function registerConfigApp(apps: IUnformCompare[]) {
    setConfigApps(apps);
    localStorage.setItem('@orion:configApps', JSON.stringify(apps));
  }

  // function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
  //   // console.log('array', array)
  //   const filtro = array.map(({ campo, valor, compare }) => {
  //     const coluna = colunas_categorias.find(option => option.value === campo);
  //     if (coluna) {
  //       return { campo, valor, compare };
  //     }
  //   });

  //   return filtro;
  // }

  async function cleanFilter() {
    localStorage.setItem('@orion:categorias', JSON.stringify([]));
    localStorage.setItem('@orion:configApps', JSON.stringify([]));
  }

  useEffect(() => {
    console.log('configApps', configApps);
  }, [configApps]);

  return (
    <FiltroCadastroContext.Provider
      value={{
        categorias,
        registerCategory,
        cleanFilter,
        registerConfigApp,
        configApps,
        // scopeIgnition,
      }}
    >
      {children}
    </FiltroCadastroContext.Provider>
  );
}
