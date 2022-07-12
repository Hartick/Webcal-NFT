## Prerequisiti
- Metamask

## Installazione

Installa i pacchetti node:

```bash
yarn install
```

Compila gli smart contracts:
```bash
npx hardhat compile
```

## Deploy su  Polygon Mumbai

```bash
npx hardhat run ./scripts/deploy.js --network mumbai
```

### Cambia gli address degli NFT
Andare alla pagina /pages/utils/options.js e inserire gli indirizzi degli smart contracts deployati
