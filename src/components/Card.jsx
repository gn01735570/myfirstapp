function Card( {children} ){
    return (
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.05)"
        }}>
            {children}
        </div>
    );
}

export default Card;