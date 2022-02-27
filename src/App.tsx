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