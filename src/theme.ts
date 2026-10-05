import { createTheme } from "@mui/material/styles";

/** Shared visual language for every page in the site. */
const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#46645d",
			dark: "#304b45",
			light: "#e7eeea",
		},
		background: {
			default: "#f5f4ef",
			paper: "#fbfaf7",
		},
		text: {
			primary: "#292e2b",
			secondary: "#6e7671",
		},
		divider: "#e2e2da",
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
					backgroundColor: "#f5f4ef",
					minHeight: "100vh",
				},
				"::selection": {
					backgroundColor: "#dce7e1",
					color: "#263d36",
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
				},
				outlined: {
					borderColor: "#cbd5cf",
					backgroundColor: "rgba(255, 255, 255, 0.42)",
					"&:hover": {
						borderColor: "#91a69c",
						backgroundColor: "#edf1ec",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 14,
					borderColor: "#e2e2da",
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
			styleOverrides: { root: { borderColor: "#e2e2da" } },
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textUnderlineOffset: "3px",
					"&:hover": { color: "#304b45" },
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: "#63736b",
					"&:hover": { backgroundColor: "#e8ece7", color: "#304b45" },
				},
			},
		},
	},
});

export default theme;
