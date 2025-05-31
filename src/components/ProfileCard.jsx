function ProfileCard({name, title, avatar}) {
    return (
        <div style={{ border:"1px solid #ccc", padding: "1rem", borderRadius: "8px", marginTop:"1rem", width:"250px"}}>
            <img src={avatar} alt={name} style={{borderRadius:"50%", width:"80px"}}/>
            <h3>{name}</h3>
            <p>{title}</p>
        </div>
    );
}

export default ProfileCard;