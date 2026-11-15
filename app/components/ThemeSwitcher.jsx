"use client";

import { Button } from "@heroui/react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeSwitcher() {
	const mounted = useSyncExternalStore(subscribe, () => true, () => false);
	const { theme, setTheme } = useTheme();


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
