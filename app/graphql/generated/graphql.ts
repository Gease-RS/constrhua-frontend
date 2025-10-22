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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type AuthResult = {
  __typename?: 'AuthResult';
  accessToken: Scalars['String']['output'];
  csrfToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken: Scalars['String']['output'];
  user: UserDto;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likeCount: Scalars['Int']['output'];
  post: Post;
  replies: Array<Reply>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type CommentLike = {
  __typename?: 'CommentLike';
  commentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type CommentType = {
  __typename?: 'CommentType';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likeCount: Scalars['Int']['output'];
  likes: Array<CommentLike>;
  post: Post;
  postId: Scalars['Int']['output'];
  replies: Array<Reply>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Construction = {
  __typename?: 'Construction';
  address: Scalars['String']['output'];
  cep: Scalars['String']['output'];
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  district: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  stages?: Maybe<Array<Stage>>;
  teams?: Maybe<Array<Team>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateCommentLikeInput = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateConstructionInput = {
  address: Scalars['String']['input'];
  cep: Scalars['String']['input'];
  city: Scalars['String']['input'];
  district: Scalars['String']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
  url: Scalars['String']['input'];
};

export type CreatePostInput = {
  authorId: Scalars['Int']['input'];
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  content: Scalars['String']['input'];
  images?: InputMaybe<Array<CreateImageInput>>;
  published?: Scalars['Boolean']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateProfessionalInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Role;
  teamId: Scalars['Int']['input'];
};

export type CreateReplyInput = {
  commentId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateReplyLikeInput = {
  replyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateStageInput = {
  constructionId: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  progress?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateSubStageInput = {
  name: Scalars['String']['input'];
  progress?: InputMaybe<Scalars['Float']['input']>;
  stageId: Scalars['Int']['input'];
};

export type CreateTeamInput = {
  constructionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  role: RoleUser;
  username: Scalars['String']['input'];
};

export type DeleteCommentLikeInput = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type DeletePostDto = {
  __typename?: 'DeletePostDto';
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  alt?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum MediaType {
  Image = 'image',
  Video = 'video'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createComment: CommentType;
  createConstruction: Construction;
  createPost: Post;
  createProfessional: Professional;
  createReply: Reply;
  createStage: Stage;
  createSubStage: SubStage;
  createTeam: Team;
  createUser: UserType;
  deactivateAccount: Scalars['String']['output'];
  deleteStage: Scalars['Boolean']['output'];
  deleteSubStage: Scalars['Boolean']['output'];
  likeComment: CommentLike;
  likeReply: ReplyLike;
  logout: Scalars['Boolean']['output'];
  removeCategory: Category;
  removeComment: CommentType;
  removeConstruction: Construction;
  removePost: DeletePostDto;
  removeProfessional: Professional;
  removeReply: Reply;
  removeTag: Tag;
  removeTeam: Team;
  sendAuthCode: Scalars['String']['output'];
  unlikeComment: CommentLike;
  unlikeReply: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateComment: CommentType;
  updateConstruction: Construction;
  updatePost: Post;
  updateProfessional: Professional;
  updateProfile: UserType;
  updateReply: Reply;
  updateStage: Stage;
  updateSubStage: SubStage;
  updateTeam: Team;
  verifyAuthCode: AuthResult;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreateConstructionArgs = {
  createConstructionInput: CreateConstructionInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateProfessionalArgs = {
  createProfessionalInput: CreateProfessionalInput;
};


export type MutationCreateReplyArgs = {
  data: CreateReplyInput;
};


export type MutationCreateStageArgs = {
  createStageInput: CreateStageInput;
};


export type MutationCreateSubStageArgs = {
  input: CreateSubStageInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteStageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubStageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeCommentArgs = {
  data: CreateCommentLikeInput;
};


export type MutationLikeReplyArgs = {
  data: CreateReplyLikeInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveConstructionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProfessionalArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveReplyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTeamArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSendAuthCodeArgs = {
  input: SendAuthCodeDto;
};


export type MutationUnlikeCommentArgs = {
  data: DeleteCommentLikeInput;
};


export type MutationUnlikeReplyArgs = {
  replyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateConstructionArgs = {
  id: Scalars['ID']['input'];
  updateConstructionInput: UpdateConstructionInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateProfessionalArgs = {
  updateProfessionalInput: UpdateProfessionalInput;
};


export type MutationUpdateProfileArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateReplyArgs = {
  updateReplyInput: UpdateReplyInput;
};


export type MutationUpdateStageArgs = {
  input: UpdateStageInput;
};


export type MutationUpdateSubStageArgs = {
  input: UpdateSubStageInput;
};


export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};


export type MutationVerifyAuthCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int']['output'];
  categories?: Maybe<Array<Category>>;
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  getCategories: Array<Category>;
  getImages: Array<Image>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Image>>;
  published: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Professional = {
  __typename?: 'Professional';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Role;
  team?: Maybe<Team>;
  teamId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  CommentsByPost: Array<CommentType>;
  category: Category;
  comment: CommentType;
  construction?: Maybe<Construction>;
  constructions: Array<Construction>;
  currentUser: User;
  data?: Maybe<Post>;
  /** Lista todos os usuários com isActive: true. */
  findActiveUsers: Array<UserType>;
  /** Lista apenas os usuários com isActive: false. */
  findInactiveUsers: Array<UserType>;
  findPostBySlug?: Maybe<Post>;
  getCategories: Array<Category>;
  getComments: Array<CommentType>;
  getPosts: Array<Post>;
  /** Lista todos os usuários, incluindo os inativos. */
  listAllUsers: Array<UserType>;
  me: UserType;
  popularTags: Array<TagCount>;
  professional: Professional;
  professionals: Array<Professional>;
  replies: Array<Reply>;
  reply: Reply;
  stage: Stage;
  stages: Array<Stage>;
  stagesByConstruction: Array<Stage>;
  subStage: SubStage;
  subStages: Array<SubStage>;
  subStagesByStage: Array<SubStage>;
  tag: Tag;
  tagBySlug: Tag;
  tags: Array<Tag>;
  team: Team;
  teams: Array<Team>;
  users: Array<UserType>;
};


export type QueryCommentsByPostArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryConstructionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDataArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPostBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPopularTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProfessionalArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReplyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStagesByConstructionArgs = {
  constructionId: Scalars['ID']['input'];
};


export type QuerySubStageArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubStagesByStageArgs = {
  stageId: Scalars['ID']['input'];
};


export type QueryTagArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTagBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTeamArgs = {
  id: Scalars['Int']['input'];
};

export type Reply = {
  __typename?: 'Reply';
  commentId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  likeCount: Scalars['Int']['output'];
  likes: Array<ReplyLike>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ReplyLike = {
  __typename?: 'ReplyLike';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  reply?: Maybe<Reply>;
  replyId: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

/** Papéis disponíveis para profissionais */
export enum Role {
  Arq = 'ARQ',
  Autonomo = 'AUTONOMO',
  Construtor = 'CONSTRUTOR',
  Eng = 'ENG',
  Mestre = 'MESTRE',
  Operador = 'OPERADOR',
  Proprietario = 'PROPRIETARIO',
  Supervisor = 'SUPERVISOR'
}

/** Papéis disponíveis para o usuário */
export enum RoleUser {
  Admin = 'ADMIN',
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Premium = 'PREMIUM',
  Standard = 'STANDARD'
}

export type SendAuthCodeDto = {
  email: Scalars['String']['input'];
};

export type Stage = {
  __typename?: 'Stage';
  construction?: Maybe<Construction>;
  constructionId: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
  substages?: Maybe<Array<SubStage>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SubStage = {
  __typename?: 'SubStage';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
  stage?: Maybe<Stage>;
  stageId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  slug: Scalars['String']['output'];
};

export type TagCount = {
  __typename?: 'TagCount';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  postCount: Scalars['Int']['output'];
  posts?: Maybe<Array<Post>>;
  slug: Scalars['String']['output'];
};

export type TagWithPosts = {
  __typename?: 'TagWithPosts';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  slug: Scalars['String']['output'];
};

export type Team = {
  __typename?: 'Team';
  construction?: Maybe<Construction>;
  constructionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  professionals?: Maybe<Array<Professional>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateConstructionInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  cep?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  authorId: Scalars['Int']['input'];
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<UpdateImageInput>>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfessionalInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReplyInput = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateStageInput = {
  constructionId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSubStageInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Scalars['Float']['input']>;
  stageId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTeamInput = {
  constructionId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  posts?: Maybe<Array<Post>>;
  role: RoleUser;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  role: RoleUser;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  role: RoleUser;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserType', id: number, email: string, fullname: string, username: string, role: RoleUser, isActive: boolean } };

export type SendAuthCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendAuthCodeMutation = { __typename?: 'Mutation', sendAuthCode: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: number, email: string, username: string, fullname: string, role: RoleUser, avatar?: string | null, isActive: boolean } };

export type GetAllConstructionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllConstructionsQuery = { __typename?: 'Query', constructions: Array<{ __typename?: 'Construction', id: number, name: string, address: string, cep: string, city: string, district: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, email: string, username: string }, teams?: Array<{ __typename?: 'Team', id: number, name: string }> | null, stages?: Array<{ __typename?: 'Stage', id: number, name: string }> | null }> };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const SendAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<SendAuthCodeMutation, SendAuthCodeMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetAllConstructionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllConstructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"cep"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllConstructionsQuery, GetAllConstructionsQueryVariables>;