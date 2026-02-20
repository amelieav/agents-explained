# Agents Explained

Static site that explains how AI agents work in simple language.

## What this includes

- A responsive page with clear AI agent definitions and workflow basics.
- A live "Latest Releases" section loaded from GitLab Releases API.
- GitLab Pages deployment on every pushed tag (release workflow).

## Files

- `index.html`: page structure/content
- `styles.css`: visual design
- `app.js`: release feed from GitLab API
- `.gitlab-ci.yml`: GitLab Pages deploy job

## Deploy model

This project deploys with **GitLab Pages** (not GitHub Pages) because the code is hosted on GitLab.

The pipeline runs when you push a tag (`$CI_COMMIT_TAG`).

## Release and publish

1. Commit changes to `main`.
2. Create and push a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

3. (Optional, recommended) Create a GitLab Release attached to that tag.
4. GitLab Pages deploys from the tag pipeline.

Expected site URL pattern:

`https://<namespace>.gitlab.io/<project>/`

For this repo that is typically:

`https://ai-agent-coded.gitlab.io/agents-explained/`
