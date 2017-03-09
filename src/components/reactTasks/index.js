import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { createStore, combineReducers } from 'redux'

/*

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

//Create store
const store = createStore(counter);

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
    document.getElementById('base')
  );
};


//call render function
store.subscribe(render);
render();


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

//Update object without mutation (toggle todo)
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

//Todo reducer (deal with individual todos/ objects)
const todo = (state, action) => {
  switch(action.type) {
    //In ass todo case return new todo
    case 'ADD_TODO' :
      return {
          id : action.id,
          text : action.text,
          completed : false
      }
    //If toggle todo, return toggled todo with id matching action id
    case 'TOGGLE_TODO' :
        //if id does not match, return the object
        if (state.id !== action.id) {
          return state;
        }
        //If the id's do match, return the items in object but overide completed with opposite
        return {
          ...state, completed : !state.completed
        };
      default :
        return state;
  }
  
}

//Todos Reducer (deal with all todos/ array)
const todos = (state = [], action) => {
  switch (action.type) {
    //Add new todo to state array
    case 'ADD_TODO' :
      return [todo(undefined, action), ...state];
    //Add toggled todo to state array
    case 'TOGGLE_TODO' :
      return state.map(t => todo(t,action));
    default :
      return state;
  }
}

//visibilityfilter reducer
//State and action argument (state is current filter)

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  //switch action, on set filter return action filter type
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER' : 
      return action.filter;
    default :
      return state;
  }
}

//Two reducers combined
const todoApp = combineReducers(
  {
    //Combined shorthand syntax
    todos,
    visibilityFilter
  }
);


//Entire app reducer
//This can all be reduced to below, so commented out
/*
const todoApp = (state = {}, action) => {
  return {
    todos : todos(state.todos, action),
    visibilityFilter : visibilityFilter(state.visibilityFilter, action)
  };
};
*/

//create store with todos reducer
const store = createStore(todoApp);

//Get visible todos 
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL' :
      return todos;
    case 'SHOW_ACTIVE' :
      return todos.filter((t) => !t.completed);
    case 'SHOW_COMPLETED' :
      return todos.filter((t) => t.completed);
  }
}

//FilterLink React component
const FilterLink = ({filter, children}) => {
  return (
      <a 
        href='#'
        onClick={(e) => {
          e.preventDefault();
          store.dispatch({
            type : 'SET_VISIBILITY_FILTER', 
            filter : filter
          })
        }}
      >{children}</a>
    );
};


let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
    //Get visible todos to display
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );
    return(
        <div>
          {/* Input new todo label */}
          <input ref={node => {this.input = node}}/>
          {/*Button that on click dispatches add_todo action with new incremetned id and input value */}
          <button onClick={() => { store.dispatch(
            {
              type : 'ADD_TODO',
              text : this.input.value,
              id : nextTodoId++
            });
            this.input.value = ' ';
          }}>ADD TODO </button>
          {/* Unordered list of todos */}
          <ul>
            {_.map(visibleTodos, (t) => {
                return <li 
                  key={t.id}
                  onClick={() => {
                    store.dispatch({type : 'TOGGLE_TODO', id : t.id})
                  }}
                  style={{textDecoration : t.completed ? 'line-through' : 'none'}}
                >{t.text}</li>
              })
            }
          </ul>
          <p>
            Show: 
              {' '}
              <FilterLink filter='SHOW_ALL'>ALL</FilterLink>
              {' '}

              {' '}
              <FilterLink filter='SHOW_ACTIVE'>ACTIVE</FilterLink>
              {' '}

              {' '}
              <FilterLink filter='SHOW_COMPLETED'>COMPLETED</FilterLink>
              {' '}
          </p>   

        </div>
      )
  }
}
//Renders Counter to div with id root
const render = () => { // render function updates DOM with counter 
  ReactDOM.render(
    <TodoApp 
      {...store.getState()}
    />,
    document.getElementById('base')
  );
};

store.subscribe(render);
render();
