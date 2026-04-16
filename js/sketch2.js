const SUPABASE_URL = "https://bhpjqdrmxsqtghcitywt.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_bkuiQY0FRbZlJY9mhEPygg_rxf5Pm03"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadPosts() {
  const { data, error } = await sb.from("posts").select("*");
  if (error) {
    console.error(error);
    return;
  }
  renderPosts(data);
}

function renderPosts(posts) {
  const container = document.getElementById("gallery");

  container.innerHTML = ""; // clear first

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${post.topic || "no"}</h2>
      <p><strong>Colectiu:</strong> ${post.colectiu || "no"}</p>
      <p>${post.content || ""}</p>
      <p><strong>Any:</strong> ${post.any || "no"}</p>
      <p><strong>Lloc:</strong> ${post.lloc || "no"}</p>
      <img src="${post.url_img || "no"}" />
    `;
    container.appendChild(card);
  });
}

loadPosts();
