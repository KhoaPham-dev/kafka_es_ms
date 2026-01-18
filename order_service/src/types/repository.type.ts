type Create = (input: any) => Promise<{}>;
type FindMany = (input: any) => Promise<{}>;
type FindOne = (input: any) => Promise<{}>;
type Update = (input: any) => Promise<{}>;
type Delete = (input: any) => Promise<{}>;

export type CartRepositoryType = {
  create: Create;
  findMany: FindMany;
  findOne: FindOne;
  update: Update;
  delete: Delete;
}