import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDBConnection";
import { Commande } from "@/models/Commande";

export async function GET() {
  await connectToDatabase();
  const commandes = await Commande.find().sort({ createdAt: -1 });
  return NextResponse.json(commandes);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  // body doit contenir items et total
  if (!body.items || !body.total) {
    return NextResponse.json(
      { error: "Missing items or total" },
      { status: 400 }
    );
  }
  const commande = await Commande.create({
    items: body.items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    total: body.total,
  });
  return NextResponse.json(commande, { status: 201 });
}
