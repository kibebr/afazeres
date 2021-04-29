/** Types generated for queries found in "lib/repositories/user/UserCommands.repository.ts" */

/** 'SelectUserByUsernameCommand' parameters type */
export interface ISelectUserByUsernameCommandParams {
  username: string | null | void;
}

/** 'SelectUserByUsernameCommand' return type */
export interface ISelectUserByUsernameCommandResult {
  username: string | null;
  password: string | null;
  email: string | null;
}

/** 'SelectUserByUsernameCommand' query type */
export interface ISelectUserByUsernameCommandQuery {
  params: ISelectUserByUsernameCommandParams;
  result: ISelectUserByUsernameCommandResult;
}

