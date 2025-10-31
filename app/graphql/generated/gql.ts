/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n    fullname\n    username\n    role\n    isActive\n  }\n}": typeof types.CreateUserDocument,
    "mutation SendAuthCode($email: String!) {\n  sendAuthCode(input: {email: $email})\n}": typeof types.SendAuthCodeDocument,
    "query CurrentUser {\n  currentUser {\n    id\n    email\n    username\n    fullname\n    role\n    avatar\n    isActive\n  }\n}": typeof types.CurrentUserDocument,
    "query GetConstructions {\n  constructions {\n    id\n    name\n    address\n    cep\n    city\n    district\n    progress\n    createdAt\n    updatedAt\n    user {\n      id\n      fullname\n    }\n    teams {\n      id\n      name\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        tasks {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n}": typeof types.GetConstructionsDocument,
    "query GetProgressConstrucions {\n  constructions {\n    id\n    name\n    address\n    progress\n    user {\n      id\n      username\n      fullname\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        progress\n        tasks {\n          id\n          name\n          budgetedCost\n          status\n          startDate\n          endDate\n        }\n      }\n    }\n    teams {\n      id\n      name\n    }\n  }\n}": typeof types.GetProgressConstrucionsDocument,
};
const documents: Documents = {
    "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n    fullname\n    username\n    role\n    isActive\n  }\n}": types.CreateUserDocument,
    "mutation SendAuthCode($email: String!) {\n  sendAuthCode(input: {email: $email})\n}": types.SendAuthCodeDocument,
    "query CurrentUser {\n  currentUser {\n    id\n    email\n    username\n    fullname\n    role\n    avatar\n    isActive\n  }\n}": types.CurrentUserDocument,
    "query GetConstructions {\n  constructions {\n    id\n    name\n    address\n    cep\n    city\n    district\n    progress\n    createdAt\n    updatedAt\n    user {\n      id\n      fullname\n    }\n    teams {\n      id\n      name\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        tasks {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n}": types.GetConstructionsDocument,
    "query GetProgressConstrucions {\n  constructions {\n    id\n    name\n    address\n    progress\n    user {\n      id\n      username\n      fullname\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        progress\n        tasks {\n          id\n          name\n          budgetedCost\n          status\n          startDate\n          endDate\n        }\n      }\n    }\n    teams {\n      id\n      name\n    }\n  }\n}": types.GetProgressConstrucionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n    fullname\n    username\n    role\n    isActive\n  }\n}"): (typeof documents)["mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n    fullname\n    username\n    role\n    isActive\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SendAuthCode($email: String!) {\n  sendAuthCode(input: {email: $email})\n}"): (typeof documents)["mutation SendAuthCode($email: String!) {\n  sendAuthCode(input: {email: $email})\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query CurrentUser {\n  currentUser {\n    id\n    email\n    username\n    fullname\n    role\n    avatar\n    isActive\n  }\n}"): (typeof documents)["query CurrentUser {\n  currentUser {\n    id\n    email\n    username\n    fullname\n    role\n    avatar\n    isActive\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetConstructions {\n  constructions {\n    id\n    name\n    address\n    cep\n    city\n    district\n    progress\n    createdAt\n    updatedAt\n    user {\n      id\n      fullname\n    }\n    teams {\n      id\n      name\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        tasks {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetConstructions {\n  constructions {\n    id\n    name\n    address\n    cep\n    city\n    district\n    progress\n    createdAt\n    updatedAt\n    user {\n      id\n      fullname\n    }\n    teams {\n      id\n      name\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        tasks {\n          id\n          name\n          status\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProgressConstrucions {\n  constructions {\n    id\n    name\n    address\n    progress\n    user {\n      id\n      username\n      fullname\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        progress\n        tasks {\n          id\n          name\n          budgetedCost\n          status\n          startDate\n          endDate\n        }\n      }\n    }\n    teams {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetProgressConstrucions {\n  constructions {\n    id\n    name\n    address\n    progress\n    user {\n      id\n      username\n      fullname\n    }\n    phases {\n      id\n      name\n      progress\n      stages {\n        id\n        name\n        progress\n        tasks {\n          id\n          name\n          budgetedCost\n          status\n          startDate\n          endDate\n        }\n      }\n    }\n    teams {\n      id\n      name\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;