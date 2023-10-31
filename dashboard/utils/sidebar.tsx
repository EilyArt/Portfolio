async function fetchSideBar(): Promise<any[]> {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/models`, {
    cache: "no-store",
  });
  return data.json();
}

export { fetchSideBar };
