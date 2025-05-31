function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial"}}>
      <h1>Welcome to React</h1>
      <Greeting name="Wendy"/>
      <ProfileCard
        name="Jane"
        title="Frontend Engineer"
        avatar="https://i.pravatar.cc/150?img=5"
      />
    </div>
  );
}

export default App;