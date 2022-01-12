import React, {useState, useCallback, useMemo, useEffect} from 'react'
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import {InputContainer, BottomContainer, ButtonStyle, SmallInputs, Column} from "../cadastrar-plano/style"
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import * as accounts from "@services/planos";
import { initialValues } from '@utils/values';

export default function AtualizarPlano() {
    const router = useRouter();
    const [ account, setAccount] = useState({
        name: router.query.nome as string,
        description: router.query.descricao as string,
        duration: Number(router.query.dias),
        invoiceQuantity: Number(router.query.notas),
        usersQuantity: Number(router.query.usuarios),
        discount: 0,
        value: Number(router.query.valor),
    })
    const [applications, setApplications] = useState<number[]>([])
    const [, setToast] = useToasts();

   
    
    // checkbox states
    const [nfe, setNfe] = useState<boolean>(false)
    const [cte, setCte] = useState<boolean>(false)
    const [nfse, setNfse] = useState<boolean>(false)
    const [entrada, setEntrada] = useState<boolean>(false)
    
 


    const appData = useMemo(() => {
    const numbData: any = []
    const appNumbers: any = router.query.appIds;
    if(Array.isArray(appNumbers)) {
        const convertedNumbers = appNumbers.map((item: any) => Number(item))
        setApplications(convertedNumbers)
        return convertedNumbers
    } else {
        numbData.push(router.query.appIds)
        const convertedNumbers = numbData.map((item: any) => Number(item))
        setApplications(convertedNumbers)
        return convertedNumbers
    }
    }, [])

   const check = () => {
    if (applications.includes(1)) {setNfe(true)} 
    if (applications.includes(2)) {setCte(true)}
    if (applications.includes(3)) {setNfse(true)}
    if(applications.includes(4)) {setEntrada(true)}
   } 

   useEffect(() => {
    check()
   }, [])


    const gatherApplications = (e: any)  => {
        const findApps = applications.find(value => value === Number(e))
        
        if (!findApps) {
            setApplications(state => [...state, Number(e)])
          return
        }
        setApplications(state => state.filter(value => value !== e))
        }

    

    async function updateAccount () {
        try {
            await accounts.atualizar({id: Number(router.query.id), 
                descricao: account.description, 
                nome: account.name, 
                desconto: account.discount, 
                usuarios: account.usersQuantity, 
                notas: account.invoiceQuantity, 
                valor: Number(account.value), 
                dias: account.duration, 
                aplicacoes: applications })
            setToast({
                text: "Plano cadastrado com sucesso.",
                type: "success"
            })
        } catch (error) {
            setToast({
                text: "Houve um problema, por favor tente novamente.",
                type: "warning"
            })
        }
        router.push("/planos")
    }



    return <>
            <Head>
                <title>Orion | Atualizar Plano</title>
            </Head>
            <BotaoVoltar />
            <h2>Atualizar Planos</h2>
            <InputContainer>
                <div>
                    <div>
                        <span>Nome do Plano</span>
                        <input type="text" 
                            value={account.name} 
                            onChange={(e) => setAccount({...account, name: e.target.value})}/>
                    </div>
                <div>
                    <span>Descrição</span>
                    <textarea 
                        value={account.description} 
                        onChange={(e) => setAccount({...account, description: e.target.value})} 
                        maxLength={1000}></textarea>
                </div>
                <SmallInputs>
                    <Column>
                        <div>
                            <div>
                                <span>Quantidade de Notas</span>
                                <input type="text" 
                                    value={account.invoiceQuantity} 
                                    onChange={(e) => setAccount({...account, invoiceQuantity: Number(e.target.value)})}/>
                            </div>
                            <div>
                                <span>Duração (em dias)</span>
                                <input type="text" 
                                value={account.duration} 
                                onChange={(e) => setAccount({...account, duration : Number(e.target.value)})}/>
                            </div>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <div>
                                <span>Quantidade de Usuários</span>
                                <input type="text"  
                                    value={account.usersQuantity} 
                                    onChange={(e) => setAccount({...account, usersQuantity : Number(e.target.value)})}/>
                            </div>
                            <div>
                                <span>Valor da Mensalidade</span>
                                <input type="number"  
                                    min="0.00" 
                                    max="10000.00" 
                                    step="0.01" 
                                    value={(account.value).toFixed(2)} 
                                    onChange={(e) => setAccount({...account, value : Number( e.target.value)})}/>
                            </div>
                        </div>
                    </Column>
                </SmallInputs>
            </div>
            </InputContainer>
            <BottomContainer>
                <div className="container">
                    <span>
                    <h5>Funcionalidades contidas no plano:</h5>
                    </span>
                    <div className="row">
                        <div>
                            <span>
                                <Checkbox checked={nfe} onChange={() => gatherApplications(1)} onClick={nfe ? () => setNfe(false) : () => setNfe(true) }/>
                            </span>
                            <h6>Nf-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox checked={nfse} onChange={() => gatherApplications(3)} onClick={nfse ? () => setNfse(false) : () => setNfse(true) }/>
                            </span>
                            <h6>Nfs-e</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>
                                <Checkbox checked={cte} onChange={() => gatherApplications(2)} onClick={cte ? () => setCte(false) : () => setCte(true) }/>
                            </span>
                            <h6>Ct-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox checked={entrada} onChange={() => gatherApplications(4)} onClick={entrada ? () => setEntrada(false) : () => setEntrada(true) }/>
                            </span>
                            <h6>Controle de Portaria</h6>
                        </div>
                    </div>
                </div>
            </BottomContainer>
            <ButtonStyle>
                <button onClick={updateAccount}>
                    Confirmar
                </button>
            </ButtonStyle>
        </>
    
}

AtualizarPlano.auth = true