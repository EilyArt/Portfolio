import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.createMany({
    data: [
      {
        username: "eiljonwdqes",
        email: "eildwdyqa@example.com",
        password: "passworsd123",
        isAdmin: true,
      },
      {
        username: "jandw_dqoe",
        email: "jadwnq@exdwample.com",
        password: "passworwd456",
        isAdmin: false,
      },
    ],
  });
  const page = await prisma.page.upsert({
    where: { slug: "about-us" },
    create: {
      title: "About Us",
      slug: "about-us",
    },
    update: {
      title: "About Us",
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
