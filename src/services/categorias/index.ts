import getCategoriesPagination from './cadastro-categorias/GetCategoriesPages';
import CreateCategory from './cadastro-categorias/CreateCategory';
import UpdateCategory from './cadastro-categorias/UpdateCategory';
import DeleteCategory from './cadastro-categorias/DeleteCategory';
import GetCategoryById from './cadastro-categorias/GetCategoryById';
import CreateConfig from './cadastro-config/CreateConfig';
import ConfigPagination from './cadastro-config/ConfigPagination';
import UpdateConfig from './cadastro-config/UpdateConfig';
import DeleteConfig from './cadastro-config/DeleteConfig';
import GetConfigById from './cadastro-config/GetConfigById';
import CreateDado from './cadastro-dados/CreateDado';
import DeleteDado from './cadastro-dados/DeleteDado';

export {
  // categorias
  getCategoriesPagination,
  CreateCategory,
  DeleteCategory,
  GetCategoryById,
  UpdateCategory,
  // config
  CreateConfig,
  ConfigPagination,
  DeleteConfig,
  UpdateConfig,
  GetConfigById,
  //DADOS
  CreateDado,
  DeleteDado,
};
