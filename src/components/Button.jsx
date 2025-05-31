import { useState, useEffect } from "react";
import Card from "./Card";
function Button(){
    const [clickCount, setClickCount] = useState(0); 
    const [history, setHistory] = useState([]);
    // const [max, setMax] = useState(10);//自訂最大點擊次數
    const [maxClicks, setMaxClicks] = useState(10);
    const [maxInput, setMaxInput] = useState("10"); // 綁定輸入欄位
    const LOCAL_KEY = "clickHistory";

    // componentDidMount 只會在畫面第一次載入時執行一次
    useEffect(() => {
        try{
        const stored = localStorage.getItem(LOCAL_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            setHistory(parsed);
            // react的setState是非同步的, 不是等 history state 改完才來用
            setClickCount(parsed.length);
        }} catch (e) {
            console.log("Failed to parse localStorage:", e);
        }
    }, []);

    // 用 useEffect(() => {...}, [history]) 監聽變化可行, 只有在下一輪 render（畫面重渲染）後
    useEffect(()=>{
        localStorage.setItem(LOCAL_KEY, JSON.stringify(history))
    }, [history]);

    const handleClick = () => {
        if (clickCount >= maxClicks) return;
        setClickCount((prev) => prev + 1);

        const now = new Date();
        const formatted = now.toLocaleTimeString("zh-TW",{
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        // 函式型更新, 避免非同步更新錯亂
        setHistory((prev) => [formatted, ...prev]);
    };

    const handleReset = () => {
        setClickCount(0);
        setHistory([]);
        localStorage.removeItem("clickHistory");
    };

    const handleMaxChange = (e) => {
        const value = e.target.value;
        setMaxInput(value);
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed) && parsed > 0) {
            setMaxClicks(parsed);
        }
    };

    return (
        <Card>
            <div style={{ marginBottom: "1rem"}}>
                <label>設定最大點擊次數：</label>
            <input type="number"  value={maxInput} min="1" onChange={handleMaxChange}
            style={{ marginLeft: "0.5rem", padding:"0.3rem", width:"60px", border:"1px solid #ccc", borderRadius:"6px"}}
            />
            {isNaN(parseInt(maxInput)) || parseInt(maxInput) <= 0 ? (<p style={{ color: "orange"}}>請輸入有效的正整數</p>) : null}
            </div>
            <button
            onClick={handleClick}
            disabled={clickCount >= maxClicks}
            style={{
                padding:"0.5rem 1rem",
                marginRight:"1rem",
                backgroundColor: clickCount >= maxClicks ? "#ccc" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: clickCount >= maxClicks ? "not-allowed": "pointer"
            }}>
            點我
            </button>
            <button 
                onClick={handleReset}
                style={{
                    padding: "0.5rem",
                    marginRight: "1rem",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                重置
            </button>

            <p style={{ marginTop:"1rem" }}>
                你已經點了<strong>{clickCount}次</strong> / {maxClicks} 次
            </p>
            {clickCount >= maxClicks && (<p style={{ color:"red", fontWeight:"bold"}}>已達最大點擊次數！</p>)}
            
            <hr style={{ margin: "1rem 0"}} />

            <h4>點擊歷史</h4>
            <ul>
                {history.length === 0 ? (<li style={{color:"#888"}}>尚無紀錄</li>) : history.map((timestamp, index) => (
                    <li key={index}> {timestamp} </li>
                ))}
            </ul>
            {/*
            <div style={{ marginTop: "1rem" }}>
                <button onClick={() => setClickCount(clickCount + 1)}>click</button>
                <p>你已經點了 {clickCount} 次</p>
            </div>
            */}

        </Card>
    );
}

export default Button;