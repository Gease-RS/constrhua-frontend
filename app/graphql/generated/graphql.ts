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
  phases?: Maybe<Array<Phase>>;
  /** Progresso total da construção, calculado pela média ponderada das Phases. */
  progress: Scalars['Float']['output'];
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
  /** ID do usuário responsável pela obra. */
  userId: Scalars['Int']['input'];
};

export type CreateImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
  url: Scalars['String']['input'];
};

export type CreatePhaseInput = {
  /** ID da construção à qual esta fase pertence. */
  constructionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
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
  role: RoleProfressional;
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
  name: Scalars['String']['input'];
  /** ID da fase à qual esta etapa pertence. */
  phaseId: Scalars['Int']['input'];
};

export type CreateTaskInput = {
  /** Custo orçado desta tarefa. Usado para ponderar o progresso geral. */
  budgetedCost: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  /** ID da etapa à qual esta tarefa pertence. */
  stageId: Scalars['Int']['input'];
  /** Status inicial da tarefa. Padrão: NÃO_INICIADO. */
  status?: InputMaybe<TaskStatus>;
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
  completeTask: Task;
  createCategory: Category;
  createComment: CommentType;
  /** Cria uma nova construção e a inicializa com progresso 0.0. */
  createConstruction: Construction;
  /** Cria uma nova fase na construção. Pode copiar a estrutura de um modelo base. */
  createPhase: Phase;
  createPost: Post;
  createProfessional: Professional;
  createReply: Reply;
  /** Cria uma nova etapa dentro de uma fase específica. */
  createStage: Stage;
  createTask: Task;
  createTeam: Team;
  createUser: UserType;
  deactivateAccount: Scalars['String']['output'];
  likeComment: CommentLike;
  likeReply: ReplyLike;
  logout: Scalars['Boolean']['output'];
  /** Recalcula o progresso total da construção baseado no estado atual de todas as Tasks. */
  recalculateConstructionProgress: Construction;
  /** Recalcula e atualiza o campo de progresso da etapa com base nas Tasks filhas. */
  recalculateStageProgress: Stage;
  removeCategory: Category;
  removeComment: CommentType;
  /** Remove uma construção e todos os seus dados associados (Phases, Stages, Tasks). */
  removeConstruction: Construction;
  /** Remove uma fase e todas as etapas e tarefas relacionadas. */
  removePhase: Scalars['Boolean']['output'];
  removePost: DeletePostDto;
  removeProfessional: Professional;
  removeReply: Reply;
  /** Remove uma etapa e todas as tarefas (Tasks) filhas. (Exige exclusão em cascata configurada no Prisma). */
  removeStage: Scalars['Boolean']['output'];
  removeTag: Tag;
  /** Remove uma tarefa e dispara o recálculo de progresso na Stage pai. */
  removeTask: Scalars['Boolean']['output'];
  removeTeam: Team;
  sendAuthCode: Scalars['String']['output'];
  unlikeComment: CommentLike;
  unlikeReply: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateComment: CommentType;
  /** Atualiza os dados básicos de uma construção. */
  updateConstruction: Construction;
  /** Atualiza o nome de uma fase existente. */
  updatePhase: Phase;
  updatePost: Post;
  updateProfessional: Professional;
  updateProfile: UserType;
  updateReply: Reply;
  /** Atualiza o nome ou se a etapa deve ser pulada. */
  updateStage: Stage;
  /** Atualiza detalhes da tarefa, como nome, custo orçado (budgetedCost) ou status. */
  updateTask: Task;
  updateTeam: Team;
  verifyAuthCode: AuthResult;
};


export type MutationCompleteTaskArgs = {
  id: Scalars['Int']['input'];
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


export type MutationCreatePhaseArgs = {
  createPhaseInput: CreatePhaseInput;
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


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLikeCommentArgs = {
  data: CreateCommentLikeInput;
};


export type MutationLikeReplyArgs = {
  data: CreateReplyLikeInput;
};


export type MutationRecalculateConstructionProgressArgs = {
  constructionId: Scalars['Int']['input'];
};


export type MutationRecalculateStageProgressArgs = {
  stageId: Scalars['Int']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveConstructionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePhaseArgs = {
  id: Scalars['Int']['input'];
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


export type MutationRemoveStageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTaskArgs = {
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
  id: Scalars['Int']['input'];
  updateConstructionInput: UpdateConstructionInput;
};


export type MutationUpdatePhaseArgs = {
  id: Scalars['Int']['input'];
  updatePhaseInput: UpdatePhaseInput;
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
  id: Scalars['Int']['input'];
  updateStageInput: UpdateStageInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['Int']['input'];
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};


export type MutationVerifyAuthCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Phase = {
  __typename?: 'Phase';
  construction?: Maybe<Construction>;
  constructionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  progress: Scalars['Float']['output'];
  stages?: Maybe<Array<Stage>>;
  updatedAt: Scalars['DateTime']['output'];
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
  role: RoleProfressional;
  team?: Maybe<Team>;
  teamId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  CommentsByPost: Array<CommentType>;
  category: Category;
  comment: CommentType;
  /** Retorna uma construção pelo seu ID, incluindo Phases, Stages e Tasks. */
  construction: Construction;
  /** Retorna todas as construções com a hierarquia de progresso completa. */
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
  /** Retorna uma fase pelo seu ID, incluindo etapas e tarefas. */
  phase: Phase;
  /** Retorna todas as fases de uma construção específica. */
  phases: Array<Phase>;
  popularTags: Array<TagCount>;
  professional: Professional;
  professionals: Array<Professional>;
  replies: Array<Reply>;
  reply: Reply;
  /** Retorna uma etapa pelo seu ID, incluindo as tarefas filhas. */
  stage: Stage;
  /** Retorna todas as etapas de uma fase específica. */
  stagesByPhase: Array<Stage>;
  tag: Tag;
  tagBySlug: Tag;
  tags: Array<Tag>;
  /** Retorna uma tarefa pelo seu ID. */
  task: Task;
  /** Retorna todas as tarefas de uma etapa (Stage) específica. */
  tasksByStage: Array<Task>;
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
  id: Scalars['Int']['input'];
};


export type QueryDataArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPostBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPhaseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPhasesArgs = {
  constructionId: Scalars['Int']['input'];
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
  id: Scalars['Int']['input'];
};


export type QueryStagesByPhaseArgs = {
  phaseId: Scalars['Int']['input'];
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


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTasksByStageArgs = {
  stageId: Scalars['Int']['input'];
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
export enum RoleProfressional {
  Architect = 'ARCHITECT',
  Builder = 'BUILDER',
  Engineer = 'ENGINEER',
  Foreman = 'FOREMAN',
  Freelancer = 'FREELANCER',
  Operator = 'OPERATOR',
  Owner = 'OWNER',
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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isSkipped: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phase?: Maybe<Phase>;
  phaseId: Scalars['Int']['output'];
  progress: Scalars['Float']['output'];
  tasks?: Maybe<Array<Task>>;
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

export type Task = {
  __typename?: 'Task';
  budgetedCost: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  stage?: Maybe<Stage>;
  stageId: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: TaskStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum TaskStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

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
  /** ID do usuário responsável pela obra. */
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePhaseInput = {
  /** ID da construção à qual esta fase pertence. */
  constructionId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  role?: InputMaybe<RoleProfressional>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReplyInput = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateStageInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID da fase à qual esta etapa pertence. */
  phaseId?: InputMaybe<Scalars['Int']['input']>;
  progress?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateTaskInput = {
  /** Custo orçado desta tarefa. Usado para ponderar o progresso geral. */
  budgetedCost?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID da etapa à qual esta tarefa pertence. */
  stageId?: InputMaybe<Scalars['Int']['input']>;
  /** Status inicial da tarefa. Padrão: NÃO_INICIADO. */
  status?: InputMaybe<TaskStatus>;
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

export type GetConstructionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConstructionsQuery = { __typename?: 'Query', constructions: Array<{ __typename?: 'Construction', id: number, name: string, address: string, cep: string, city: string, district: string, progress: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, fullname: string }, teams?: Array<{ __typename?: 'Team', id: number, name: string }> | null, phases?: Array<{ __typename?: 'Phase', id: number, name: string, progress: number, stages?: Array<{ __typename?: 'Stage', id: number, name: string, tasks?: Array<{ __typename?: 'Task', id: number, name: string, status: TaskStatus }> | null }> | null }> | null }> };

export type GetProgressConstrucionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProgressConstrucionsQuery = { __typename?: 'Query', constructions: Array<{ __typename?: 'Construction', id: number, name: string, address: string, progress: number, user: { __typename?: 'User', id: number, username: string, fullname: string }, phases?: Array<{ __typename?: 'Phase', id: number, name: string, progress: number, stages?: Array<{ __typename?: 'Stage', id: number, name: string, progress: number, tasks?: Array<{ __typename?: 'Task', id: number, name: string, budgetedCost: number, status: TaskStatus, startDate?: any | null, endDate?: any | null }> | null }> | null }> | null, teams?: Array<{ __typename?: 'Team', id: number, name: string }> | null }> };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const SendAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<SendAuthCodeMutation, SendAuthCodeMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetConstructionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConstructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"cep"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetConstructionsQuery, GetConstructionsQueryVariables>;
export const GetProgressConstrucionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProgressConstrucions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"stages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"budgetedCost"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProgressConstrucionsQuery, GetProgressConstrucionsQueryVariables>;