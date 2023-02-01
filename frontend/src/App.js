
import './App.css';
import AppBar from './components/AppBar';
import Notifications from './components/Notifications';
import Options from './components/Options';
import Videoplayer from './components/VideoPlayer';
import { ContextProvider } from './SocketState';

function App() {
  return (
    <>
    <ContextProvider>
    <AppBar/>
    <Videoplayer/>
    <Options/>
    <Notifications/>
    </ContextProvider>
    
    </>
  );
}

export default App;
