import prisma from "@/lib/prisma";

export async function getAllOrders(userId) {
  const orders = await prisma.order.findMany({
    where: { user_id: parseInt(userId, 10) },
    include: {
      order_items: {
        include: {
          // product: true,
          extras: true,
        },
      },
    },
  });
  return orders;
}
export async function getAllOrdersComplete() {
  const orders = await prisma.order.findMany({
    include: {
      order_items: {
        include: {
          // product: true,
          extras: true,
        },
      },
    },
  });
  return orders;
}

export async function createOrder(
  userId,
  products,
  shippingFee,
  cartTotal,
  senderInfo,
  recipientInfo,
  totalPrice,
  orderState
) {
  console.log("PROD", products);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return { error: `User with ID ${userId} not found` };
    }

    const orderItemsData = await Promise.all(
      products.map(
        async ({ productId, quantity, productDeliveryInfo, extras }) => {
          const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
              flowers: true,
            },
          });
          console.log(product);
          if (!product) {
            console.error(`Product with ID ${productId} not found`);
            throw new Error(`Product with ID ${productId} not found`);
          }

          let extrasData = [];
          if (extras && extras.length > 0) {
            extrasData = await Promise.all(
              extras.map(async (extra) => {
                let extraRecord = await prisma.extra.findUnique({
                  where: { id: extra.id },
                });

                if (!extraRecord) {
                  extraRecord = await prisma.extra.create({
                    data: {
                      name: extra.name,
                      description: extra.description,
                      price: extra.price,
                      quantity: parseInt(extra.quantity),
                      image: extra.image,
                    },
                  });
                }

                return extraRecord;
              })
            );
          }
          const serializedFlowers = JSON.stringify(
            product.flowers.map((flower) => ({
              flower: flower.flower,
              quantity: flower.quantity,
            }))
          );
          return {
            productId: product.productId,
            product_name: product.name,
            product_price: product.price,
            product_flowers: serializedFlowers,
            images_url: product.images_url,
            quantity,
            productDeliveryInfo,
            extras:
              extrasData.length > 0
                ? { connect: extrasData.map((e) => ({ id: e.id })) }
                : { connect: [] },
          };
        }
      )
    );

    const newOrder = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        order_items: {
          create: orderItemsData,
        },
        shipping_fee: shippingFee,
        cart_total: cartTotal,
        sender_info: senderInfo,
        recipient_info: recipientInfo,
        total_price: totalPrice,
        order_state: orderState,
      },
    });
    console.log(newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error.message);
    return { error: error.message };
  }
}
