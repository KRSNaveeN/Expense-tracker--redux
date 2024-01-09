const redux = require('redux');

const counterReducer = (state={counter : 0},action)=>{

    if(action.type === "increment")
    {
        return {
            counter : state.counter+1
        }
    }

     if(action.type === 'decrement')
    {
        return {
            counter : state.counter-1
        }
    }
     if(action.type === 'incrementby2')
     {
        return {
            counter : state.counter+2
        }
     }
      if(action.type === 'decrementby2')
     {
        return {
            counter : state.counter-2
        }
     }
    
}
// reducer function should be a pure function

const store = redux.createStore(counterReducer);

const counterSubscriber = ()=>{
  const latestState =   store.getState();
  console.log(latestState);
}


store.subscribe(counterSubscriber);


store.dispatch({type : 'decrementby2'});
store.dispatch({type : 'incrementby2'});
store.dispatch({type : 'incrementby2'});
store.dispatch({type : 'incrementby2'});

// store.dispatch({type:"increment"})
// store.dispatch({type:"increment"})
// store.dispatch({type:"increment"})
// store.dispatch({type:"increment"})
// store.dispatch({type:"increment"})

// store.dispatch({type:'decrement'});

