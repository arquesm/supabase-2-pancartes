// -------------------------------
// SUPABASE SETUP
// -------------------------------
const SUPABASE_URL = "https://bhpjqdrmxsqtghcitywt.supabase.co"; // replace with your Supabase URL
const SUPABASE_KEY = "sb_publishable_bkuiQY0FRbZlJY9mhEPygg_rxf5Pm03"; // replace with your anon key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// -------------------------------
// GLOBAL DATA
// -------------------------------
let words = []; // all content items flattened
let grid = [];
let cols, rows;
let cellW, cellH;

// -------------------------------
// LOAD DATA FROM SUPABASE
// -------------------------------
async function loadPosts() {
  const { data, error } = await sb.from("posts").select("content");

  if (error) {
    console.error(error);
    return;
  }

  // Extract and flatten all comma-separated content
  words = data.flatMap((post) => {
    if (!post.content) return [];
    return post.content.split(",").map((item) => item.trim());
  });

  // Remove empty strings
  words = words.filter((w) => w.length > 0);

  console.log("WORDS:", words);

  generateGrid();
}

// -------------------------------
// GENERATE RANDOM GRID
// -------------------------------
function generateGrid() {
  cols = floor(random(3, 8));
  rows = floor(random(3, 8));

  cellW = width / cols;
  cellH = height / rows;

  grid = [];

  for (let i = 0; i < cols * rows; i++) {
    const randomWord = random(words);
    grid.push(randomWord);
  }
}

// -------------------------------
// P5 SETUP
// -------------------------------
function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent(document.body);

  textAlign(CENTER, CENTER);
  textSize(14);

  loadPosts();
}

// -------------------------------
// P5 DRAW LOOP
// -------------------------------
function draw() {
  background(255);

  if (grid.length === 0) return;

  let index = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = x * cellW;
      const py = y * cellH;

      // Draw cell border
      stroke(0);
      noFill();
      rect(px, py, cellW, cellH);

      // Draw text
      noStroke();
      fill(0);
      text(grid[index] || "", px + cellW / 2, py + cellH / 2);

      index++;
    }
  }
}

// -------------------------------
// CLICK = REGENERATE GRID
// -------------------------------
function mousePressed() {
  generateGrid();
}

// -------------------------------
// RESPONSIVE CANVAS
// -------------------------------
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  generateGrid();
}
