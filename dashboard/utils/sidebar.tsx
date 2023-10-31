async function fetchSideBar(): Promise<any[]> {
  const data = await fetch(`http://localhost:8000/admin/models`, {
    cache: "no-store",
  });
  return data.json();
}

export { fetchSideBar };
