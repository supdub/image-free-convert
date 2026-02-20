---
name: imgconvertcrop-deploy
description: Deploy ImgConvertCrop to production on 45.32.25.236 by syncing /opt/imgconvertcrop, restarting imgconvertcrop.service, and verifying health/UI markers.
---

# ImgConvertCrop Deploy

Use this skill when the user asks to deploy `ImgConvertCrop` production updates.

## Target

- Host: `root@45.32.25.236`
- App path: `/opt/imgconvertcrop`
- Service: `imgconvertcrop.service`
- Health URL: `https://imgconvertcrop.com/health`

## Deploy Steps

1. Confirm local branch and commit:
   - `git status --short --branch`
   - `git rev-parse --short HEAD`
2. Push latest code:
   - `git push origin main`
3. Sync repo files to server (exclude `.git` and local `node_modules`):
   - `rsync -az --exclude '.git' --exclude 'node_modules' ./ root@45.32.25.236:/opt/imgconvertcrop/`
4. Install production dependencies + restart service:
   - `ssh root@45.32.25.236 "set -euo pipefail; cd /opt/imgconvertcrop; npm ci --omit=dev; systemctl restart imgconvertcrop.service"`
5. Verify server service + local health:
   - `ssh root@45.32.25.236 "systemctl is-active imgconvertcrop.service"`
   - `ssh root@45.32.25.236 "curl -sS --max-time 15 http://127.0.0.1:3444/health"`
6. Verify public health:
   - `curl -sS --max-time 20 https://imgconvertcrop.com/health`
7. Verify key UI markers on homepage:
   - `curl -sS -L --max-time 20 https://imgconvertcrop.com/ | rg -n "data-i18n=\"tab.remove\"|data-i18n=\"flow.allInOne\"|name=\"removeAlgorithm\" value=\"ai\" checked"`

## If `/remove` returns 404

- This deployment serves remove UI under tabbed homepage (`/`), not necessarily a dedicated `/remove` route.
- Validate deploy via homepage markers and health endpoint.

## Troubleshooting

- Check logs:
  - `ssh root@45.32.25.236 "journalctl -u imgconvertcrop.service -n 120 --no-pager"`
- Check service unit:
  - `ssh root@45.32.25.236 "systemctl cat imgconvertcrop.service"`
- If health probe fails right after restart, retry with short backoff (1-5 seconds).
