import React, {useState, useCallback, useEffect} from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import BotaoVoltar from "@components/BotaoVoltar";
import {CompanyRegister} from "../cadastrar-empresa/style";
import { BottomConfirmBtn } from 'src/styles/buttons'; 
import * as companies from "@services/empresas"
import * as accounts from "@services/planos"
import { useToasts, Modal, useModal } from "@geist-ui/react";
import { AccountProps} from "../cadastrar-empresa"

export default function AtualizarEmpresa() {
    const router = useRouter();
    const [company, setCompany] = useState<string>(router.query.nome_fantasia  as string);
    const [cnpj, setCnpj] = useState<string>(router.query.cnpj as string);
    const [email, setEmail] = useState<string>(router.query.email as string);
    const [socialName, setSocialName] = useState<string>(router.query.razao_social as string);
    const [account, setAccount] = useState<number>(Number(router.query.accouuntId));
    const [ accountData, setAccountData] = useState<AccountProps[]>([])
    const [, setToast] = useToasts()

    console.log("curry",router.query)

    
    const getAccounts = useCallback(async () => {
        const response = await accounts.getAllAccounts();
        const data = response.data
        return data
    }, [])

    useEffect(() => {
        getAccounts().then(response => setAccountData(response))
    }, [])

    

        async function updateCompany(e: any) {
            e.preventDefault()
            try {
                await companies.update({empresa_id: Number(router.query.id), razao_social: socialName, nome_fantasia: company, cnpj: cnpj, email: email, status: 1, plano_id: Number(account)})
                setToast({
                    text: "Dados atualizados com sucesso.",
                    type: "success"
                })
            } catch (error) {
                setToast({
                    text: "Houve um problema, por favor tente novamente.",
                    type: "warning"
                })
            }
            router.push({pathname: "/empresas"})
        }

    return (
        <>
        <Head>
            <title>Orion | Atualizar Empresas</title>
        </Head>
        <BotaoVoltar />
        <h2>Atualizar Empresa</h2>
        <CompanyRegister>
                <form onSubmit={updateCompany}>
                    <div className="container">
                        <div>
                            <span >Empresa</span>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
                        </div>
                        <div>
                            <span>Razão Social</span>
                            <input type="text" value={socialName} onChange={(e) => setSocialName(e.target.value)}/>
                        </div>
                        <div >
                            <span>E-mail</span>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <span>CNPJ</span>
                            <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>
                        </div>
                        <div>
                        <span>Plano</span>
                        <select onChange={(e: any) => setAccount(e.target.value)}>
                        <option value="" selected disabled>{router.query.accountName}</option>
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

AtualizarEmpresa.auth = true
