// ===== sketch.js ===== 
// Initialize Supabase
const SUPABASE_URL = "https://hrvufltqcnyfzvlnbmzi.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_awlsvjfkZ-usQ26F7fHH5w_49iZXcal"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 

async function getPosts() {
  const { data, error } = await sb.from("posts").select("*");

  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = "<h2>Scoreboard</h2>";
  scores.forEach((row) => {
    const div = document.createElement("div");
    div.textContent = `${row.name}: ${row.score}`;
    scoreboard.appendChild(div);
  });
 posts = data; 
  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("DATA:", data);
  }
}

async function setup() {
  background(100);
  createCanvas(400, 400);

  console.log("Posts loaded:", posts);
  
  const { data: scores, error: fetchError } = await sb.from("posts").select("*");

  if (fetchError) console.error("Fetch error:", fetchError);
  else {
    if (scores.length === 0) {
      await sb.from("posts").insert([
        {
          tema: "Alilgtbice",
          col·lectiu: "d8m",
          content: "totes lliures",
          url_img: "http://www.dones8m.es",
          any: 2026,
          lloc: "Alcoi",
        },
      ]);
      console.log("Inserted Alice");
    }
    getPosts(posts);
  }
}

function draw() {
  // Your p5.js drawing code here
}

/*
async function setup() {
  createCanvas(400, 400);
  background(220);

  // Add a sample score
  const { data: scores, error: fetchError } = await supabase.from("scores").select("*");

  if (fetchError) console.error("Fetch error:", fetchError);
  else {
    if (scores.length === 0) {
      await supabase.from("scores").insert([{ name: "Alice", score: 42 }]);
      console.log("Inserted Alice");
    }
    displayScores(scores);
  }
}

function displayScores(scores) {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = "<h2>Scoreboard</h2>";
  scores.forEach((row) => {
    const div = document.createElement("div");
    div.textContent = `${row.name}: ${row.score}`;
    scoreboard.appendChild(div);
  });
}*/
