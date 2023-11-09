import Event from "../../../models/Event";
import {connect} from "../../../dbConfig/dbConfig";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const requestBody = await request.text();
  try {
    
    const { name, email, title, description, company, price, h1, category, images } = JSON.parse(requestBody);
    console.log('this is',name, email, title, description, company, price, h1, category, images)
    // Connect to the database
    connect();

    // Create a new Event document and save it to the database
    const eventDoc = await Event.create({
      name,
      email,
      title,
      description,
      company,
      price,
      h1,
      category,
      images,
    });
    if (request.headers.get('Content-Type') !== 'application/json') {
      return NextResponse.json({ success: false, error: 'Invalid content type' }, { status: 400 });
    }

    return NextResponse.json(JSON.stringify({ success: true, data: eventDoc }));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error saving data to the database' }, { status: 500 });
  }
}
