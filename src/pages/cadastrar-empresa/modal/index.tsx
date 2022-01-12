import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import { Modal } from '@styles/modal';

const ModalEmpresa = () => {

    return <Modal>
        <div>
            <h6>
                Cadastro concluído com sucesso! Dentro de instantes maiores instruções serão enviadas através do e-mail cadastrado.
            </h6>
            <div>
                <button>
                    OK
                </button>
            </div>
        </div>
    
    
    </Modal>
}

export default ModalEmpresa