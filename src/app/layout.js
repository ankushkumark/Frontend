import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata = {
  title: "Expense Tracker",
  description: "Personal Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
