# See https://containers.dev/ for more information
# Angular development environment using the latest Node.js LTS release line.
FROM mcr.microsoft.com/devcontainers/typescript-node:24

# Keep the system libraries required by the pinned Playwright version in the
# development image. The matching Chromium binary is installed after npm ci.
RUN npx --yes playwright@1.63.0 install-deps chromium

WORKDIR /workspace

# Angular development server and Karma test runner.
EXPOSE 4200 9876

# Used when the image is started directly. Dev Containers keeps the container
# alive itself and lets you start Angular from the integrated terminal.
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
