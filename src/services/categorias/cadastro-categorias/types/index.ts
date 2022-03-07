import { IConfigData } from '@services/categorias/cadastro-config/types';

export interface ICategories {
  id: number;
  cod_categoria: string;
  desc_categoria: string;
}

export interface ICategoriesApps {
  id: number;
  cod_categoria: string;
  desc_categoria: string;
  cadastro_config_id: IConfigData;
}
