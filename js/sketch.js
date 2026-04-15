// ===== sketch.js ===== 
// Initialize Supabase

const SUPABASE_URL = "https://hrvufltqcnyfzvlnbmzi.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_awlsvjfkZ-usQ26F7fHH5w_49iZXcal"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 

let posts = [];
let images = []; // store loaded images

const columns = ["topic", "colectiu", "content", "url_img", "any", "lloc"];

async function getPosts() {
  const { data, error } = await sb
    .from('posts')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  // load images
  for (let i = 0; i < posts.length; i++) {
    let img = loadImage(posts[i].url_img);
    images.push(img);
  }
  console.log("Posts loaded:", posts);
  posts = data;

}

async function setup() {
  createCanvas(400, 800);
  await getPosts();
}

function draw() {
  for (let i = 0; i < posts.length; i++) {
    let y = 100 + i * 150;

    let topic = posts[i].topic || "no topic";
    let colectiu = posts[i].col·lectiu || "no col·lectiu";
    let content = posts[i].content_text || "no content";
    let url_img = posts[i].url_img || "no url";
    let any = posts[i].any || "no any";
    let lloc = posts[i].lloc || "no lloc";
  

    // TEXT
    fill(0);
    textSize(14);
    
    for (let j = 1; j < columns.length + 1; j++) {
      const fields = [topic, colectiu, content, url_img, any, lloc];
      const colWidth = 150; // adjust to your needs

      fields.forEach((field, i) => {
        text(field.toString(), 20 + i * colWidth, y * j);
      });
    }
   
    // IMAGE
    if (images[i]) {
      image(images[i], 20, y, 100, 100);
    }
  }
}



