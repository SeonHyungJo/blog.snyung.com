import { JetBrains_Mono } from "next/font/google";

export const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
