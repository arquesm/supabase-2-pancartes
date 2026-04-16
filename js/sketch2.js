const SUPABASE_URL = "https://bhpjqdrmxsqtghcitywt.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_bkuiQY0FRbZlJY9mhEPygg_rxf5Pm03"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadPosts() {
  const { data, error } = await sb.from("posts").select("*");
  if (error) {
    console.error(error);
    return;
  }
  console.log(data, error);
  renderPosts(data);
}

function renderPosts(posts) {
  const container = document.getElementById("gallery");

  container.innerHTML = ""; // clear first

  posts.forEach((posts) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${posts.topic || "no"}</h2>
      <p><strong>Colectiu:</strong> ${posts.colectiu || "no"}</p>
      <p>${posts.content || ""}</p>
      <p><strong>Any:</strong> ${posts.any || "no"}</p>
      <p><strong>Lloc:</strong> ${posts.lloc || "no"}</p>
      <img src="${posts.url_img || "no"}" />
    `;
    container.appendChild(card);
  });
}

loadPosts();
