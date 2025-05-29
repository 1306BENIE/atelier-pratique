import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoDBConnection";
import { Commande } from "@/models/Commande";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;
  try {
    await Commande.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Suppression impossible" },
      { status: 500 }
    );
  }
}
