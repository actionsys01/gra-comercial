import styled from "styled-components";

export const CompanyRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 8px;

   
     form {

        .container {

            width: 500px;
            height: 370px;
            border: 1px solid rgba(151, 151, 151, .45);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            gap: 15px;
            margin-bottom: 1rem;
        
       

       div {
           width: 100%;
            display: flex;
            flex-direction: column;
            span {
                margin: 0 0.5rem;
                font-size: 0.8rem;
        }

        input {
            max-width: 450px;
            width: 100%;
            height: calc(1.688 * 16pt);
            border: 1px solid #eaeaea;
        }}
    
    }

   }
        select {
            max-width: 450px;
            display: inline-block;
            align-items: center;
            user-select: none;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            transition: border 0.2s ease 0s,color 0.2s ease-out 0s; 
            border: 1px solid #eaeaea;
            border-radius: 5px;
            padding: 0 4pt 0 8pt;
            height: calc(1.688 * 16pt);
            min-width: 10rem;
            background-color: #fff;
            justify-content: flex-end;
            flex-wrap: wrap;
 
} 

`