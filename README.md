# React-hook-forms-I


1. [Inicializamos NPM e instalamos paquetes necesarios](#schema1)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Creamos los archivos `index.html`,  `index.tsx`y `App.tsx`](#schema3)
1. [ Creamos los archivos `Item.tsx`,  `InputItem.tsx`y `ShoppingList.tsx` ](#schema4)
1. [ Modificamos `App.tsx` para añadir los componentes nuevos. ](#schema5)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Ejecutamos Typescript ](#schema2)

<hr>

<a name="schema1"></a>


# 1 Inicializamos NPM e instalamos paquetes necesarios
~~~bash
npm init -y
~~~ 
Paquetes primeros
~~~ bash
npm install typescript @types/node @types/react react react-dom  eslint
~~~
Configuramos `eslint`
~~~
npm init @eslint/config
~~~
<hr>

<a name="schema2"></a>

# 2 Ejecutamos Typescript 

~~~bash
tsc --init
~~~

<hr>

<a name="schema3"></a>

# 3 Creamos los archivos `index.html`,  `index.tsx`y `App.tsx`
- `index.html`, del cual van a colgar el resto de componentes
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React hooks form</title>
</head>
<body>
    <div id ="root"></div>
    <script type="module" src="src/index.tsx"></script>
</body>
</html>
~~~
- `index.tsx`

~~~tsx
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './App';

ReactDom.render(<App />, document.getElementById('root'));
~~~
- `App.tsx`
~~~tsx
import React from 'react';
export  const App =()=>(
   
    <p>Holsa</p>
    
)
~~~
<hr>

<a name="schema4"></a>

# 4 Creamos los archivos `Item.tsx`,  `InputItem.tsx`y `ShoppingList.tsx`
- `Item.tsx`
~~~tsx
import React from 'react';

export const Item =() => {
    return <p>Item</p>
}
~~~
- `InputItem.tsx`
~~~tsx
import React from 'react';

export const InputItem = ()=>{
    const handleAddItem =()=>{
        console.log('hola caracola add item')
    }
    return(
        <div>
          <input placeholder='Ingredient'/>
          <button  onClick={ handleAddItem } type='button'>Add Item</button>
        </div>
    )
}
~~~
- `ShoppingList.tsx`
~~~tsx
import React from 'react';
import {Item} from './Item'

import {InputItem} from './InputItem'

export const ShoppingList = ()=>{
    <div>
        <Item/>
        <Item/>
        <Item/>
        <div>
            <InputItem/>
        </div>      
    </div>
}

~~~
<hr>

<a name="schema5"></a>

# 5 Modificamos `App.tsx` para añadir los componentes nuevos.
~~~tsx
import React from 'react';
import { ShoppingList } from './components/ShoppingList'

export  const App =()=> {
    return(

        <div>
            <h2>App Shopping list</h2>
            <ShoppingList/>
        </div>
    )

}

~~~
# 6 Añadimos estilos al item, modificamos `Item.tsx`,
~~~tsx
import React from 'react';
import styled from 'styled-components';

const ItemWrap = styled.div`
padding: 5px;
border: 1px solid red;
margin: 5px
`;
export const Item =() => {
    return <ItemWrap>Item</ItemWrap>
}
~~~
# 7 Modificamos `InputItem.tsx`

~~~tsx
import React, { useState } from 'react';


export const InputItem = ()=>{
    const [ingredient, setIngridient] = useState('patata')
    const [item, setItem] = useState({ingredient:'patata', quantity:1})
    const handleAddItem =()=>{
        console.log('hola caracola add item')
    }
    
    const handleChangeIngredient = (e:any) => {
        setItem({ ...item, ingredient: e.target.value });
    };

    const handleChangeQuantity = (e:any) => {
        if (e.target.value.length === 0) {
          setItem({ ...item, quantity: e.target.value  });
          return;
        };
        const newQuantity = parseInt(e.target.value, 10);
       
        if (newQuantity !== NaN) {
          setItem({ ...item, quantity: newQuantity });
        }
    }   
    return(
        <div>
          <input  value={item.ingredient} placeholder='Ingredient' onChange={handleChangeIngredient}/>
          <input  value={item.quantity} placeholder='Quantity'onChange={handleChangeQuantity}/>
          <button  onClick={handleAddItem} type='button'>Add Item</button>
        </div>
    )
}
~~~

# 8 Añadimos props a  `InputItem.tsx`y `ShoppingList.tsx`
-`ShoppingList.tsx`
~~~tsx
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
~~~
- `InputItem.tsx`
~~~tsx
import React, { useState } from 'react';


export const InputItem = ({onAddItem})=>{
    const [ingredient, setIngridient] = useState('patata')
    const [item, setItem] = useState({ingredient:'patata', quantity:1})

    const handleAddItem =()=>{
            // console.log('Adding item');
            // console.log(item);
            onAddItem(item); 
            setItem({ ingredient: '', quantity: 1 });
         
    }
    

    const handleChangeIngredient = (e:any) => {
       
        setItem({ ...item, ingredient: e.target.value });
        
       
    };

    const handleChangeQuantity = (e:any) => {
        if (e.target.value.length === 0) {
          setItem({ ...item, quantity: e.target.value  });
          return;
        };
        const newQuantity = parseInt(e.target.value, 10);
       
        if (newQuantity !== NaN) {
          setItem({ ...item, quantity: newQuantity });
        }
    }   
    return(
        <div>
          <input  value={item.ingredient} placeholder='Ingredient' onChange={handleChangeIngredient}/>
          <input  value={item.quantity} placeholder='Quantity'onChange={handleChangeQuantity}/>
          <button  onClick={handleAddItem} type='button'>Add Item</button>
        </div>
    )
}
~~~

# 9 Modificamos `Item.tsx`,
~~~tsx
import React from 'react';
import styled from 'styled-components';

const ItemWrap = styled.div`
padding: 5px;
border: 1px solid red;
margin: 5px
`;

export const Item = ({ item: { ingredient, quantity } }) => (
  <ItemWrap>
    {ingredient}
    {' '}
    x
    {' '}
    {quantity}
  </ItemWrap>
);
~~~