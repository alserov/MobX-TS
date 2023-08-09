import React, {FormEvent, useEffect, useState} from 'react';
import counterStore from "./store/CounterStore";
import {observer} from "mobx-react-lite";
import todosStore from "./store/TodosStore";

const App = observer(() => {
    const {count, total, decrement, increment} = counterStore
    const {addTodo, deleteTodo, todos} = todosStore
    const [isActive, setIsActive] = useState<boolean>()
    const [time, setTime] = useState<number>(0)
    const [inputValue, setInputValue] = useState<string>('')

    useEffect(() => {
        if (isActive) {
            const timer = setInterval(() => setTime(prevState => prevState + 1), 1000)
            return (() => clearInterval(timer))
        }
    }, [isActive])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        addTodo(inputValue)
        setInputValue('')
    }

    return (
        <>
            <div className="App">
                <button onClick={() => decrement(Math.round(Math.random() * 10))}>-</button>
                <span>{count}</span>
                <button onClick={() => increment(Math.round(Math.random() * 10))}>+</button>
                <span>{total}</span>
            </div>
            <div>
                <button onClick={() => setIsActive(prevState => !prevState)}>{isActive ? 'Pause' : 'Start'}</button>
                <button onClick={() => {
                    setTime(0)
                    setIsActive(false)
                }}>Clear
                </button>
                <p>{time}</p>
            </div>
            <br/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder={'text'} onChange={(e) => setInputValue(e.currentTarget.value)}
                       value={inputValue}/>
                <button>Add</button>
            </form>
            <div>
                {todos.length > 0 && (
                    todos?.map(todo => (
                        <div onClick={() => deleteTodo(todo)}>{todo.value}</div>
                    ))
                )}
            </div>
        </>
    );
})

export default App;
