import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import blockies from 'ethereum-blockies';
import './index.css'; // Import the CSS styles
import Loader from './loader'; // Import the Loader component

const GET_TOP_PLAYERS = gql`
  {
    players(first: 10, orderBy: totalTransferred, orderDirection: desc) {
      id
      totalTransferred
    }
  }
`;

const GET_PLAYER_TRANSFERS = gql`
  query GetPlayerTransfers($playerId: Bytes!) {
    transfers(where: { from: $playerId }) {
      contract
      value
      timestamp
    }
  }
`;

const Leaderboard = () => {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [playerTransfers, setPlayerTransfers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { loading, error, data, refetch } = useQuery(GET_TOP_PLAYERS);
  const { loading: transfersLoading, data: transfersData, refetch: refetchTransfers } = useQuery(GET_PLAYER_TRANSFERS, {
    variables: { playerId: expandedPlayer },
    skip: !expandedPlayer,
    onCompleted: (data) => {
      setPlayerTransfers(data.transfers);
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
      if (expandedPlayer) {
        refetchTransfers();
      }
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [expandedPlayer, refetch, refetchTransfers]);

  const generateAvatar = (address) => {
    return blockies.create({
      seed: address,
      size: 8,
      scale: 4,
    }).toDataURL();
  };

  const togglePlayerDetails = (playerId) => {
    if (expandedPlayer === playerId) {
      setExpandedPlayer(null);
      setPlayerTransfers([]);
    } else {
      setExpandedPlayer(playerId);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="last-updated">
        <p>Last updated: {lastUpdated.toLocaleString()}</p>
      </div>

      <div className="game-info">
        <h2>About Axie Infinity</h2>
        <p>
        Axie Infinity is a play-to-earn blockchain-based game that allows players to collect, breed, and battle digital pets known as Axies. Each Axie is a unique creature, represented by an NFT (Non-Fungible Token) with its own traits, abilities, and rarity. Players can assemble teams of Axies to engage in battles, participate in quests, and compete in seasonal tournaments.
        more info on the in game mechanices can be found here https://axieinfinity.com/.
    
        
        Axie Infinity features a robust in-game economy powered by blockchain technology:
         AXS (Axie Infinity Shards): A governance token that allows holders to participate in decision-making for the game's future. Players can earn AXS by competing in seasonal tournaments, staking, or trading Axies.
        SLP (Smooth Love Potion): A utility token earned by playing the game. SLP is used to breed new Axies, providing players with tangible rewards for their in-game efforts.
        NFT Marketplace: Players can buy, sell, and trade Axies on a decentralized marketplace. Each transaction is recorded on the Ethereum blockchain, ensuring transparency and ownership verification.
        </p>
        <p>
        The leaderboard showcases the top players in Axie Infinity, ranking them based on their total token transfers of AXS and SLP. This leaderboard offers a unique glimpse into the activities of the most dedicated players within the Axie Infinity ecosystem.
        To explore more details about a specific player's activities, simply click on their Player ID. This will reveal their recent transfers of AXS and SLP tokens, including information about the amount transferred, the contract used, and the timestamp of each transaction. This interactive feature gives a transparent view of in-game transactions, allowing you to delve deeper into how top players engage with the Axie Infinity marketplace and economy.
        </p>
      </div>

      <h1>Axie Infinity Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Player ID</th>
            <th>Total Tokens Transferred (AXS + SLP)</th>
            <th>View on Etherscan</th>
          </tr>
        </thead>
        <tbody>
          {data.players.map((player) => (
            <React.Fragment key={player.id}>
              <tr onClick={() => togglePlayerDetails(player.id)}>
                <td>
                  <img
                    src={generateAvatar(player.id)}
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </td>
                <td>{player.id}</td>
                <td>{parseInt(player.totalTransferred).toLocaleString()}</td>
                <td>
                  <a
                    href={`https://etherscan.io/address/${player.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Etherscan
                  </a>
                </td>
              </tr>
              {expandedPlayer === player.id && (
                <tr>
                  <td colSpan="4" className="details-section">
                    {transfersLoading ? (
                      <Loader />
                    ) : (
                      <div>
                        <h4>Recent Transfers</h4>
                        {playerTransfers.length > 0 ? (
                          <table className="transfers-table">
                            <thead>
                              <tr>
                                <th>Contract</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {playerTransfers.map((transfer, index) => {
                                const transferDate = new Date(transfer.timestamp * 1000);
                                return (
                                  <tr key={index}>
                                    <td>{transfer.contract}</td>
                                    <td>{parseInt(transfer.value).toLocaleString()}</td>
                                    <td>{transferDate.toLocaleDateString()}</td>
                                    <td>{transferDate.toLocaleTimeString()}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : (
                          <p>No transfers found.</p>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
