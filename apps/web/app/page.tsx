import { prismaClient } from "db/client";

export default async function Home() {
  const users = await prismaClient.user.findMany();
  console.log(users);
  return <div>{JSON.stringify(users)}</div>;
}