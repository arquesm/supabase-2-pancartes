// ===== sketch.js ===== 
// Initialize Supabase

const SUPABASE_URL = "https://hrvufltqcnyfzvlnbmzi.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_awlsvjfkZ-usQ26F7fHH5w_49iZXcal"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 

let posts = [];

async function getPosts() {
  const { data, error } = await sb
    .from('posts')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  posts = data;

  console.log("Posts loaded:", posts);
}

async function setup() {
  createCanvas(400, 400);
  await getPosts();
}

function draw() {
  // Your p5.js drawing code here
}

/*
async function setup() {
  createCanvas(400, 400);
  background(220);

  // Add a sample score
  const { data: posts, error: fetchError } = await supabase.from("posts").select("*");

  if (fetchError) console.error("Fetch error:", fetchError);
  else {
    if (posts.length === 0) {
      await supabase.from("posts").insert([{ name: "Alice", score: 42 }]);
      console.log("Inserted Alice");
    }
    displayScores(posts);
  }
}

function displayScores(posts) {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = "<h2>Scoreboard</h2>";
  posts.forEach((row) => {
    const div = document.createElement("div");
    div.textContent = `${row.name}: ${row.score}`;
    scoreboard.appendChild(div);
  });
}*/
