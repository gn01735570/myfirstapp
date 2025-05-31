import Greeting from './components/Greeting';
import ProfileCard from './components/ProfileCard';
import Button from './components/Button';
function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial"}}>
      <h1>Welcome to React</h1>
      <Greeting />
      <ProfileCard
        name="Jane"
        title="Frontend Engineer"
        avatar="https://i.pravatar.cc/150?img=5"
      />
      <Button />
    </div>
  );
}

export default App;