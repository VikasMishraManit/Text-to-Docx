# Text to DOCX Converter

This project provides a simple command-line tool to convert text files (.txt) into DOCX format. It reads all text files from a specified directory and generates corresponding DOCX files.

## Features

- Converts multiple text files to DOCX format in a specified folder.
- Each line in the text file is converted into a separate paragraph in the DOCX file.

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
