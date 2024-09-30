Axie Infinity is a popular play-to-earn blockchain-based game where players collect, breed, and battle digital pets called Axies. This tracker provides a comprehensive way to monitor player activities such as tracking players token transfers directly on the blockchain. The application leverages two smart contracts related to Axie Infinity's ecosystem to gather and display relevant data for gamers.
Live Demo
Check out the live application here: https://wondrous-crostata-b3af08.netlify.app/

Features
Token Transfer Tracking: Monitors Axie Infinity token transfers on the blockchain.
Leaderboard: Displays a ranked leaderboard of players based on their activities.
Blockchain Data Integration: Directly connects to the blockchain to provide real-time data about token movements and player statistics.
Graph Protocol Integration: Utilizes The Graph Protocol to fetch and organize blockchain data efficiently.
Technologies Used
React - Frontend library for building the user interface.
Graph Protocol - For querying on-chain data related to Axie Infinity.
Ethereum Blockchain - To monitor and interact with Axie Infinity’s smart contracts.
Apollo Client - For managing GraphQL data.
JavaScript/TypeScript - For scripting and building components.
Netlify - For hosting the live demo of the project.
Smart Contracts
This project uses two smart contracts on the Ethereum blockchain they include:

AXS Token Contract: This contract is responsible for the governance token of Axie Infinity. It tracks the transfers, approvals, and minting events of AXS tokens.
SLP Token Contract: The contract for Small Love Potions (SLP), an in-game currency used for breeding Axies. It tracks all relevant events, including transfers and minting activities.
The integration with these contracts allows the tracker to provide real-time insights into the game's economic activities and player behaviors.
After starting the application, you can navigate to the homepage to view the leaderboard and other statistics.
The tracker automatically fetches data from the blockchain using The Graph Protocol to display real-time token activities within the Axie Infinity ecosystem.
Contributions are welcome!
