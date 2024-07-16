"use client";

import { Button } from "@nextui-org/button";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<Button
				isIconOnly
				onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
			>
				{theme == "dark" ? (
					<IconSunFilled color='#fbbf24' />
				) : (
					<IconMoonFilled color='#1e40af' />
				)}
			</Button>
		</div>
	);
}
