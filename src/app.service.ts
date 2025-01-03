/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body, html {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: monospace;
            background-color: #282c34;
            color: #fff;
          }
          pre {
            text-align: center;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        </style>
      </head>
      <body>
        <pre>
          ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
          ─██████████████───██████████████─██████████████─██████──████████─██████████████─██████──────────██████─████████████───
          ─██░░░░░░░░░░██───██░░░░░░░░░░██─██░░░░░░░░░░██─██░░██──██░░░░██─██░░░░░░░░░░██─██░░██████████──██░░██─██░░░░░░░░████─
          ─██░░██████░░██───██░░██████░░██─██░░██████████─██░░██──██░░████─██░░██████████─██░░░░░░░░░░██──██░░██─██░░████░░░░██─
          ─██░░██──██░░██───██░░██──██░░██─██░░██─────────██░░██──██░░██───██░░██─────────██░░██████░░██──██░░██─██░░██──██░░██─
          ─██░░██████░░████─██░░██████░░██─██░░██─────────██░░██████░░██───██░░██████████─██░░██──██░░██──██░░██─██░░██──██░░██─
          ─██░░░░░░░░░░░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██───██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░██──██░░██─
          ─██░░████████░░██─██░░██████░░██─██░░██─────────██░░██████░░██───██░░██████████─██░░██──██░░██──██░░██─██░░██──██░░██─
          ─██░░██────██░░██─██░░██──██░░██─██░░██─────────██░░██──██░░██───██░░██─────────██░░██──██░░██████░░██─██░░██──██░░██─
          ─██░░████████░░██─██░░██──██░░██─██░░██████████─██░░██──██░░████─██░░██████████─██░░██──██░░░░░░░░░░██─██░░████░░░░██─
          ─██░░░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██──██░░░░██─██░░░░░░░░░░██─██░░██──██████████░░██─██░░░░░░░░████─
          ─████████████████─██████──██████─██████████████─██████──████████─██████████████─██████──────────██████─████████████───
          ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
          ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
          ─██████████████─████████████████───██████████████─██████████─██████──────────██████─██████████████─██████──██████─██████████████─
          ─██░░░░░░░░░░██─██░░░░░░░░░░░░██───██░░░░░░░░░░██─██░░░░░░██─██░░██████████──██░░██─██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─
          ─██████░░██████─██░░████████░░██───██░░██████░░██─████░░████─██░░░░░░░░░░██──██░░██─██░░██████░░██─██░░██──██░░██─██░░██████░░██─
          ─────██░░██─────██░░██────██░░██───██░░██──██░░██───██░░██───██░░██████░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─
          ─────██░░██─────██░░████████░░██───██░░██████░░██───██░░██───██░░██──██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██████░░██─
          ─────██░░██─────██░░░░░░░░░░░░██───██░░░░░░░░░░██───██░░██───██░░██──██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░░░░░░░░░██─
          ─────██░░██─────██░░██████░░████───██░░██████░░██───██░░██───██░░██──██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██████░░██─
          ─────██░░██─────██░░██──██░░██─────██░░██──██░░██───██░░██───██░░██──██░░██████░░██─██░░██──██░░██─██░░░░██░░░░██─██░░██──██░░██─
          ─────██░░██─────██░░██──██░░██████─██░░██──██░░██─████░░████─██░░██──██░░░░░░░░░░██─██░░██████░░██─████░░░░░░████─██░░██──██░░██─
          ─────██░░██─────██░░██──██░░░░░░██─██░░██──██░░██─██░░░░░░██─██░░██──██████████░░██─██░░░░░░░░░░██───████░░████───██░░██──██░░██─
          ─────██████─────██████──██████████─██████──██████─██████████─██████──────────██████─██████████████─────██████─────██████──██████─
          ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
        </pre>
      </body>
      </html>
    `;
  }
}
