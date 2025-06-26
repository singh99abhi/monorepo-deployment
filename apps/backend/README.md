# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# CI/CD with Docker

This project uses GitHub Actions to automate Docker image building and deployment for the backend service.

## Docker Steps in `.github/workflows/cd_back.yml`

1. **Docker Login**  
   The workflow uses the `docker/login-action@v2` action to log in to Docker Hub (or another Docker registry) using repository secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`). This allows the workflow to push images to your Docker registry securely.

2. **Build and Push Docker Image**  
   The workflow uses the `docker/build-push-action@v2` action to:
   - **Build** a Docker image using the Dockerfile at `./dockerfiles/dockerfile.backend`.
   - **Set the build context** to the root of the repository (`context: .`).
   - **Push** the built image to the Docker registry.
   - **Tag** the image as `abhi99shek/todo-backend:${{ github.sha }}`, where `${{ github.sha }}` is the unique commit SHA, ensuring each image is uniquely tagged per commit.

**Summary:**  
Every push to the `main` branch triggers this workflow, automatically building and pushing a Docker image of the backend to your Docker registry, enabling continuous deployment of your backend service.
