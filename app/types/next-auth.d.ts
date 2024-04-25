import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number,
      username: string,
      password: string,
      email: string,
      fullname: string,
      usertype: string,
      company: string,
      token: string;
      error:[];
    };
  }
}
