import React, { useState, useEffect, useRef } from "react";
import { TwitterButton, DiscordButton, InstagramButton } from "ui";
import { swr as useSWR } from 'lib'
import { useSession } from 'next-auth/react'
import prisma from 'db'
import { safeFetch } from 'fetcher';
import { useRouter } from 'next/router'


export const SocialButtons = () => {
  const router = useRouter()
  let fullname = React.createRef();
  const { data: session, status } = useSession();
  const [userfullname, setFullname] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [twitterConnect, setTwitterConnect] = useState<any | null>('Connect Twitter');
  const [discordConnect, setDiscordConnect] = useState<any | null>('Connect Discord');
  const [instagramConnect, setInstagramConnect] = useState<any | null>('Connect Instagram');
  const [walletConnect, setWalletConnect] = useState<any | null>('Connect Wallet');
  const [disabled, setDisabled] = useState(true);

  const { data: discordUser } = useSWR(session ? '/api/discord' : null)
  const { data: twitterUser } = useSWR(session ? '/api/twitter' : null)
  const { data: instagramUser } = useSWR(session ? '/api/instagram' : null)
  const { data: walletUser } = useSWR(session ? '/api/wallet' : null)

  const handleWallet = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(account);
  };

  const handleTextBoxChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setFullname(e.target.value);
  };

  const handleNavigation = async () => {
    const data = await safeFetch('/api/wallet', {
      body: {
        username: userfullname,
        address: walletAddress,
      },
    })
    if (data) {
      console.log(data);
      router.push('/')
    }
    else {
      console.log(data);
      router.push('/')
    }
  };

  useEffect(() => {
    if (discordUser?.discordId) {
      setDiscordConnect('Connected Discord')
    }
    if (twitterUser?.twitterId) {
      setTwitterConnect('Connected Twitter')
    }
    if (instagramUser?.instagramId) {
      setInstagramConnect('Connected Instagram')
    }
    if (walletUser?.name) {
      setWalletAddress(walletUser.Wallet?.address);
      setFullname(walletUser.name);
      setWalletConnect('Connected Wallet');
    }

    if (discordUser?.discordId && twitterUser?.twitterId && instagramUser?.instagramId) {
      setDisabled(false)
    }

  }, [discordUser, twitterUser, instagramUser, walletUser])

  return (
    <div className="stepOne">
      <h2 className="mainheading">Sign up for MADminds Drop</h2>
      <br />
      <h3 className="subheading">Please complete your details to begin</h3>
      <br />
      <input onChange={handleTextBoxChange} className="input" placeholder="Full Name" type="text" id="fname" name="fullname" value={userfullname} /><br /><br />
      <TwitterButton btntxt={twitterConnect} /><br /><br />
      <DiscordButton btntxt={discordConnect} /><br /><br />
      <InstagramButton btntxt={instagramConnect} /><br /><br />
      <input className="input" placeholder="Wallet" type="text" id="wallet" name="wallet" value={walletAddress} /><br /><br />
      <button className="button" onClick={handleWallet} >{walletConnect}</button><br /><br />
      <input className="button" onClick={handleNavigation} type="submit" value="Submit" />
      <style jsx>{`
        .stepOne {
          max-width: 400px;
          margin: 0 auto;
          padding: 25px;
          border: 1px solid gray;
        }

        .stepOne :global(.button) {
          background: white;
          color: black;
          border: 1px dashed gray;
          padding: 10px 60px;
          width: 100%;
          cursor: pointer;
        }

        .stepOne :global(.input) {
          background: white;
          color: black;
          border: 1px dashed gray;
          padding: 10px 60px 10px 5px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};
