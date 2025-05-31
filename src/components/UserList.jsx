import { useState, useEffect } from 'react';
import Card from './Card';

function UserList(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            if(!res.ok) throw new Error("error:" + res.status);
            return res.json();
        })
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error: {error}</p>;

    return (
        <Card>
        <div>
            <h1>User List </h1>    
        <table>
            <thead><tr><th>姓名</th><th>Email</th></tr></thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        </Card>
    );
}

export default UserList;