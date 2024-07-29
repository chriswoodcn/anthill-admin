export const login = async (data: any) =>
  await fetch(process.env.NEXT_PUBLIC_API_HOST + "/backend/login", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
