const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function updatePrices() {
  try {
    // Get all products with their current prices
    const products = await prisma.product.findMany();

    console.log(`Found ${products.length} products to update`);

    // Update each product price by adding 30
    for (const product of products) {
      const newPrice = product.price + 30;

      await prisma.product.update({
        where: { id: product.id },
        data: { price: newPrice },
      });

      console.log(
        `Updated "${product.name}": ${product.price} → ${newPrice} lei`
      );
    }

    console.log("\n✅ All product prices updated successfully!");
  } catch (error) {
    console.error("Error updating prices:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePrices();

