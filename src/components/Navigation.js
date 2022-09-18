import { Button, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useContext, useCallback, useMemo, useEffect } from 'react';
import SupabaseContext from '../context/SupabaseContext';
import { SupabaseClient } from '@supabase/supabase-js';
import { IconCheck, IconX } from '@tabler/icons';
const links = [
  {
    label: 'Clubs',
    url: '/clubs',
  },
  {
    label: 'Events',
    url: '/events',
  },
  {
    label: 'Blog',
    url: '/blog',
  },
  {
    label: 'Tweets',
    url: '/tweets',
  },
];

function Navigation() {
  const toast = useToast();
  const wallet = useWallet();
  const connected = wallet.publicKey;
  /**
   * @type {SupabaseClient}
   */
  const client = useContext(SupabaseContext);

  useEffect(() => {
    if (wallet.connected) {
      client
        .from('Users')
        .select('*')
        .eq('wallet', wallet.publicKey)
        .then((x) => {
          console.log(x.data.length);
          if (x.status === 200 && x.data.length === 1) {
            toast({
              title: `Logged in  as ${x.data[0].name}`,
              description: `${x.data[0].wallet}`,
              icon: <IconCheck />,
              position: 'bottom-right',
              status: 'success',
              variant: 'left-accent',
            });
            return;
          }
          wallet.disconnect();
          toast({
            title: 'Account not registered with club',
            description:
              'If you are a club member, please ask the executive members to add your profile.',
            icon: <IconX />,
            id: 1,
            position: 'bottom-right',
            status: 'warning',
            variant: 'left-accent',
          });
        });
    }
    return () => {
      return wallet;
    };
  }, [wallet.connected]);
  return (
    <div
      id='nav'
      className='h-[110px] container
        mx-auto max-w-[calc(100vw_-_10%)] flex items-center justify-between'
    >
      <div className={'text-4xl font-bold tracking-wide'}>KAHE</div>
      <div className=' lg:flex justify-around space-x-10'>
        {links.map((item) => {
          return (
            <Button
              key={item.url}
              as={Link}
              variant={'ghost'}
              fontSize={'lg'}
              to={item.url}
            >
              {item.label}
            </Button>
          );
        })}
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
        </WalletModalProvider>
      </div>
    </div>
  );
}

export default Navigation;
