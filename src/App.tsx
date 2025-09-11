import { Container } from '@radix-ui/themes';
import './App.css';
import Dashboard from './scene/Dashboard';

function App() {
  return (
    <div className="App">
      <Container size='4'>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
