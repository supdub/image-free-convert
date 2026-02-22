(function (global) {
  const CanvasRenderer = {};

  function drawSubtleChecker(ctx, width, height) {
    ctx.fillStyle = '#f5f5f7';
    ctx.fillRect(0, 0, width, height);
    const size = 16;
    for (let y = 0; y < height; y += size) {
      for (let x = 0; x < width; x += size) {
        const even = ((x / size) + (y / size)) % 2 === 0;
        ctx.fillStyle = even ? '#f4f4f6' : '#f1f1f3';
        ctx.fillRect(x, y, size, size);
      }
    }
  }

  CanvasRenderer.renderEditor = function renderEditor(ctx, opts) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f5f5f7';
    ctx.fillRect(0, 0, width, height);
    if (opts.showTransparencyGrid) {
      drawSubtleChecker(ctx, width, height);
    }

    if (!opts.imageCanvas) return;

    const vp = opts.viewport;
    const drawX = vp.offsetX;
    const drawY = vp.offsetY;
    const drawW = opts.imageCanvas.width * vp.scale;
    const drawH = opts.imageCanvas.height * vp.scale;
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.translate(vp.offsetX, vp.offsetY);
    ctx.scale(vp.scale, vp.scale);
    ctx.drawImage(opts.imageCanvas, 0, 0);

    if (opts.maskCanvas && (opts.activeTool === 'remove' || opts.activeTool === 'mosaic')) {
      ctx.globalAlpha = 0.35;
      ctx.drawImage(opts.maskCanvas, 0, 0);
      ctx.globalAlpha = 1;
    }

    if (opts.cropRect && opts.activeTool === 'crop') {
      const r = opts.cropRect;
      const right = opts.imageCanvas.width;
      const bottom = opts.imageCanvas.height;

      ctx.fillStyle = 'rgba(0,0,0,0.38)';
      ctx.fillRect(0, 0, right, r.y);
      ctx.fillRect(0, r.y + r.h, right, bottom - (r.y + r.h));
      ctx.fillRect(0, r.y, r.x, r.h);
      ctx.fillRect(r.x + r.w, r.y, right - (r.x + r.w), r.h);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(1, 2 / vp.scale);
      ctx.strokeRect(r.x, r.y, r.w, r.h);

      const hs = Math.max(6 / vp.scale, 8 / vp.scale);
      const handles = [
        { x: r.x, y: r.y },
        { x: r.x + r.w, y: r.y },
        { x: r.x, y: r.y + r.h },
        { x: r.x + r.w, y: r.y + r.h }
      ];
      handles.forEach((h) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(h.x - hs, h.y - hs, hs * 2, hs * 2);
        ctx.strokeStyle = '#1f2937';
        ctx.strokeRect(h.x - hs, h.y - hs, hs * 2, hs * 2);
      });
    }

    ctx.restore();

    ctx.strokeStyle = 'rgba(17, 19, 24, 0.16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      Math.round(drawX) + 0.5,
      Math.round(drawY) + 0.5,
      Math.max(0, Math.round(drawW) - 1),
      Math.max(0, Math.round(drawH) - 1)
    );
  };

  global.CanvasRenderer = CanvasRenderer;
})(window);
