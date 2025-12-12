const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun } = require("docx");

const inputFolder = process.argv[2]; // Get folder path from command line

if (!inputFolder) {
  console.error("⚠️ Please provide a folder path.");
  process.exit(1);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Cannot read folder:", err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ".txt") {
      const filePath = path.join(inputFolder, file);
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        const doc = new Document({
          sections: [
            {
              // children: [
              //   new Paragraph({
              //     children: [new TextRun({
              //       text: data,
              //       size: 26, // 13pt font size
              //     })],
              //   }),
              // ],
              children: data.split("\n").map((line) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      size: 26, // 13pt
                    }),
                  ],
                })
              ),
            },
          ],
        });

        const buffer = await Packer.toBuffer(doc);
        const outputPath = path.join(
          inputFolder,
          file.replace(/\.txt$/, ".docx")
        );
        fs.writeFile(outputPath, buffer, (err) => {
          if (err) {
            console.error(`Error writing file ${outputPath}:`, err);
          } else {
            console.log(`✅ Created: ${outputPath}`);
          }
        });
      });
    }
  });
});
