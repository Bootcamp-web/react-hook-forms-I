# React-hook-forms-I


1. [Inicializamos NPM e instalamos paquetes necesarios](#schema1)
1. [ Ejecutamos Typescript ](#schema2)
1. [ Creamos los archivos `index.html`,  `index.tsx`y `App.tsx`](#schema3)
1. [ Creamos los archivos `Item.tsx`,  `InputItem.tsx`y `ShoppingList.tsx` ](#schema4)
1. [ Modificamos `App.tsx` para añadir los componentes nuevos. ](#schema5)
1. [ Añadimos estilos al item, modificamos `Item.tsx`,](#schema6)
1. [ Modificamos `InputItem.tsx`](#schema7)
1. [ Añadimos props a  `InputItem.tsx`y `ShoppingList.tsx`](#schema8)
1. [ Modificamos `Item.tsx` ](#schema9)
1. [ Creamos `HaveIngredient.tsx` y `Recipe.tsx` ](#schema10)
1. [ Creando contexto `useIngredients.tsx` ,modificamos `App.tsx` , `Recipe.tsx`y  `HaveIngredient.tsx` ](#schema11)
1. [ Quitamos la función de `ShoppingList.tsx` y la ponemos en `App.tsx` ](#schema12)
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
<hr>

<a name="schema6"></a>

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
<hr>

<a name="schema7"></a>

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
<hr>

<a name="schema8"></a>

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

<hr>

<a name="schema9"></a>

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

<hr>

<a name="schema10"></a>

# 10 Creamos `HaveIngredient.tsx` y `Recipe.tsx`
- `HaveIngredient.tsx` 
~~~tsx
import React from 'react';

export const HaveIngredient = ({ ing }) => {

  if ((ing)) {
    return (
      <p style={{ color: 'green' }}>
        {' '}
        I have
        {' '}
        {ing}
      </p>
    );
  }
  return (
    <p style={{ color: 'red' }}>
      {' '}
      I dont have any
      {' '}
      {ing}
    </p>
  );
};
~~~
- `Recipe.tsx`
~~~tsx
import React from 'react';
import { HaveIngredient } from './HaveIngredient';
import { FullRecipe } from './FullRecipe';

const recipe = ['apples', 'flour', 'eggs', 'milk'];

export const Recipe = () => (
  <div>
    <h2>Recipe</h2>
    {recipe.map((e) => <HaveIngredient key={e} ing={e} />)}
    <FullRecipe recipe={recipe} />
  </div>
);
~~~
<hr>

<a name="schema11"></a>

# 11 Creando contexto `useIngredients.tsx` ,modificamos `App.tsx` , `Recipe.tsx`y  `HaveIngredient.tsx`
- `useIngredients.tsx`
Contexto conjuto de datos que se van a compratir en toda la aplicación
~~~tsx
import React, { useContext, useState } from 'react';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const ctx = useContext(IngredientsContext)
    return ctx
}

~~~
- `App.tsx`
~~~tsx
import React from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { IngredientsContext } from './lib/useIngredients';

export  const App =()=> {
    return(

        <div>
            <h2>App Shopping list</h2>
            <IngredientsContext.Provider value={{apples: 2}}>

                <ShoppingList/>
                <Recipe/>
            </IngredientsContext.Provider>
        </div>
    )

}
~~~
- `Recipe.tsx`
~~~tsx
import React from 'react';
import { useIngredient } from '../lib/useIngredients';
import { HaveIngredient } from './HaveIngredient';

const recipe = ['apples', 'flour', 'eggs', 'milk'];

export const Recipe = () => {

  const ingredients = useIngredient();
  return(

    <div>
      <h2>Recipe</h2>
      {recipe.map((e) => <HaveIngredient key={e} ing={e} />)}
    
    </div>
  )

}
~~~
- `HaveIngredient.tsx`
~~~tsx
import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const HaveIngredient = ({ ing }) => {
  const {ingredients  = useIngredient();

  if ((ing)) {
    return (
      <p style={{ color: 'green' }}>
        {' '}
        I have
        {' '}
        {ing}
      </p>
    );
  }
  return (
    <p style={{ color: 'red' }}>
      {' '}
      I dont have any
      {' '}
      {ing}
    </p>
  );
};
~~~
<hr>

<a name="schema12"></a>

# 12 Quitamos la función de `ShoppingList.tsx` y la ponemos en `App.tsx`
Para que todo el mundo tenga acceso a ella.
- `ShoppingList.tsx`
~~~tsx
import React, { useState } from 'react';
import {Item} from './Item'
import {InputItem} from './InputItem'
import { useIngredient } from '../lib/useIngredients';

export const ShoppingList = ()=>{
 
    const { addItem , ingredients } =useIngredient();
    return(

        <div>
            {ingredients.map((it)=><Item  key={it.ingredient} item={it}/>)}
            <div>
                <InputItem onAddItem={addItem}/>
            </div>      
        </div>
    )
}
~~~


- `App.tsx`
~~~tsx
import React from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { IngredientsContext } from './lib/useIngredients';

export  const App =()=> {
    const [items, setItems] = useState([]);
    const addItem = (item)=>{
       setItems([...items,item])
   }
    
    return(

        <div>
            <h2>App Shopping list</h2>
            <IngredientsContext.Provider value={{ingredients: items,addItem}}>

                <ShoppingList/>
                <Recipe/>
            </IngredientsContext.Provider>
        </div>
    )

}
~~~