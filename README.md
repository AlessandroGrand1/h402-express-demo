# h402-express-demo

This repository contains a demonstration of a web application that implements a paywall using the H-402 Express middleware. It showcases how to protect premium content behind a pay-per-view mechanism powered by the HTTP 402 "Payment Required" standard.

The demo consists of a simple landing page with featured articles. Accessing a "premium" article will trigger the H-402 paywall, demonstrating a full payment and content-unlocking flow.

This project serves as a practical, hands-on example for the @bit-gpt/h402-express package.

Features
Clean, Modern UI: A polished, "Linear-style" interface for the landing page and articles.

Paywall-Protected Routes: Demonstrates how to protect specific content.

H-402 Middleware: A clear example of how to integrate the h402-express middleware.

Simple & Focused: The code is intentionally kept minimal to make it easy to understand the core concepts.

Demo Pages
The repository includes the following pages:

index.html: The main landing page showcasing featured articles.

why-layers-matter.html: A premium article on the OSI model.

sol-vs-evm.html: A premium article comparing Solana and EVM.

Getting Started
To run this demo locally, you don't need any complex setup. Since it is a client-side project built with simple HTML and Tailwind CSS (via a CDN), you can run it with any local web server.

Prerequisites
A modern web browser.

A local web server. If you have Python installed, you can use its built-in server.

Installation & Running
Clone the repository:

Bash

git clone https://github.com/AlessandroGrand1/h402-express-demo.git
cd h402-express-demo
Start a local web server:

If you have Python 3, run:

Bash

python -m http.server
If you have Python 2, run:

Bash

python -m SimpleHTTPServer
Alternatively, you can use any other local server tool you prefer, like live-server for Node.js.

View the demo:
Open your web browser and navigate to http://localhost:8000 (or the port specified by your server).

Usage
Once the server is running, you can explore the demo:

From the main page, click on one of the "Read – $0.01" buttons for a featured article.

This will navigate you to the premium article page. In a real-world application, this is where the h402-express middleware would intercept the request and return a 402 Payment Required status, prompting the user for payment before serving the content.

License
This project is open-source and available under the MIT License.
