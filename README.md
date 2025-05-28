# n8n Price Blog

This project processes image files from a local directory and posts them to a webhook endpoint. It is designed to automate the handling of image uploads for a blog or similar application.

## Overview

- Scans a specified `images` directory for image files.
- Supports common image formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`.
- Converts image files to Base64 and sends them to a webhook endpoint.

## Prerequisites

- Node.js (v14 or later recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd n8n-price-blog
   ```
2. Install dependencies:
   ```bash
    pnpm install
   ```
3. (optional) Create an `images` directory in the project root if not already created:
   ```bash
   mkdir images
   ```
4. Add your image files to the `images` directory.
5. Configure the environment variables:
   - Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your webhook URL:
   ```bash
   WEBHOOK_URL=https://your-webhook-url.com
   ```

## Usage

1. Start the application:
   ```bash
   pnpm start
   ```
2. The script will scan the `images` directory for supported image files and post them to the webhook endpoint defined in the code.

## Configuration

- Webhook URL: The webhook URL is defined in the `.env` file under the `WEBHOOK_URL` variable. Update this value to match your webhook server's endpoint.

- Supported Image Formats: The supported image extensions are defined in the `IMAGE_EXTENSIONS` array in index.js. You can modify this list if needed.

## License

This project is licensed under the ISC License.
