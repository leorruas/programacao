#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, "assets", "mermaid");
const IGNORE = new Set([".git", "node_modules", "assets", ".obsidian"]);

function hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
}

function listarMarkdown(dir, base = "") {
    const saida = [];
    for (const nome of fs.readdirSync(dir)) {
        if (IGNORE.has(nome)) continue;
        const absoluto = path.join(dir, nome);
        const relativo = path.posix.join(base, nome);
        const stat = fs.statSync(absoluto);
        if (stat.isDirectory()) saida.push(...listarMarkdown(absoluto, relativo));
        else if (stat.isFile() && nome.endsWith(".md")) saida.push({ absoluto, relativo });
    }
    return saida;
}

function extrairMermaid(markdown) {
    const linhas = markdown.split(/\r?\n/);
    const blocos = [];
    let fence = null;
    let linguagem = "";
    let buffer = [];

    for (const linha of linhas) {
        const match = linha.match(/^\s*(`{3,})([^`]*)$/);
        if (match) {
            const ticks = match[1].length;
            const info = match[2].trim().toLowerCase();

            if (!fence) {
                fence = ticks;
                linguagem = info;
                buffer = [];
                continue;
            }

            if (ticks >= fence) {
                if (fence === 3 && linguagem === "mermaid") {
                    blocos.push(buffer.join("\n").trim());
                }
                fence = null;
                linguagem = "";
                buffer = [];
                continue;
            }
        }

        if (fence) buffer.push(linha);
    }

    return blocos.filter(Boolean);
}

function limparSaida() {
    fs.mkdirSync(OUTPUT, { recursive: true });
    for (const nome of fs.readdirSync(OUTPUT)) {
        if (nome.endsWith(".svg")) fs.unlinkSync(path.join(OUTPUT, nome));
    }
}

function renderizar(codigo, destino, temporario) {
    const entrada = path.join(temporario, "diagrama.mmd");
    fs.writeFileSync(entrada, codigo, "utf8");
    execFileSync(
        path.join(ROOT, "node_modules", ".bin", "mmdc"),
        ["-i", entrada, "-o", destino, "-t", "dark", "-b", "transparent", "-p", path.join(ROOT, "scripts", "puppeteer-config.json")],
        { stdio: "inherit" }
    );
}

limparSaida();
const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "mermaid-fallback-"));
let total = 0;

try {
    for (const arquivo of listarMarkdown(ROOT)) {
        const blocos = extrairMermaid(fs.readFileSync(arquivo.absoluto, "utf8"));
        if (!blocos.length) continue;

        const chave = hashString(arquivo.relativo.replace(/\\/g, "/"));
        blocos.forEach((codigo, indice) => {
            const nome = chave + "-" + (indice + 1) + ".svg";
            renderizar(codigo, path.join(OUTPUT, nome), temporario);
            total += 1;
        });
    }
} finally {
    fs.rmSync(temporario, { recursive: true, force: true });
}

console.log("SVGs Mermaid gerados: " + total);
