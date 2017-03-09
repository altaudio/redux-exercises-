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
const FilterLink = ({filter, onClick, children}) => {
  return (
      <a 
        href='#'
        onClick={(e) => {
          e.preventDefault();
          onClick(filter);
        }}
      >{children}</a>
    );
};

//Extracting todo component which renders a single todo
const Todo = ({onClick, completed, text}) => (
  <li
    onClick={onClick}
    style={{textDecoration : completed ? 'line-through' : 'none'}}
  >{text}</li>
);

//Extracting Todolist component, accepts array of todos and renders a <ul>
const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

//Extracted addTodo component
const AddTodo = ({onAddClick}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = ' ';
      }}>Add Todolist
      </button>
    </div>
  );
};

//Extracted Footer filter link
const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show: 
    {' '}
    <FilterLink 
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
      >ALL</FilterLink>
    {' '}

    {' '}
    <FilterLink 
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >ACTIVE</FilterLink>
    {' '}

    {' '}
     <FilterLink 
        filter='SHOW_COMPLETED'
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>COMPLETED</FilterLink>
    {' '}
  </p> 
)


let nextTodoId = 0;
const TodoApp = ({todos, visibilityFilter}) => (
  <div>
    {/* Input and addTodo button */}
    <AddTodo onAddClick = {text => 
      store.dispatch({
        type : 'ADD_TODO',
        id : nextTodoId++,
        text
      })
    } />

    {/* Unordered list of todos */}
    <TodoList
      todos={getVisibleTodos(
        todos,
        visibilityFilter
      )}
      onTodoClick = { id =>
        store.dispatch({
          type : 'TOGGLE_TODO',
          id
      })
      } />
      <Footer 
        visibilityFilter={visibilityFilter}
        onFilterClick={filter =>
          store.dispatch({
            type : 'SET_VISIBILITY_FILTER',
            filter
          })} />
  </div>
)

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
