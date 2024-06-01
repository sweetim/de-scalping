import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ShopPaymaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const shopPaymasterAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_erc20', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'allowedToken',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketShop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketShopAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'ticketUuid', internalType: 'string', type: 'string' },
      { name: 'ticketTypeIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'collection',
    outputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'uri', internalType: 'string', type: 'string' },
      {
        name: 'location',
        internalType: 'struct TicketShop.TicketLocation',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'uuid', internalType: 'string', type: 'string' },
      {
        name: 'ticketMetadata',
        internalType: 'struct TicketShop.TicketMetadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'string[]', type: 'string[]' },
          {
            name: 'location',
            internalType: 'struct TicketShop.TicketLocation',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketShop.TicketPricing[]',
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
    name: 'createNewCollection',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllCollection',
    outputs: [
      {
        name: '',
        internalType: 'struct TicketShop.TicketMetadata[]',
        type: 'tuple[]',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'string[]', type: 'string[]' },
          {
            name: 'location',
            internalType: 'struct TicketShop.TicketLocation',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketShop.TicketPricing[]',
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
  {
    type: 'function',
    inputs: [{ name: 'uuid', internalType: 'string', type: 'string' }],
    name: 'getTicketMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct TicketShop.TicketMetadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'string', type: 'string' },
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'dates', internalType: 'string[]', type: 'string[]' },
          {
            name: 'location',
            internalType: 'struct TicketShop.TicketLocation',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing',
            internalType: 'struct TicketShop.TicketPricing[]',
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
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'ticketShop',
    outputs: [
      { name: 'id', internalType: 'string', type: 'string' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'uri', internalType: 'string', type: 'string' },
      {
        name: 'location',
        internalType: 'struct TicketShop.TicketLocation',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link shopPaymasterAbi}__
 */
export const useReadShopPaymaster = /*#__PURE__*/ createUseReadContract({
  abi: shopPaymasterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"allowedToken"`
 */
export const useReadShopPaymasterAllowedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: shopPaymasterAbi,
    functionName: 'allowedToken',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useWriteShopPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: shopPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link shopPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useSimulateShopPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: shopPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ticketErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTicketErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ticketErc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__
 */
export const useReadTicketShop = /*#__PURE__*/ createUseReadContract({
  abi: ticketShopAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"collection"`
 */
export const useReadTicketShopCollection = /*#__PURE__*/ createUseReadContract({
  abi: ticketShopAbi,
  functionName: 'collection',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"getAllCollection"`
 */
export const useReadTicketShopGetAllCollection =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketShopAbi,
    functionName: 'getAllCollection',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"ticketShop"`
 */
export const useReadTicketShopTicketShop = /*#__PURE__*/ createUseReadContract({
  abi: ticketShopAbi,
  functionName: 'ticketShop',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"createNewCollection"`
 */
export const useWriteTicketShopCreateNewCollection =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketShopAbi,
    functionName: 'createNewCollection',
  })

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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketShopAbi}__ and `functionName` set to `"createNewCollection"`
 */
export const useSimulateTicketShopCreateNewCollection =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketShopAbi,
    functionName: 'createNewCollection',
  })
