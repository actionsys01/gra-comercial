import getCategoriesPagination from './cadastro-categorias/GetCategoriesPages';
import CreateCategory from './cadastro-categorias/CreateCategory';
import UpdateCategory from './cadastro-categorias/UpdateCategory';
import DeleteCategory from './cadastro-categorias/DeleteCategory';
import GetCategoryByService from './cadastro-categorias/GetCategoryByService';
import CreateConfig from './cadastro-config/CreateConfig';
import ConfigPagination from './cadastro-config/ConfigPagination';
import UpdateConfig from './cadastro-config/UpdateConfig';
import DeleteConfig from './cadastro-config/DeleteConfig';
import GetConfigById from './cadastro-config/GetConfigById';
import CreateDado from './cadastro-dados/CreateDado';

export {
  // categorias
  getCategoriesPagination,
  CreateCategory,
  DeleteCategory,
  GetCategoryByService,
  UpdateCategory,
  // config
  CreateConfig,
  ConfigPagination,
  DeleteConfig,
  UpdateConfig,
  GetConfigById,
  //DADOS
  CreateDado,
};
