import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppShell } from './App';
import './index.css';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on('data', (chunk: Buffer) => chunks.push(chunk));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));

    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}
