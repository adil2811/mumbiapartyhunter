// import { connect } from "@/dbConfig/dbConfig";
// import Event from "../../../models/Event";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   connect();
//   try {
//     const { category, price } = request.query;
// console.log('✌️price --->', price);
// console.log('✌️category --->', category);

//     // Define an initial query object
//     const query = {};

//     if (category) {
//       query.category = category; // Add category filter
//     }

//     if (price) {
//       query.price = { $lte: parseInt(price, 10) }; // Add price filter (e.g., less than or equal)
//     }

//     const events = await Event.find(query);

//     return new NextResponse.JSON(events);
//   } catch (error) {
//     console.error(error);
//     return new NextResponse.JSON("An error occurred", 500);
//   }
// }
