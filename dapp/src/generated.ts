import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JPYC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const jpycAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ShopPaymaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const shopPaymasterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_allowedToken', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_context', internalType: 'bytes', type: 'bytes' },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_txResult',
        internalType: 'enum ExecutionResult',
        type: 'uint8',
      },
      { name: '_maxRefundedGas', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'postTransaction',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'validateAndPayForPaymasterTransaction',
    outputs: [
      { name: 'magic', internalType: 'bytes4', type: 'bytes4' },
      { name: 'context', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address payable', type: 'address' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketErc20Abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'collectionName', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BURNER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllBurner',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRoleMember',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleMemberCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'uri', internalType: 'string', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'burner', internalType: 'address', type: 'address' }],
    name: 'registerBurner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketSchema
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketSchemaAbi = [] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketShop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketShopAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_ticketMetadata',
        internalType: 'struct TicketSchema.Metadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'uint256[2]', type: 'uint256[2]' },
          {
            name: 'location',
            internalType: 'struct TicketSchema.Location',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketSchema.Pricing[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'price', internalType: 'uint256', type: 'uint256' },
              { name: 'tickets', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      { name: '_allowedErc20Token', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'ticketTypeIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNftAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getShopPaymasterAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTicketMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct TicketSchema.Metadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'uint256[2]', type: 'uint256[2]' },
          {
            name: 'location',
            internalType: 'struct TicketSchema.Location',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketSchema.Pricing[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'price', internalType: 'uint256', type: 'uint256' },
              { name: 'tickets', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketShopFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketShopFactoryAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'ticketMetadata',
        internalType: 'struct TicketSchema.Metadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'uint256[2]', type: 'uint256[2]' },
          {
            name: 'location',
            internalType: 'struct TicketSchema.Location',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketSchema.Pricing[]',
            type: 'tuple[]',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'price', internalType: 'uint256', type: 'uint256' },
              { name: 'tickets', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
      { name: 'allowedErc20Token', internalType: 'address', type: 'address' },
    ],
    name: 'createTicketShop',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTicketShops',
    outputs: [
      { name: '', internalType: 'contract TicketShop[]', type: 'address[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'ticketShops',
    outputs: [
      { name: '', internalType: 'contract TicketShop', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdtAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useReadJpyc = /*#__PURE__*/ createUseReadContract({ abi: jpycAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadJpycAllowance = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadJpycBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadJpycDecimals = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"name"`
 */
export const useReadJpycName = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"owner"`
 */
export const useReadJpycOwner = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadJpycSymbol = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadJpycTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: jpycAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useWriteJpyc = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteJpycApprove = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteJpycDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: jpycAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteJpycIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: jpycAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteJpycMint = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteJpycRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: jpycAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteJpycTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteJpycTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: jpycAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteJpycTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: jpycAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__
 */
export const useSimulateJpyc = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateJpycApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateJpycDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateJpycIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateJpycMint = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateJpycRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateJpycTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: jpycAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateJpycTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link jpycAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateJpycTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: jpycAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__
 */
export const useWatchJpycEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: jpycAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchJpycApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: jpycAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchJpycOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: jpycAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link jpycAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchJpycTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: jpycAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link shopPaymasterAbi}__
 */
export const useReadShopPaymaster = /*#__PURE__*/ createUseReadContract({
  abi: shopPaymasterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadShopPaymasterOwner = /*#__PURE__*/ createUseReadContract({
  abi: shopPaymasterAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__
 */
export const useWriteShopPaymaster = /*#__PURE__*/ createUseWriteContract({
  abi: shopPaymasterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useWriteShopPaymasterPostTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteShopPaymasterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteShopPaymasterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useWriteShopPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteShopPaymasterWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__
 */
export const useSimulateShopPaymaster = /*#__PURE__*/ createUseSimulateContract(
  { abi: shopPaymasterAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useSimulateShopPaymasterPostTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateShopPaymasterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateShopPaymasterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useSimulateShopPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateShopPaymasterWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link shopPaymasterAbi}__
 */
export const useWatchShopPaymasterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: shopPaymasterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link shopPaymasterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchShopPaymasterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: shopPaymasterAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__
 */
export const useReadTicketErc20 = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadTicketErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTicketErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadTicketErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadTicketErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"owner"`
 */
export const useReadTicketErc20Owner = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadTicketErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: ticketErc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadTicketErc20TotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketErc20Abi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__
 */
export const useWriteTicketErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: ticketErc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteTicketErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ticketErc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteTicketErc20DecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketErc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteTicketErc20IncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketErc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteTicketErc20Mint = /*#__PURE__*/ createUseWriteContract({
  abi: ticketErc20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTicketErc20RenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketErc20Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteTicketErc20Transfer = /*#__PURE__*/ createUseWriteContract(
  { abi: ticketErc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTicketErc20TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTicketErc20TransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketErc20Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__
 */
export const useSimulateTicketErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: ticketErc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTicketErc20Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateTicketErc20DecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateTicketErc20IncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTicketErc20Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTicketErc20RenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateTicketErc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTicketErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketErc20Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTicketErc20TransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketErc20Abi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketErc20Abi}__
 */
export const useWatchTicketErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ticketErc20Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketErc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTicketErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketErc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketErc20Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTicketErc20OwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketErc20Abi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTicketErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketErc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__
 */
export const useReadTicketNft = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"BURNER_ROLE"`
 */
export const useReadTicketNftBurnerRole = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'BURNER_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadTicketNftDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"MINTER_ROLE"`
 */
export const useReadTicketNftMinterRole = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'MINTER_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTicketNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"getAllBurner"`
 */
export const useReadTicketNftGetAllBurner = /*#__PURE__*/ createUseReadContract(
  { abi: ticketNftAbi, functionName: 'getAllBurner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadTicketNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadTicketNftGetRoleAdmin = /*#__PURE__*/ createUseReadContract(
  { abi: ticketNftAbi, functionName: 'getRoleAdmin' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"getRoleMember"`
 */
export const useReadTicketNftGetRoleMember =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    functionName: 'getRoleMember',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"getRoleMemberCount"`
 */
export const useReadTicketNftGetRoleMemberCount =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    functionName: 'getRoleMemberCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadTicketNftHasRole = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadTicketNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadTicketNftName = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTicketNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadTicketNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadTicketNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketNftAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadTicketNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadTicketNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: ticketNftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__
 */
export const useWriteTicketNft = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteTicketNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteTicketNftBurn = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteTicketNftGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteTicketNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: ticketNftAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"registerBurner"`
 */
export const useWriteTicketNftRegisterBurner =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'registerBurner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTicketNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteTicketNftRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteTicketNftRevokeRole = /*#__PURE__*/ createUseWriteContract(
  { abi: ticketNftAbi, functionName: 'revokeRole' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteTicketNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteTicketNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTicketNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTicketNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__
 */
export const useSimulateTicketNft = /*#__PURE__*/ createUseSimulateContract({
  abi: ticketNftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTicketNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateTicketNftBurn = /*#__PURE__*/ createUseSimulateContract(
  { abi: ticketNftAbi, functionName: 'burn' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateTicketNftGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTicketNftMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: ticketNftAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"registerBurner"`
 */
export const useSimulateTicketNftRegisterBurner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'registerBurner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTicketNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateTicketNftRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateTicketNftRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateTicketNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateTicketNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTicketNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTicketNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__
 */
export const useWatchTicketNftEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: ticketNftAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTicketNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchTicketNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTicketNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchTicketNftRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchTicketNftRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchTicketNftRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTicketNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketNftAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__
 */
export const useReadTicketShop = /*#__PURE__*/ createUseReadContract({
  abi: ticketShopAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"getNftAddress"`
 */
export const useReadTicketShopGetNftAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopAbi,
    functionName: 'getNftAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"getShopPaymasterAddress"`
 */
export const useReadTicketShopGetShopPaymasterAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopAbi,
    functionName: 'getShopPaymasterAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"getTicketMetadata"`
 */
export const useReadTicketShopGetTicketMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopAbi,
    functionName: 'getTicketMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketShopAbi}__
 */
export const useWriteTicketShop = /*#__PURE__*/ createUseWriteContract({
  abi: ticketShopAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"buyTicket"`
 */
export const useWriteTicketShopBuyTicket = /*#__PURE__*/ createUseWriteContract(
  { abi: ticketShopAbi, functionName: 'buyTicket' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketShopAbi}__
 */
export const useSimulateTicketShop = /*#__PURE__*/ createUseSimulateContract({
  abi: ticketShopAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"buyTicket"`
 */
export const useSimulateTicketShopBuyTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketShopAbi,
    functionName: 'buyTicket',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__
 */
export const useReadTicketShopFactory = /*#__PURE__*/ createUseReadContract({
  abi: ticketShopFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__ and `functionName` set to `"getTicketShops"`
 */
export const useReadTicketShopFactoryGetTicketShops =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopFactoryAbi,
    functionName: 'getTicketShops',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__ and `functionName` set to `"ticketShops"`
 */
export const useReadTicketShopFactoryTicketShops =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopFactoryAbi,
    functionName: 'ticketShops',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__
 */
export const useWriteTicketShopFactory = /*#__PURE__*/ createUseWriteContract({
  abi: ticketShopFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__ and `functionName` set to `"createTicketShop"`
 */
export const useWriteTicketShopFactoryCreateTicketShop =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketShopFactoryAbi,
    functionName: 'createTicketShop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__
 */
export const useSimulateTicketShopFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: ticketShopFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketShopFactoryAbi}__ and `functionName` set to `"createTicketShop"`
 */
export const useSimulateTicketShopFactoryCreateTicketShop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketShopFactoryAbi,
    functionName: 'createTicketShop',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useReadUsdt = /*#__PURE__*/ createUseReadContract({ abi: usdtAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadUsdtAllowance = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadUsdtBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadUsdtDecimals = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"name"`
 */
export const useReadUsdtName = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"owner"`
 */
export const useReadUsdtOwner = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadUsdtSymbol = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadUsdtTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: usdtAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useWriteUsdt = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteUsdtApprove = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteUsdtDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteUsdtIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteUsdtMint = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteUsdtRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteUsdtTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteUsdtTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: usdtAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteUsdtTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: usdtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__
 */
export const useSimulateUsdt = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateUsdtApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateUsdtDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateUsdtIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateUsdtMint = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateUsdtRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateUsdtTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: usdtAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateUsdtTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link usdtAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateUsdtTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: usdtAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__
 */
export const useWatchUsdtEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: usdtAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchUsdtApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchUsdtOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link usdtAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchUsdtTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: usdtAbi,
    eventName: 'Transfer',
  })
