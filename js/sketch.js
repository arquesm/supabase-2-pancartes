// ===== sketch.js ===== 
// Initialize Supabase

const SUPABASE_URL = "https://hrvufltqcnyfzvlnbmzi.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_awlsvjfkZ-usQ26F7fHH5w_49iZXcal"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 

let posts = [];
let images = []; // store loaded images

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
  createCanvas(400, 400);
  await getPosts();
}

function draw() {
  // Your p5.js drawing code here
}



