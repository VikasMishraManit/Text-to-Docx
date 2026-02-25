# Text to DOCX Converter

This project provides a simple command-line tool to convert text files (.txt) into DOCX format. It reads all text files from a specified directory and generates corresponding DOCX files.

## Features

- Converts multiple text files to DOCX format in a specified folder.
- Each line in the text file is converted into a separate paragraph in the DOCX file.
- Stream-based file reading for improved memory efficiency (handles large files safely).
- Asynchronous file processing using Node.js non-blocking I/O.
- Concurrency-controlled batch processing (prevents system overload).
- Automatic output file naming (file.txt → file.docx).
- Error handling for invalid paths, unreadable files, and write failures.
- Cross-platform compatibility using Node.js path utilities.

## Complexity Analysis

Let:

n = number of .txt files in the directory

m = average size (in characters) of each file

Time Complexity : O(n × m)

Explanation:
- Each file is read once.
- Each character is processed once.
- Each line is converted into a DOCX paragraph.

Space Complexity

Without Streams (Basic Version):
- O(m) per file
(Entire file loaded into memory)

With Streams (Optimized Version):
- O(line_size)
(Processes file chunk-by-chunk, significantly reducing memory usage)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd txt-to-docx
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

To use the converter, run the following command in your terminal:

```
node convert.js <path-to-text-files>
```

Replace `<path-to-text-files>` with the path to the folder containing your `.txt` files.

## Example

If you have a folder named `texts` containing text files, you can convert them by running:

```
node convert.js ./texts
```

This will create DOCX files in the same folder.

## License

This project is licensed under the MIT License.
