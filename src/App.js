import { useColorMode } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Clubs from './pages/clubs';
import Tweets from './pages/Tweets';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import Events from './pages/Events';
import Event from './pages/admin/Events';
import EditEvent from './pages/edit/EditEvent';
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => 'http://127.0.0.1:8899', []);
  const wallets = [new PhantomWalletAdapter()];
  // set the colormode to dark
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, []);

  return (
    <>
      <Router>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <Navigation />
            <Routes>
              <Route path='/' element={<>Hello</>}></Route>
              <Route path='/clubs' element={<Clubs></Clubs>}></Route>
              <Route path='/tweets' element={<Tweets></Tweets>}></Route>
              <Route path='/events' element={<Events></Events>}></Route>
              <Route path='/admin/events' element={<Event />}></Route>
              <Route path='/edit/event/:id' element={<EditEvent />}></Route>
            </Routes>
          </WalletProvider>
        </ConnectionProvider>
      </Router>
    </>
    //  <Loader/>
  );
}

export default App;
