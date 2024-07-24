"use server";

import fs from 'fs/promises';
import path from 'path';
import nearestColor from 'nearest-color';
import colorNamesList from 'color-name-list/dist/colornames.bestof.esm'

export async function readPalettes() {
    const palettesDir = path.join(process.cwd(), './palettes');
    const files = await fs.readdir(palettesDir);
    const colors = colorNamesList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
    const nearest = nearestColor.from(colors);
    const palettes = [];

    async function readDirRecursive(dir) {
        const files = await fs.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(dir, file.name);

            if (file.isDirectory()) {
                await readDirRecursive(filePath);
            } else if (file.isFile() && file.name.endsWith('.palette')) {
                const content = await fs.readFile(filePath, 'utf8');
                const lines = content.split('\n').filter(Boolean); // Filter out empty lines
                const palette = { name: file.name.replace('.palette', ''), colors: [] };

                for (const line of lines) {
                    const hexValues = line.split(';');

                    for (const hex of hexValues) {
                        const colorName = nearest('#' + hex.trim().replaceAll('#', '').replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, '#$1$1$2$2$3$3').slice(0, 7)).name;
                        palette.colors.push({ hex, name: colorName });
                    }
                }

                palettes.push(palette);
            }
        }
    }

    await readDirRecursive(palettesDir);

    return palettes;
}