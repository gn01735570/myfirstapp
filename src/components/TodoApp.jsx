import { useState } from "react";
import Card from "./Card";
function TodoApp(){
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if(!input.trim()) return;
        const newTodo = {id: Date.now(), text: input, done: false};
        setTodos(prev => [newTodo, ...prev]);
        setInput("");
    };

    // 產生新物件, 因為 React 的 useState 必須靠「物件參考不同」來判斷是否重渲染：
    const toggleDone = (id) => {
        setTodos(prev => prev.map(todo => {
            todo.id === id ? {...todo, done: !todo.done} : todo
        }));
    };

    const removeTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return (
        <Card>
        <div>
            <input value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={addTodo}>新增</button>
        
        
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <span
                        onClick={() => toggleDone(todo.id)}
                        style={{ textDecoration: todo.done ? "line-through": "nonde", cursor: "pointer"}}
                    >
                        {todo.text}
                    </span>
                    <button onClick={()=> removeTodo(todo.id)}>刪除</button>
                </li>
            ))}
        </ul>
        </div>
        </Card>
    );
}

export default TodoApp;