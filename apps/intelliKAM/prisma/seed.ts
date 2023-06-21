// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
//   const starterPresent = await prisma.plans.findMany({
//     where: {
//       name: 'Starter'
//     } 
//   })
//   if (starterPresent.length == 0) {
//     const starter = await prisma.plans.create({
//       data: {
//           name: 'Starter',
//           price : 100
//         },
//     });
//   }
//   const corporatePresent = await prisma.plans.findMany({
//     where: {
//       name: 'Corporate'
//     } 
//   })
//   if (corporatePresent.length == 0) {
//     const corporate = await prisma.plans.create({
//       data: {
//         name: 'Corporate',
//         price : 100
//       },
//     })
//   }
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })