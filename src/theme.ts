import { createTheme } from "@mui/material/styles";

/** Shared visual language for every page in the site. */
const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#00a6f4",
			dark: "#0088c7",
			light: "#e0f5ff",
		},
		background: {
			default: "#FAFAFA",
			paper: "#FAFAFA",
		},
		text: {
			primary: "#292e2b",
			secondary: "#6e7671",
		},
		divider: "#E2E2E2",
	},
	typography: {
		fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
		h1: { letterSpacing: "-0.035em" },
		h2: { letterSpacing: "-0.03em" },
		h3: { letterSpacing: "-0.025em" },
		h4: { letterSpacing: "-0.025em", lineHeight: 1.2 },
		h5: { letterSpacing: "-0.02em", fontWeight: 650 },
		button: { fontWeight: 600, letterSpacing: "0.01em" },
	},
	shape: { borderRadius: 12 },
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "#FAFAFA",
					minHeight: "100vh",
				},
				"::selection": {
					backgroundColor: "#bfeaff",
					color: "#005f8f",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 999,
					paddingInline: 16,
					transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
					"&:hover": { transform: "translateY(-1px)" },
					"&.Mui-focusVisible": { outline: "2px solid #00a6f4", outlineOffset: 2 },
				},
				outlined: {
					borderColor: "#cbd5cf",
					backgroundColor: "rgba(255, 255, 255, 0.42)",
					"&:hover": {
						borderColor: "#00a6f4",
						backgroundColor: "#e0f5ff",
						color: "#007eba",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 14,
					borderColor: "#E2E2E2",
					backgroundColor: "rgba(255, 255, 255, 0.62)",
					boxShadow: "0 1px 2px rgba(37, 48, 42, 0.025)",
					transition: "border-color 160ms ease, background-color 160ms ease",
					"&:hover": {
						borderColor: "#d2d8d1",
						backgroundColor: "rgba(255, 255, 255, 0.86)",
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: { padding: 20, "&:last-child": { paddingBottom: 20 } },
			},
		},
		MuiDivider: {
			styleOverrides: { root: { borderColor: "#E2E2E2" } },
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textUnderlineOffset: "3px",
					color: "#007eba",
					"&:hover": { color: "#005f8f" },
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: "#63736b",
					"&:hover": { backgroundColor: "#e0f5ff", color: "#0088c7" },
				},
			},
		},
	},
});

export default theme;
