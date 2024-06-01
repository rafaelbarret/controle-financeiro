import React from 'react';
import GridItem from "../Griditem";
import * as C from "./styles";


const Grid = ({ itens, setItems }) => {
    const onDelete = (ID) => {
        const newArray = itens.filter((transaction) => transaction.id !== ID);
        setItems(newArray);
        localStorage.setItem("transactions", JSON.stringify(newArray));
    };

  return (
    <C.Table>
       <C.Thead>
            <C.Tr>
                <C.Th width={40}>Descrição</C.Th>
                <C.Th width={40}>valor</C.Th>
                <C.Th width={10} alignCenter>Tipo</C.Th>
                <C.Th width={10}></C.Th>
            </C.Tr>
        </C.Thead> 
        <C.Tbody>
            {itens?.map((item, index) => (
                <GridItem Key={index} item={item} onDelete = {onDelete}/>
            ))}
        </C.Tbody>
    </C.Table>
  );
};

export default Grid;
