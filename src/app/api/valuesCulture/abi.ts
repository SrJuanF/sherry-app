export const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "cultura",
          "type": "uint8"
        }
      ],
      "name": "CulturaFueraDeRango",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ErroronlyOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "enviado",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "requerido",
          "type": "uint256"
        }
      ],
      "name": "MontoIncorrecto",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "usuario",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cultura1",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cultura2",
          "type": "string"
        }
      ],
      "name": "CulturasSeleccionadas",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getNameCultures",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "i_owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_culture1",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_culture2",
          "type": "uint8"
        }
      ],
      "name": "pickCultures",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "s_selecciones",
      "outputs": [
        {
          "internalType": "string",
          "name": "cultura1",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "cultura2",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const;