import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '@styles/modal';
import { useToasts } from '@geist-ui/react';
import * as request from '@services/categorias';
import { ICategories } from '@services/categorias/cadastro-categorias/types';

interface IModal {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  category: string;
  data: ICategories[];
  setData: Dispatch<SetStateAction<ICategories[]>>;
}

const CategoryModal = ({
  setVisibleModal,
  category,
  data,
  setData,
}: IModal) => {
  const [, setToast] = useToasts();

  // console.log('categrory', category);

  async function deleteCategory() {
    try {
      await request.DeleteCategory(category);
      const currentCategories = data?.filter(
        item => item.cod_categoria !== category,
      );
      setData(currentCategories);
      setToast({
        text: 'Categoria excluída com sucesso',
        type: 'success',
      });
    } catch (error) {
      setToast({
        text: 'Houve um problema. Por favor tente novamente',
        type: 'warning',
      });
    }
    setVisibleModal(false);
  }

  return (
    <Modal>
      <div>
        <h5>Deseja realmente excluir a categoria selecionada?</h5>
        <div>
          <button onClick={() => setVisibleModal(false)}>CANCELAR</button>
          <button onClick={() => deleteCategory()}>CONFIRMAR</button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
