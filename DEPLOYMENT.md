# Deployment Process (ImgConvertCrop)

Production deploy target:

- Host: `root@45.32.25.236`
- Path: `/opt/imgconvertcrop`
- Service: `imgconvertcrop.service`
- Public health: `https://imgconvertcrop.com/health`

## Standard Deploy

```bash
git push origin main
rsync -az --exclude '.git' --exclude 'node_modules' ./ root@45.32.25.236:/opt/imgconvertcrop/
ssh root@45.32.25.236 "set -euo pipefail; cd /opt/imgconvertcrop; npm ci --omit=dev; systemctl restart imgconvertcrop.service"
ssh root@45.32.25.236 "systemctl is-active imgconvertcrop.service"
ssh root@45.32.25.236 "curl -sS --max-time 15 http://127.0.0.1:3444/health"
curl -sS --max-time 20 https://imgconvertcrop.com/health
```

## UI Verify (current remove feature)

```bash
curl -sS -L --max-time 20 https://imgconvertcrop.com/ | rg -n "data-i18n=\"tab.remove\"|data-i18n=\"flow.allInOne\"|name=\"removeAlgorithm\" value=\"ai\" checked"
```

## Notes

- `/remove` may not exist as a dedicated route in production. The remove tool is available from the homepage tab UI.
- If health fails right after restart, wait 1-5 seconds and retry.
