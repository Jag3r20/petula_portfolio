import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Webhook ze Sanity: po každé změně obsahu přegeneruje celý web.
 * Web je malý, takže plná revalidace je jednodušší a spolehlivější
 * než mapování dokumentů na cesty.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );
    if (!isValidSignature) {
      return NextResponse.json({ message: "Neplatný podpis" }, { status: 401 });
    }
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Chyba" },
      { status: 500 },
    );
  }
}
