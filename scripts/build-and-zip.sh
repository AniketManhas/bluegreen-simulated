#!/bin/bash
echo "🧩 Building project..."
sleep 1
echo "📦 Packaging app.zip (simulated)"
mkdir -p dist
echo "app bundle" > dist/app.zip
echo "Build & packaging complete -> dist/app.zip"
