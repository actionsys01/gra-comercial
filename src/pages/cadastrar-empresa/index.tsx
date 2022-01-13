import React, {useState, useCallback, useEffect} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {CompanyRegister} from "./style";
import { BottomConfirmBtn } from 'src/styles/buttons'; 
import * as companies from "@services/empresas"
import * as accounts from "@services/planos"
import { useToasts } from "@geist-ui/react";
import ModalEmpresa from './modal';
import MaskedCnpj from '@components/MaskedCnpj';
export interface AccountProps {
    id: number;
    nome: string;
    descricao: string
    desconto: number;
    usuarios: number;
    valor: number;
    dias: number;
    notas: string;
}

export default function CadastrarEmpresa() {
    const router = useRouter();
    const [company, setCompany] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");   
    const [email, setEmail] = useState<string>("");
    const [socialName, setSocialName] = useState<string>("");
    const [account, setAccount] = useState(0);
    const [, setToast] = useToasts();
    const [ accountData, setAccountData] = useState<AccountProps[]>([])
    const [ visibleModal, setVisibleModal ] = useState(false)

    const getAccounts = useCallback(async () => {
        const response = await accounts.getAllAccounts();
        const data = response.data
        setAccountData(data)
    }, [])

    useEffect(() => {
        getAccounts()
    }, [])

    async function createCompany(e: any) {
        e.preventDefault()
        try {
            if(!socialName || !company || !cnpj || !email ) {
                setToast({
                    text: "Por favor insira dados válidos.",
                    type: "warning"
                });
                return
            }
            await companies.create({razao_social: socialName, 
                nome_fantasia: company, 
                cnpj: cnpj, 
                email: email,
                status: 1, 
                plano_id: Number(account)})
                setVisibleModal(true)
            setToast({
                text: "Empresa cadastrada com sucesso.",
                type: "success"
            })
        } catch (error: any) {
            console.log(error.response.mensagem)
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning"
            })
        router.push({pathname: "/empresas"})
        }
        
    }

    useEffect(() => {
       console.log(`cnpj`, cnpj)
    }, [cnpj])

    return (
        <>
            <Head>
                <title>Orion | Cadastrar Empresas</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Empresa</h2>
            {visibleModal && <ModalEmpresa />}
            <CompanyRegister>
                <form onSubmit={createCompany}>
                    <div className="container">
                        <div>
                            <span >Empresa</span>
                            <input type="text" onChange={(e) => setCompany(e.target.value)}/>
                        </div>
                        <div>
                            <span>Razão Social</span>
                            <input type="text" onChange={(e) => setSocialName(e.target.value)}/>
                        </div>
                        <div >
                            <span>E-mail do responsável pela empresa</span>
                            <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <span>CNPJ</span>
                            <MaskedCnpj value={cnpj} onChange={(event: any) => setCnpj(event.target.value)}/>
                        </div>
                        <div>
                            <span>Plano</span>
                            <select onChange={(e) => setAccount(Number(e.target.value))}>
                                <option defaultValue="">Selecione</option>
                                {accountData.map((item, i ) => (
                                    <option key={i} value={item.id}>
                                        {item.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <BottomConfirmBtn>
                    <button type="submit">
                        Confirmar
                    </button>
                </BottomConfirmBtn>
                </form>
            </CompanyRegister>
        </>
    )
}

CadastrarEmpresa.auth = true
