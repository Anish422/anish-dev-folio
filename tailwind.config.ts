import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1.25rem', md: '2rem', xl: '3rem' },
			screens: {
				'2xl': '1440px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				/* Signal — the one loud colour in the system. */
				signal: {
					DEFAULT: 'hsl(var(--signal))',
					foreground: 'hsl(var(--signal-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			/* Near-zero radii: the system is built from hard rectangles and hairlines. */
			borderRadius: {
				lg: 'var(--radius)',
				md: 'var(--radius)',
				sm: 'var(--radius)'
			},
			fontFamily: {
				sans: ['Archivo', 'system-ui', 'sans-serif'],
				display: ['Archivo', 'system-ui', 'sans-serif'],
				serif: ['"Instrument Serif"', 'Georgia', 'serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
			},
			fontSize: {
				'2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.14em' }]
			},
			spacing: {
				'18': '4.5rem',
				'112': '28rem',
				'128': '32rem'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				/* Hairline that draws itself in from the left. */
				'rule-in': {
					from: { transform: 'scaleX(0)' },
					to: { transform: 'scaleX(1)' }
				},
				'blink': {
					'0%, 45%': { opacity: '1' },
					'50%, 95%': { opacity: '0.15' }
				},
				'ticker': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'rule-in': 'rule-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'blink': 'blink 1.6s steps(1, end) infinite',
				'ticker': 'ticker 24s linear infinite'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate")
	],
} satisfies Config;
