"use client";

import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { readPalettes } from "@/app/utils/PaletteManager";
import { useEffect, useState } from "react";
import "@/app/css/Page.css";
import { Tooltip } from "@nextui-org/tooltip";

export default function Home() {
	const [palettes, setPalettes] = useState([]);

	useEffect(() => {
		readPalettes().then(setPalettes);
	}, []);

	const handleCopyHex = (hex) => {
		navigator.clipboard.writeText(hex);
	};

	const getContrastColor = (hexColor) => {
		const rgb = hexToRgb(hexColor);

		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

		return luminance > 0.5 ? "black-text" : "white-text";
	};

	const hexToRgb = (hexColor) => {
		const r = parseInt(hexColor.substring(1, 3), 16);
		const g = parseInt(hexColor.substring(3, 5), 16);
		const b = parseInt(hexColor.substring(5, 7), 16);
		return { r, g, b };
	};

	return (
		<>
			<ThemeSwitcher />
			<div className='grid'>
				{palettes.map(({ name, colors }, paletteIndex) => (
					<div key={paletteIndex} className='palette-container'>
						<div className='colors-container'>
							{colors.map(({ hex, name: colorName }, colorIndex) => (
								<Tooltip key={colorIndex} content='Click to copy'>
									<button
										style={{ backgroundColor: hex }}
										onMouseEnter={(e) => {
											e.currentTarget.querySelector(
												".text-overlay"
											).style.opacity = "1";
											e.currentTarget.style.flex = colors.length / 2;
										}}
										onMouseLeave={(e) => {
											e.currentTarget.querySelector(
												".text-overlay"
											).style.opacity = "0";
											e.currentTarget.style.flex = 1;
										}}
										onClick={() => handleCopyHex(hex)}
									>
										<span className='text-overlay'>
											<div className={getContrastColor(hex)}>{hex}</div>
											<div className={getContrastColor(hex)}>{colorName}</div>
										</span>
									</button>
								</Tooltip>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
