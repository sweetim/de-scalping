import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TicketMaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ticketMasterAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'ticketUuid', internalType: 'string', type: 'string' },
      { name: 'ticketType', internalType: 'string', type: 'string' },
    ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'uuid', internalType: 'string', type: 'string' },
      {
        name: 'ticketMetadata',
        internalType: 'struct TicketMaster.TicketMetadata',
        type: 'tuple',
        components: [
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          {
            name: 'availableTickets',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'location',
            internalType: 'struct TicketMaster.TicketLocation',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing_1',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_2',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_3',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_4',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'createNewTicket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'uuid', internalType: 'string', type: 'string' }],
    name: 'getTicketMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct TicketMaster.TicketMetadata',
        type: 'tuple',
        components: [
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          {
            name: 'availableTickets',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'location',
            internalType: 'struct TicketMaster.TicketLocation',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'uri', internalType: 'string', type: 'string' },
            ],
          },
          {
            name: 'pricing_1',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_2',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_3',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'pricing_4',
            internalType: 'struct TicketMaster.TicketPricing',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'string', type: 'string' },
              { name: 'description', internalType: 'string', type: 'string' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketMasterAbi}__
 */
export const useReadTicketMaster = /*#__PURE__*/ createUseReadContract({
  abi: ticketMasterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ticketMasterAbi}__ and `functionName` set to `"getTicketMetadata"`
 */
export const useReadTicketMasterGetTicketMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: ticketMasterAbi,
    functionName: 'getTicketMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketMasterAbi}__
 */
export const useWriteTicketMaster = /*#__PURE__*/ createUseWriteContract({
  abi: ticketMasterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketMasterAbi}__ and `functionName` set to `"buyTicket"`
 */
export const useWriteTicketMasterBuyTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketMasterAbi,
    functionName: 'buyTicket',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ticketMasterAbi}__ and `functionName` set to `"createNewTicket"`
 */
export const useWriteTicketMasterCreateNewTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: ticketMasterAbi,
    functionName: 'createNewTicket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketMasterAbi}__
 */
export const useSimulateTicketMaster = /*#__PURE__*/ createUseSimulateContract({
  abi: ticketMasterAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketMasterAbi}__ and `functionName` set to `"buyTicket"`
 */
export const useSimulateTicketMasterBuyTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketMasterAbi,
    functionName: 'buyTicket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ticketMasterAbi}__ and `functionName` set to `"createNewTicket"`
 */
export const useSimulateTicketMasterCreateNewTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ticketMasterAbi,
    functionName: 'createNewTicket',
  })
