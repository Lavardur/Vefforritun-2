import { IncomingMessage, ServerResponse } from 'http';
import { Hono } from 'hono';

export const honoAdapter = (app: Hono) => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const url = `http://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      }) : undefined,
    });

    const response = await app.fetch(request);

    res.writeHead(response.status, response.statusText, Object.fromEntries(response.headers.entries()));
    res.end(await response.text());
  };
};