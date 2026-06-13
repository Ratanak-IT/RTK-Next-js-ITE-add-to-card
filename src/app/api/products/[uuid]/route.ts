export async function GET(request: Request,
    { 
    params 
}: { 
    params: Promise<{ uuid: string }> 
}) {
  const { uuid } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${uuid}`,
  );

  if (!res.ok) {
    return Response.json(
      { message: "Product not found" },
      { status: res.status },
    );
  }

  const data = await res.json();

  return Response.json(data);
}
