import React, { useState, useMemo, useEffect} from 'react'; 
import { Speedometer } from './style';
import GaugeChart from "react-gauge-chart"
import {
    Button,
    Loading,
    Popover,
    Row,
    Spacer,
    Table,
    Select,
    Text,
  } from "@geist-ui/react";
  import { Calendar } from '@geist-ui/react-icons'
import { useSession } from "next-auth/client";
import Head from "next/head";
import api from '@services/api';

interface SelectProps {
    className: string
}

interface IUsuario  {
  id: number;
  nome: string;
  email: string;
};


export default function Dashboard() {
   
  const chartStyle = {
    height: 50,
  }
 
 

    return  <>
    <Head>
        <title>Orion | Dashboard</title>
    </Head>
    <h2>Dashboard Comercial</h2>

  
  {/* <div style={{height: "35vh"}}>
  <h3>Nf-e</h3>
  <h3>Ct-e</h3>
  <h3>Nfs-e</h3>
  <h3>Portaria</h3>
  <h3>Perfis</h3>
  </div> */}
<Speedometer>
          <div>
            <h3>Notas</h3>
            <GaugeChart arcWidth={0.1} 
              nrOfLevels={38} percent={0.4} style={chartStyle} animateDuration={500}
              id="gauge-chart1" hideText/>
              <span>
                <h5> /</h5>
              </span>
          </div>
          <div>
            <h3>Usuários</h3>
            <GaugeChart arcWidth={0.1} style={chartStyle}
              nrOfLevels={38} percent={0.1} animateDuration={1500}
              id="gauge-chart2" hideText/> 
              <span>
                <h5> /</h5>
              </span> 
          </div>
        </Speedometer>
    
    </>
}


Dashboard.auth = true 