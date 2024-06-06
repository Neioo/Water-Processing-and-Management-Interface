import "./globals.css";

import NavBar from "@/app/components/Navbar";

export const metadata = {
  title: "WPMI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <NavBar style={{ width: "100% "}}/> */}
        <div className="mx-auto" style={{ width: "100%" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

