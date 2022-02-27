import React, { useState } from 'react';
import {Item} from './Item'
import {InputItem} from './InputItem'

export const ShoppingList = ()=>{
    const [items, setItems] = useState([]);
    const handleAddItem =(item:any)=>{
        console.log('en shoppinglist add item',item)
        setItems([...items, item])
    }
    
    return(

        <div>
            {items.map((it)=><Item  key={it.ingredient} item={it}/>)}
            <div>
                <InputItem onAddItem={handleAddItem}/>
            </div>      
        </div>
    )
}