import { useState } from "react";
import Card from "./Card";
function Greeting() {
    const [name, setName] = useState("Wendy");
    return (
        <Card>
            <p>Hello, {name}!</p>
            <input
                type="text"
                placeHolder="enter your name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    borderRadius:"8px",
                    border:"1px solid #aaa"
                }}
            />
        </Card>
    );
}

export default Greeting;