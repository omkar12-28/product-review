// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#7C3AED",
    },

    background: {
      default: "#F3F6FB",
      paper: "#FFFFFF",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#D97706",
    },

    error: {
      main: "#DC2626",
    },

    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },

    divider: "rgba(15, 23, 42, 0.08)",
  },

  typography: {
    fontFamily: `'Inter', sans-serif`,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#0F172A",
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#0F172A",
    },

    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#0F172A",
    },

    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#0F172A",
    },

    body1: {
      fontSize: "0.95rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F3F6FB",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          boxShadow: "0 2px 12px rgba(15, 23, 42, 0.04)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          padding: "1rem",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: "1rem",
          paddingBlock: "0.6rem",
          boxShadow: "none",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#0F172A",
          boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid rgba(15,23,42,0.06)",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8FAFC",
        },
      },
    },
  },
});

export default theme;