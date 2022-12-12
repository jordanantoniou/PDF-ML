import './App.css';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 70px;
  font-weight: 600;
  background-image: linear-gradient(to top left, #000C14, #F8002F);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

function App() {
  return (
    <div className="App">
      <Title>PDF ML</Title>
    </div>
  );
}

export default App;
