import {connect} from "@/dbConfig/dbConfig";

import { NextResponse } from "next/server"
import Event from "../../../models/Event"
import getResponseMessage from '@/helpers/responsemessage.js'

export async function POST(request){

    connect()
    const {title , description ,h1 , images , userId, category} = await request.json()


    try {   
         const createevent = new Event({
            title,
            description,
            h1,
            images,
            userId, 
            category,
         })
        const event = await createevent.save()
         
         
         return NextResponse.json(event,{
            status:201,
         })
        
    } catch (error) {
        return NextResponse.json({
            message:"failed to create"+error,
            sucess: false,
        });
    }



}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const defaultPage = 1;
    const defaultLimit = 2;
    const defaultSort = 'price';
    const defaultOrder = 'asc';

    const page = parseInt(searchParams.get('page')) || defaultPage;
    const limit = parseInt(searchParams.get('limit')) || defaultLimit;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || defaultSort;
    const order = searchParams.get('order') || defaultOrder;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return getResponseMessage("Invalid page or limit query parameters", 400, false);
    }

    if (order !== 'asc' && order !== 'desc') {
      return getResponseMessage("Invalid order parameter. Use 'asc' or 'desc'.", 400, false);
    }

    const skip = (page - 1) * limit;

    const filter = {
      ...(category === 'ALLALLALLALLALLALLALLALL' ? {} : { category }),
      isVerified: true,
    };

    const sortObject = {};
    sortObject[sort] = order === 'asc' ? 1 : -1;

    const events = await Event.find(filter)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
    return getResponseMessage("Error fetching events", 500, false);
  }
}

