import React, {useState, useEffect} from 'react'
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { useRouter } from "next/router";
import {InputContainer, BottomContainer, ButtonStyle, SmallInputs, Column} from "./style"
import { Checkbox } from '@material-ui/core';
import { useToasts } from "@geist-ui/react";
import * as accounts from "@services/planos"
import { initialValues } from '@utils/values';


export default function PlanoCadastro() {
    const router = useRouter();
    const [ account, setAccount] = useState({...initialValues})
    const [applications, setApplications] = useState<number[]>([])
    const [, setToast] = useToasts();


    const gatherApplications = (e: any)  => {
        const findApps = applications.find(value => value === Number(e))
        
        if (!findApps) {
            setApplications(state => [...state, Number(e)])
          return
        }
        setApplications(state => state.filter(value => value !== e))
        }

        // useEffect(() => {
        //    console.log(`applications`, applications)
        //    console.log(`account.applications`, account)
        // }, [applications, account])


    async function createAccount () {
        try {
            if(!account.description || !account.invoiceQuantity || !account.usersQuantity || !applications){
                setToast({
                    text: "Favor inserir dados válidos",
                    type: "warning"
                });
                return
            }
            await accounts.criar({nome: account.name, 
                                descricao: account.description, 
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

    

    return (
        <>
            <Head>
                <title>Orion | Cadastrar Plano</title>
            </Head>
            <BotaoVoltar />
            <h2>Cadastrar Planos</h2>
            <InputContainer>
                <div>
                    <div>
                        <span>Nome do Plano</span>
                        <input type="text" 
                            onChange={(e) => setAccount({...account, name: e.target.value})}/>
                    </div>
                <div>
                    <span>Descrição</span>
                    <textarea 
                        onChange={(e) => setAccount({...account, description: e.target.value})} 
                        maxLength={1000}></textarea>
                </div>
                <SmallInputs>
                    <Column>
                        <div>
                            <div>
                                    <span>Quantidade de Notas</span>
                                    <input type="text" 
                                        onChange={(e) => setAccount({...account, invoiceQuantity: Number(e.target.value)})}/>
                            </div>
                            <div>
                                    <span>Duração (em dias)</span>
                                    <input type="text" 
                                        onChange={(e) => setAccount({...account, duration : Number(e.target.value)})}/>
                            </div>
                        </div>
                    </Column>
                    <Column>
                        <div>
                            <div>
                                <span>Quantidade de Usuários</span>
                                <input type="text" 
                                    onChange={(e) => setAccount({...account, usersQuantity : Number(e.target.value)})}/>
                            </div>
                            <div>
                                <span>Valor da Mensalidade</span>
                                <input type="number" 
                                    min="0.00" 
                                    max="10000.00" 
                                    step="0.01" 
                                    defaultValue="0.00" 
                                    onChange={(e: any) => setAccount({...account, value : e.target.value})} />
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
                                <Checkbox onChange={() => gatherApplications(1)}/>
                            </span>
                            <h6>Nf-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(3)}/>
                            </span>
                            <h6>Nfs-e</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(2)}/>
                            </span>
                            <h6>Ct-e</h6>
                        </div>
                        <div>
                            <span>
                                <Checkbox onChange={() => gatherApplications(4)}/>
                            </span>
                            <h6>Controle de Portaria</h6>
                        </div>
                    </div>
                </div>
            </BottomContainer>
            <ButtonStyle>
                <button onClick={createAccount}>
                    Confirmar
                </button>
            </ButtonStyle>
        </>
    )
}


PlanoCadastro.auth = true