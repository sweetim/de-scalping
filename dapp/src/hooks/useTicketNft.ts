import {
  TicketNftTokenUri,
  TicketNftTokenUriRaw,
} from "@/contract"
import {
  ticketNftAbi,
  useReadTicketShopGetNftAddress,
} from "@/generated"
import { useMemo } from "react"
import { useReadContracts } from "wagmi"

type UseTicketNftProps = {
  ticketShopAddress?: `0x${string}`
  tokenIds: bigint[]
}

export function useTicketNft({ ticketShopAddress, tokenIds }: UseTicketNftProps) {
  const { data: ticketNftAddress } = useReadTicketShopGetNftAddress({
    address: ticketShopAddress,
  })

  const { data: rawTokenUris } = useReadContracts({
    contracts: tokenIds.map(id => ({
      abi: ticketNftAbi,
      address: ticketNftAddress,
      functionName: "tokenURI",
      args: [
        id,
      ],
    })),
  })

  const tokenUris = useMemo<TicketNftTokenUri[]>(() => {
    if (!rawTokenUris) return []

    return rawTokenUris
      .map(item => item.result as string)
      .map((item) => {
        return JSON.parse(
          Buffer.from(item.substring(29), "base64").toString(),
        ) as TicketNftTokenUriRaw
      })
      .map(item => {
        const startDate = item.attributes.filter(attr => attr.trait_type.includes("Start date"))
          .map(attr => attr.value)[0] as number

        const endDate = item.attributes.filter(attr => attr.trait_type.includes("End date"))
          .map(attr => attr.value)[0] as number

        const locationName = item.attributes.filter(attr => attr.trait_type.includes("Location name"))
          .map(attr => attr.value)[0] as string

        const locationUri = item.attributes.filter(attr => attr.trait_type.includes("Location uri"))
          .map(attr => attr.value)[0] as string

        const ticketId = item.attributes.filter(attr => attr.trait_type.includes("Ticket ID"))
          .map(attr => attr.value)[0] as number

        const ticketType = item.attributes.filter(attr => attr.trait_type.includes("Ticket type"))
          .map(attr => attr.value)[0] as string

        return {
          name: item.name,
          description: item.description,
          image: item.image,
          startDate,
          endDate,
          locationName,
          locationUri,
          ticketId,
          ticketType,
        } as TicketNftTokenUri
      })
  }, [ rawTokenUris ])

  return {
    ticketNftAddress,
    tokenIds,
    tokenUris,
  }
}
