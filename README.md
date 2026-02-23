# SoroSave — Decentralized Group Savings Protocol

A trustless rotating savings protocol (ajo/susu/chit fund) built on [Soroban](https://soroban.stellar.org/) — Stellar's smart contract platform.

SoroSave enables groups of people to pool fixed contributions each cycle, with one member receiving the full pot each round until everyone has received. This traditional savings model — used by 100M+ people across Africa, Latin America, and Southeast Asia — is now trustless, transparent, and on-chain.

## How It Works

1. **Create a Group** — Set contribution amount, cycle length, max members
2. **Members Join** — Participants join the group before it starts
3. **Contribute Each Round** — Every member sends the fixed amount via smart contract
4. **Receive the Pot** — One member receives all contributions each round, rotating until complete

```
Round 1: [A→pot] [B→pot] [C→pot] → A receives pot
Round 2: [A→pot] [B→pot] [C→pot] → B receives pot
Round 3: [A→pot] [B→pot] [C→pot] → C receives pot
```

## Project Structure

```
sorosave/
├── contracts/sorosave/   # Soroban smart contract (Rust)
├── sdk/                   # TypeScript SDK
├── frontend/              # Next.js web application
└── scripts/               # Deployment & setup scripts
```

## Quick Start

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools#cli) (`cargo install --locked stellar-cli`)
- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8
- [Freighter Wallet](https://www.freighter.app/) (browser extension)

### Setup

```bash
# Clone the repository
git clone https://github.com/big14way/sorosave.git
cd sorosave

# Install JS dependencies
pnpm install

# Build the smart contract
stellar contract build

# Run contract tests
cargo test

# Start the frontend
pnpm dev
```

### Deploy to Testnet

```bash
# Configure your identity
stellar keys generate --global alice --network testnet

# Build & deploy
bash scripts/deploy.sh testnet
```

## Smart Contract

The core contract handles:
- **Group lifecycle**: Create, join, leave, start groups
- **Contributions**: Token transfers per round with tracking
- **Payouts**: Automatic pot distribution to round recipients
- **Admin controls**: Pause, resume, dispute resolution
- **Emergency**: Proportional fund withdrawal

### Key Functions

| Function | Description |
|---|---|
| `create_group` | Create a new savings group |
| `join_group` | Join a group in forming state |
| `start_group` | Begin the savings rounds |
| `contribute` | Contribute to current round |
| `distribute_payout` | Send pot to round recipient |
| `raise_dispute` | Flag an issue in the group |
| `emergency_withdraw` | Return funds proportionally |

## SDK

```typescript
import { SoroSaveClient } from '@sorosave/sdk';

const client = new SoroSaveClient({
  contractId: 'CXXX...',
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
});

// Create a group
const tx = await client.createGroup({
  admin: publicKey,
  name: 'My Savings Circle',
  token: tokenContractId,
  contributionAmount: 100_0000000n, // 100 tokens
  cycleLength: 604800, // 1 week
  maxMembers: 5,
}, publicKey);

// Query a group
const group = await client.getGroup(1);
```

## Contributing

We welcome contributions! This project has issues labeled:
- `good first issue` — Great for newcomers
- `help wanted` — Moderate complexity
- `bounty` — Significant features with rewards

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for a detailed overview of the contract design, data model, and system architecture.

## License

[MIT](LICENSE)

## Links

- [Stellar Developer Docs](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Soroban SDK (Rust)](https://docs.rs/soroban-sdk/latest/soroban_sdk/)
