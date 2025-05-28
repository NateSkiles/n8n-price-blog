require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const IMAGES_DIR = path.join(__dirname, "images");

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
];

async function processImages() {
  try {
    console.log(`Looking for images in ${IMAGES_DIR}`);

    try {
      await fs.access(IMAGES_DIR);
    } catch (error) {
      console.error(
        `Error: Directory ${IMAGES_DIR} does not exist or is not accessible.`
      );
      return;
    }

    const files = await fs.readdir(IMAGES_DIR);

    const imageFiles = files.filter((file) =>
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${imageFiles.length} image(s) in the images directory`);

    // Process each image file
    for (const imageFile of imageFiles) {
      const imagePath = path.join(IMAGES_DIR, imageFile);
      await postImageToWebhook(imagePath);
    }

    console.log("All images have been processed");
  } catch (error) {
    console.error("Error processing images:", error);
  }
}

async function postImageToWebhook(imagePath) {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const filename = path.basename(imagePath);

    console.log(`Posting ${filename} to webhook...`);

    const payload = {
      filename: filename,
      size: imageBuffer.length,
      imageData: imageBuffer.toString("base64"),
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`Successfully posted ${filename}`);
    } else {
      console.error(
        `Failed to post ${filename}: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error posting ${path.basename(imagePath)}:`, error);
  }
}

processImages();
