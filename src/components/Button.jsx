import { useState, useEffect } from "react";
import Card from "./Card";
function Button(){
    const [clickCount, setClickCount] = useState(0); 
    const [history, setHistory] = useState([]);
    // const [max, setMax] = useState(10);//自訂最大點擊次數
    const [maxClicks, setMaxClicks] = useState(10);
    const [maxInput, setMaxInput] = useState("10"); // 綁定輸入欄位
    
    useEffect(() => {
        try{
        const stored = localStorage.getItem("clickHistory");
        if (stored) {
            setHistory(JSON.parse(stored));
        }} catch (e) {
            console.log("Failed to parse localStorage:", e);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("clickHistory", JSON.stringify(history))
    }, [history]);

    const handleClick = () => {
        if (clickCount >= maxClicks) return;
        setClickCount((prev) => prev + 1);

        const now = new Date().toLocaleString();
        setHistory((prev) => [now, ...prev]);
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