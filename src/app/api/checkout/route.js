import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Event from "../../../models/Event";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(request) {
  try {
    await connect();

    if (request.method !== "POST") {
      return NextResponse.json({ error: "Method is not a POST request" }, { status: 400 });
    }

    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = await request.json();

    console.log('Received cartProducts:', cartProducts);

    const uniqueIds = [...new Set(cartProducts)];
    const productsInfos = await Event.find({ _id: { $in: uniqueIds } });

    const line_items = uniqueIds
      .map(productId => {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = cartProducts.filter(id => id === productId).length || 0;

        if (quantity > 0 && productInfo) {
          return {
            quantity,
            price_data: {
              currency: 'INR',
              product_data: { name: productInfo.title },
              unit_amount: quantity * productInfo.price * 100,
            },
          };
        }

        return null; 
      })
      .filter(item => item !== null);

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.DOMAIN + '/cart?success=1',
      cancel_url: process.env.DOMAIN + '/cart?canceled=1',
      metadata: { orderId: orderDoc._id.toString(), test: 'ok' },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
