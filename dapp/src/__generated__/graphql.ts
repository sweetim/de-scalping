/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ticket?: Maybe<Ticket>;
  ticketShop?: Maybe<TicketShop>;
  ticketShops: Array<TicketShop>;
  tickets: Array<Ticket>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryTicketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTicketShopArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTicketShopsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TicketShop_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TicketShop_Filter>;
};


export type QueryTicketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Ticket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ticket_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ticket?: Maybe<Ticket>;
  ticketShop?: Maybe<TicketShop>;
  ticketShops: Array<TicketShop>;
  tickets: Array<Ticket>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionTicketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTicketShopArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTicketShopsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TicketShop_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TicketShop_Filter>;
};


export type SubscriptionTicketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Ticket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ticket_Filter>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['Bytes']['output'];
  owner?: Maybe<Scalars['Bytes']['output']>;
  ticketId?: Maybe<Scalars['BigInt']['output']>;
  ticketName?: Maybe<Scalars['String']['output']>;
  ticketPrice?: Maybe<Scalars['BigInt']['output']>;
  ticketShop?: Maybe<Scalars['Bytes']['output']>;
  ticketTypeIndex?: Maybe<Scalars['BigInt']['output']>;
};

export type TicketShop = {
  __typename?: 'TicketShop';
  id: Scalars['Bytes']['output'];
  owner: Scalars['Bytes']['output'];
  ticketMetadata_id: Scalars['String']['output'];
  ticketMetadata_name: Scalars['String']['output'];
  ticketName?: Maybe<Scalars['String']['output']>;
  ticketShop: Scalars['Bytes']['output'];
};

export type TicketShop_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TicketShop_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TicketShop_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ticketMetadata_id?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_contains?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_gt?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_gte?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketMetadata_id_lt?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_lte?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_contains?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketMetadata_id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_contains?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_gt?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_gte?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketMetadata_name_lt?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_lte?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketMetadata_name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketMetadata_name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName?: InputMaybe<Scalars['String']['input']>;
  ticketName_contains?: InputMaybe<Scalars['String']['input']>;
  ticketName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_gt?: InputMaybe<Scalars['String']['input']>;
  ticketName_gte?: InputMaybe<Scalars['String']['input']>;
  ticketName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketName_lt?: InputMaybe<Scalars['String']['input']>;
  ticketName_lte?: InputMaybe<Scalars['String']['input']>;
  ticketName_not?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_contains?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketShop?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_gt?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_gte?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ticketShop_lt?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_lte?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TicketShop_OrderBy {
  Id = 'id',
  Owner = 'owner',
  TicketMetadataId = 'ticketMetadata_id',
  TicketMetadataName = 'ticketMetadata_name',
  TicketName = 'ticketName',
  TicketShop = 'ticketShop'
}

export type Ticket_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Ticket_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Ticket_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ticketId?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ticketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  ticketId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ticketName?: InputMaybe<Scalars['String']['input']>;
  ticketName_contains?: InputMaybe<Scalars['String']['input']>;
  ticketName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_gt?: InputMaybe<Scalars['String']['input']>;
  ticketName_gte?: InputMaybe<Scalars['String']['input']>;
  ticketName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketName_lt?: InputMaybe<Scalars['String']['input']>;
  ticketName_lte?: InputMaybe<Scalars['String']['input']>;
  ticketName_not?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_contains?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ticketName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketName_starts_with?: InputMaybe<Scalars['String']['input']>;
  ticketName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ticketPrice?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ticketPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  ticketPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ticketShop?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_gt?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_gte?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ticketShop_lt?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_lte?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ticketShop_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ticketTypeIndex?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ticketTypeIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  ticketTypeIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Ticket_OrderBy {
  Id = 'id',
  Owner = 'owner',
  TicketId = 'ticketId',
  TicketName = 'ticketName',
  TicketPrice = 'ticketPrice',
  TicketShop = 'ticketShop',
  TicketTypeIndex = 'ticketTypeIndex'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type TicketShopQueryQueryVariables = Exact<{
  owner: Scalars['Bytes']['input'];
}>;


export type TicketShopQueryQuery = { __typename?: 'Query', ticketShops: Array<{ __typename?: 'TicketShop', id: any, owner: any, ticketShop: any }> };

export type TicketQueryQueryVariables = Exact<{
  owner: Scalars['Bytes']['input'];
}>;


export type TicketQueryQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', id: any, owner?: any | null, ticketShop?: any | null, ticketId?: any | null, ticketPrice?: any | null, ticketName?: string | null, ticketTypeIndex?: any | null }> };


export const TicketShopQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketShopQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketShops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"ticketShop"}}]}}]}}]} as unknown as DocumentNode<TicketShopQueryQuery, TicketShopQueryQueryVariables>;
export const TicketQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Bytes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"ticketShop"}},{"kind":"Field","name":{"kind":"Name","value":"ticketId"}},{"kind":"Field","name":{"kind":"Name","value":"ticketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"ticketName"}},{"kind":"Field","name":{"kind":"Name","value":"ticketTypeIndex"}}]}}]}}]} as unknown as DocumentNode<TicketQueryQuery, TicketQueryQueryVariables>;