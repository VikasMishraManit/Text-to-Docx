const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { Document, Packer, Paragraph, TextRun } = require("docx");

// Get input folder from CLI
const inputFolder = process.argv[2];

if (!inputFolder) {
  console.error("⚠️ Please provide a folder path.");
  process.exit(1);
}

// Concurrency limiter 
const MAX_CONCURRENT_FILES = 5;
let activeCount = 0;
const queue = [];

function runNext() {
  if (queue.length > 0 && activeCount < MAX_CONCURRENT_FILES) {
    const task = queue.shift();
    activeCount++;
    task().finally(() => {
      activeCount--;
      runNext();
    });
  }
}

function enqueue(task) {
  queue.push(task);
  process.nextTick(runNext);
}

// Convert single file using streams
async function convertFile(filePath, outputPath) {
  return new Promise((resolve, reject) => {
    const paragraphs = [];

    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 26, // 13pt font
            }),
          ],
        })
      );
    });

    rl.on("close", async () => {
      try {
        const doc = new Document({
          sections: [
            {
              children: paragraphs,
            },
          ],
        });

        const buffer = await Packer.toBuffer(doc);
        await fs.promises.writeFile(outputPath, buffer);

        console.log(`✅ Created: ${outputPath}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    rl.on("error", reject);
    readStream.on("error", reject);
  });
}

// Read directory
fs.promises
  .readdir(inputFolder)
  .then((files) => {
    files.forEach((file) => {
      if (path.extname(file) === ".txt") {
        const filePath = path.join(inputFolder, file);
        const outputPath = path.join(
          inputFolder,
          file.replace(/\.txt$/, ".docx")
        );

        enqueue(() => convertFile(filePath, outputPath));
      }
    });
  })
  .catch((err) => {
    console.error("❌ Cannot read folder:", err);
  });
