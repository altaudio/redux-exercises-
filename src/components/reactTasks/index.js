import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { createStore } from 'redux'

//Create store
const store = createStore(counter);

//counter reducer
function counter(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT' :
      return state + 1;
    case 'DECREMENT' :
      return state - 1;
    default :
      return state;
  }
}


const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
      <h1>{value}</h1>
      <button
        onClick={onIncrement} >+
      </button>
      <button
        onClick={onDecrement} >-
      </button>
    </div>
)


//Renders Counter to div with id root
const render = () => { // render function updates DOM with counter 
  ReactDOM.render(
    <Counter 
      value={store.getState()} 
      onIncrement={() => 
        store.dispatch({
          type: 'INCREMENT'
        })
      } 
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  )
}


//call render function
store.subscribe(render);

render();

/*
//Avoiding array mutations
//Adding to an array
let array = [1,2,3,4,5,6,7];

const addCounter = (array) => {
  return [...array, 0]
}

console.log(addCounter(array));


//Remove item from array
const removeCounter = (array, index) => {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
}

console.log(removeCounter(array, 1));

//Update object without mutation
let todo = {
  id : 0,
  text : 'hello',
  completed : false
}

// Object assign method
//
//const toggleTodo = (todo) => {
//  return Object.assign({}, todo, {completed : true});
//} 


// Spread method (nice and easy)
const toggleTodo = (todo) => {
  return {...todo, completed : !todo.completed};
};

console.log('Todo before toggleTodo:');
console.log(todo);
console.log('Array returned from toggleTodo');
console.log(toggleTodo(todo));
console.log('todo object after toggleTodo (unmutated)');
console.log(todo);
*/

