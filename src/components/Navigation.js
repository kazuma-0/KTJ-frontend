import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
const links = [
  {
    label: "Clubs",
    url: "/clubs",
  },
  {
    label: "Events",
    url: "/events",
  },
  {
    label: "Blog",
    url: "/blog",
  },
  {
    label: "Tweets",
    url: "/tweets"
  }
];

function Navigation() {
  const { publicKey } = useWallet();

  return (
    <div
      className="h-[110px] container
        mx-auto max-w-[calc(100vw_-_10%)] flex items-center justify-between"
    >
      <div className={"text-4xl font-bold tracking-wide"}>KAHE</div>
      <div className="hidden lg:flex justify-around space-x-10">
        {links.map((item) => {
          return (
            <Button
              key={item.url}
              as={Link}
              variant={"ghost"}
              fontSize={"lg"}
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
